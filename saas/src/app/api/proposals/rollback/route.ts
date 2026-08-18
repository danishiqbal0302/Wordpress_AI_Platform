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
    const { actionLogId, siteId } = body;

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

    const requestBodyObj = {
      post_id: postId,
      snapshot_id: snapshotId,
    };
    const requestBodyStr = JSON.stringify(requestBodyObj);

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const hmacSecret = (logItem.site as any).hmacSecret || "default_hmac_secret";
    const signature = crypto
      .createHmac("sha256", hmacSecret)
      .update(`${timestamp}.${requestBodyStr}`)
      .digest("hex");

    const targetUrl = logItem.site.url.replace(/\/+$/, "") + "/wp-json/wp-ai/v1/rollback";

    console.log(`[Rollback Action] Dispatched rollback request to WordPress: ${targetUrl} for Post ID #${postId} (Snapshot: ${snapshotId})`);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "X-WP-AI-Timestamp": timestamp,
      "X-WP-AI-Signature": signature,
    };
    if (logItem.site.apiKey) {
      headers["X-WP-AI-API-Key"] = logItem.site.apiKey;
      headers["Authorization"] = `Bearer ${logItem.site.apiKey}`;
    }

    let wpRes;
    try {
      wpRes = await fetch(targetUrl, {
        method: "POST",
        headers,
        body: requestBodyStr,
      });
    } catch (fetchErr: any) {
      console.error("[Rollback Fetch Error]:", fetchErr);
      return NextResponse.json(
        {
          error: `Could not connect to WordPress site at ${logItem.site.url}. Please verify that your website is online and reachable. (${fetchErr.message})`,
        },
        { status: 502 }
      );
    }

    const wpResponseData = await wpRes.json().catch(() => ({}));

    if (!wpRes.ok || wpResponseData.code || wpResponseData.error) {
      const errorDetail = wpResponseData.message || wpResponseData.error || "WordPress plugin rejected rollback.";
      console.error("[Rollback Failed]:", wpResponseData);
      return NextResponse.json(
        { error: `WordPress rollback failed: ${errorDetail}`, wpResponse: wpResponseData },
        { status: wpRes.status || 500 }
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
