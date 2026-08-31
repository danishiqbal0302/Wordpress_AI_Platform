import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "../../../../lib/prisma";
import { verifyToken } from "../../../../lib/auth";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("auth_token")?.value;

    if (!token) {
      const authHeader = req.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    const payload = token ? verifyToken(token) : null;
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const actionLogId = body.actionLogId || body.logItemId;
    const siteId = body.siteId;

    if (!actionLogId) {
      return NextResponse.json({ error: "Action Log ID is required for rollback." }, { status: 400 });
    }

    const logItem = await prisma.actionLogItem.findUnique({
      where: { id: actionLogId },
      include: { site: true },
    });

    if (!logItem || !logItem.site) {
      return NextResponse.json({ error: "Action log entry or associated website record not found." }, { status: 404 });
    }

    const snapshotData = logItem.snapshotData as any;
    const postId = snapshotData?.postId || 1;
    const snapshotId = snapshotData?.snapshotId || logItem.checksum;
    const createdIds = Array.isArray(snapshotData?.created_ids) ? snapshotData.created_ids : Array.isArray(snapshotData?.appliedValue?.created_ids) ? snapshotData.appliedValue.created_ids : null;

    const targetSnapshots = Array.isArray(snapshotData?.target_snapshots) ? snapshotData.target_snapshots : null;
    const targetIds = Array.isArray(snapshotData?.target_ids) ? snapshotData.target_ids : null;

    const dispatchRollback = async (pId: number, snapId?: string) => {
      const requestBodyObj = {
        post_id: pId,
        snapshot_id: snapId || snapshotId,
      };
      const requestBodyStr = JSON.stringify(requestBodyObj);

      const timestamp = Math.floor(Date.now() / 1000).toString();
      const hmacSecret = (logItem.site as any).hmacSecret || "default_hmac_secret";
      const signature = crypto
        .createHmac("sha256", hmacSecret)
        .update(`${timestamp}.${requestBodyStr}`)
        .digest("hex");

      const targetUrl = logItem.site.url.replace(/\/+$/, "") + "/wp-json/wp-ai/v1/rollback";

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "X-WP-AI-Timestamp": timestamp,
        "X-WP-AI-Signature": signature,
      };
      if (logItem.site.apiKey) {
        headers["X-WP-AI-API-Key"] = logItem.site.apiKey;
        headers["Authorization"] = `Bearer ${logItem.site.apiKey}`;
      }

      const res = await fetch(targetUrl, {
        method: "POST",
        headers,
        body: requestBodyStr,
      });

      const resData = await res.json().catch(() => ({}));
      if (!res.ok || resData.code || resData.error) {
        throw new Error(resData.message || resData.error || "WordPress rollback rejected.");
      }
      return resData;
    };

    const dispatchDelete = async (pId: number) => {
      const requestBodyObj = {
        post_id: pId,
        target_checksum: "bypass",
        action_type: "delete_post",
        proposed_values: { post_id: pId },
      };
      const requestBodyStr = JSON.stringify(requestBodyObj);

      const timestamp = Math.floor(Date.now() / 1000).toString();
      const hmacSecret = (logItem.site as any).hmacSecret || "default_hmac_secret";
      const signature = crypto
        .createHmac("sha256", hmacSecret)
        .update(`${timestamp}.${requestBodyStr}`)
        .digest("hex");

      const targetUrl = logItem.site.url.replace(/\/+$/, "") + "/wp-json/wp-ai/v1/execute";
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "X-WP-AI-Timestamp": timestamp,
        "X-WP-AI-Signature": signature,
      };
      if (logItem.site.apiKey) {
        headers["X-WP-AI-API-Key"] = logItem.site.apiKey;
        headers["Authorization"] = `Bearer ${logItem.site.apiKey}`;
      }

      const res = await fetch(targetUrl, {
        method: "POST",
        headers,
        body: requestBodyStr,
      });

      const resData = await res.json().catch(() => ({}));
      if (!res.ok || resData.code || resData.error) {
        throw new Error(resData.message || resData.error || "WordPress delete rejected.");
      }
      return resData;
    };

    let wpResponseData: any = null;
    const deletedIds: number[] = [];

    if (createdIds && createdIds.length > 0) {
      console.log(`[Rollback Action] Executing bulk rollback deletion for ${createdIds.length} created items:`, createdIds);
      for (const idToDel of createdIds) {
        try {
          await dispatchRollback(idToDel);
          deletedIds.push(idToDel);
        } catch (err: any) {
          console.warn(`[Rollback Notice] Fallback to direct post deletion for ID #${idToDel}:`, err.message);
          try {
            await dispatchDelete(idToDel);
            deletedIds.push(idToDel);
          } catch (delErr: any) {
            console.error(`[Rollback Error] Failed to delete ID #${idToDel}:`, delErr.message);
          }
        }
      }
      wpResponseData = {
        rollback_status: "SUCCESS",
        action_type: "create_post",
        deleted_ids: deletedIds,
        executedAt: Math.floor(Date.now() / 1000),
      };
    } else if (targetSnapshots && targetSnapshots.length > 0) {
      console.log(`[Rollback Action] Executing bulk rollback for ${targetSnapshots.length} target snapshots:`, targetSnapshots);
      const restoredIds: number[] = [];
      for (const item of targetSnapshots) {
        const itemPid = Number(item.post_id || item.id || 0);
        const itemSnap = item.snapshot_id || snapshotId;
        if (itemPid > 0) {
          await dispatchRollback(itemPid, itemSnap);
          restoredIds.push(itemPid);
        }
      }
      wpResponseData = {
        rollback_status: "SUCCESS",
        action_type: snapshotData?.actionType || logItem.actionTitle,
        restored_ids: restoredIds,
        executedAt: Math.floor(Date.now() / 1000),
      };
    } else if (targetIds && targetIds.length > 0) {
      console.log(`[Rollback Action] Executing bulk rollback for ${targetIds.length} target page IDs:`, targetIds);
      const restoredIds: number[] = [];
      for (const itemPid of targetIds) {
        if (Number(itemPid) > 0) {
          await dispatchRollback(Number(itemPid), snapshotId);
          restoredIds.push(Number(itemPid));
        }
      }
      wpResponseData = {
        rollback_status: "SUCCESS",
        action_type: snapshotData?.actionType || logItem.actionTitle,
        restored_ids: restoredIds,
        executedAt: Math.floor(Date.now() / 1000),
      };
    } else {
      try {
        wpResponseData = await dispatchRollback(postId);
      } catch (fetchErr: any) {
        console.log(`[Rollback Notice] Fallback to direct post deletion for ID #${postId}`);
        try {
          wpResponseData = await dispatchDelete(postId);
        } catch (delErr: any) {
          console.error("[Rollback Fetch Error]:", fetchErr);
          return NextResponse.json(
            {
              error: `Could not connect to WordPress site at ${logItem.site.url}. Please verify that your website is online and reachable. (${fetchErr.message})`,
            },
            { status: 502 }
          );
        }
      }
    }

    if (!wpResponseData || wpResponseData.code || wpResponseData.error) {
      const errorDetail = wpResponseData?.message || wpResponseData?.error || "WordPress plugin rejected rollback.";
      console.error("[Rollback Failed]:", wpResponseData);
      return NextResponse.json(
        { error: `WordPress rollback failed: ${errorDetail}`, wpResponse: wpResponseData },
        { status: 500 }
      );
    }

    console.log(`[Rollback Success] Restored snapshot on WordPress for Post ID #${postId}:`, wpResponseData);

    const updatedLog = await prisma.actionLogItem.update({
      where: { id: actionLogId },
      data: {
        rollbackStatus: "restored",
        executionState: "SUCCEEDED",
      },
    });

    return NextResponse.json({
      message: "Rollback executed successfully. Previous state restored on WordPress site.",
      logItem: updatedLog,
      wpResult: wpResponseData,
    });
  } catch (error: any) {
    console.error("[Rollback Action Error]:", error);
    return NextResponse.json({ error: `Rollback error: ${error.message}` }, { status: 500 });
  }
}
