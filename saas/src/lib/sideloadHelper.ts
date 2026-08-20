import crypto from "crypto";

export async function sideloadUnsplashImagesInContent(site: any, htmlContent: string): Promise<string> {
  if (!htmlContent) return htmlContent;

  // Regular expression to match Unsplash image URLs
  const unsplashRegex = /https:\/\/images\.unsplash\.com\/[a-zA-Z0-9_\-\/\?\=\&\;\.\d\%]+/g;
  const matches = htmlContent.match(unsplashRegex);
  if (!matches || matches.length === 0) {
    return htmlContent;
  }

  // De-duplicate URLs
  const uniqueUrls = Array.from(new Set(matches));
  let updatedHtml = htmlContent;

  console.log(`[Sideload Helper] Found ${uniqueUrls.length} Unsplash URLs to sideload for site ${site.name}`);

  for (const imageUrl of uniqueUrls) {
    try {
      // 1. Prepare request payload
      const requestBody = JSON.stringify({
        action_type: "import_media",
        proposed_values: {
          image_url: imageUrl,
          alt_text: "Stock Photos Sideloaded by AI",
          title: "Sideloaded Stock Asset"
        }
      });

      // 2. Generate HMAC headers
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const hmacSecret = site.hmacSecret || "default_hmac_secret";
      const signature = crypto.createHmac("sha256", hmacSecret).update(`${timestamp}.${requestBody}`).digest("hex");

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "X-WP-AI-Timestamp": timestamp,
        "X-WP-AI-Signature": signature
      };
      if (site.apiKey) {
        headers["X-WP-AI-API-Key"] = site.apiKey;
        headers["Authorization"] = `Bearer ${site.apiKey}`;
      }

      // 3. Dispatch REST POST request to WordPress executor
      const res = await fetch(`${site.url.replace(/\/$/, "")}/wp-json/wp-ai/v1/execute`, {
        method: "POST",
        headers,
        body: requestBody
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.attachment_url && data.attachment_id) {
          console.log(`[Sideload Helper] Successfully sideloaded image ${imageUrl} -> ID #${data.attachment_id}`);
          
          // Replace raw Unsplash URLs in the content
          updatedHtml = updatedHtml.replaceAll(imageUrl, data.attachment_url);
        }
      } else {
        const errTxt = await res.text().catch(() => "");
        console.warn(`[Sideload Helper] Failed to import image ${imageUrl}: HTTP ${res.status} - ${errTxt}`);
      }
    } catch (err: any) {
      console.error(`[Sideload Helper] Exception while sideloading image ${imageUrl}:`, err);
    }
  }

  return updatedHtml;
}
