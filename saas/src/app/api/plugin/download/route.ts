import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import * as archiver from "archiver";

export async function GET() {
  try {
    // Resolve absolute path to wordpress-plugin/wp-ai-connector
    const pluginDir = path.resolve(process.cwd(), "..", "wordpress-plugin", "wp-ai-connector");

    if (!fs.existsSync(pluginDir)) {
      console.error("[Plugin Download API Error] Directory not found:", pluginDir);
      return NextResponse.json(
        { error: `Plugin directory not found on server at ${pluginDir}` },
        { status: 404 }
      );
    }

    // Create ZipArchive stream in memory
    const archive = new archiver.ZipArchive({ zlib: { level: 9 } });
    const chunks: Buffer[] = [];

    archive.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });

    const zipBufferPromise = new Promise<Buffer>((resolve, reject) => {
      archive.on("end", () => resolve(Buffer.concat(chunks)));
      archive.on("error", (err: any) => reject(err));
    });

    // Add plugin directory to zip under folder name 'wp-ai-connector'
    archive.directory(pluginDir, "wp-ai-connector");

    await archive.finalize();
    const zipBuffer = await zipBufferPromise;

    console.log(`[Plugin Download API] ZIP generated successfully (${zipBuffer.length} bytes).`);

    return new NextResponse(new Uint8Array(zipBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="wp-ai-connector.zip"',
        "Content-Length": zipBuffer.length.toString(),
      },
    });
  } catch (error: any) {
    console.error("[Plugin Download API Error]:", error);
    return NextResponse.json(
      { error: `Failed to generate plugin ZIP archive: ${error?.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}
