import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
import crypto from "crypto";
import fs from "fs";
import path from "path";

// Global in-memory inventory cache
if (!(global as any).wpAiInventoryCache) {
  (global as any).wpAiInventoryCache = {};
}

function getOpenAiApiKey(): string | null {
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim()) {
    return process.env.OPENAI_API_KEY.trim().replace(/^["']|["']$/g, "");
  }

  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf-8");
      const match = envContent.match(/OPENAI_API_KEY=["']?([^"'\s\r\n]+)["']?/);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
  } catch (err) {
    console.warn("[Chat API] Dynamic .env reading notice:", err);
  }

  return null;
}

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
    const body = await req.json();
    const { prompt, siteId, chatHistory = [], imageAttachment } = body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const cleanPrompt = prompt.trim();
    const lowerPrompt = cleanPrompt.toLowerCase();

    if (!payload) {
      return NextResponse.json({
        reply: "Welcome to **WordPress AI Assistant**! To analyze your website, generate AI proposals, and perform 1-click safe edits, please **Log In** or **Sign Up for Free**.",
        requireAuth: true,
        requireSite: false,
      });
    }

    let site = null;
    if (siteId) {
      site = await prisma.wordPressSite.findFirst({
        where: { id: siteId, userId: payload.role !== "ADMIN" ? payload.userId : undefined },
      });
    }

    // Fallback to latest site if specified siteId wasn't found or has no apiKey
    if (!site || !site.apiKey) {
      const latestSite = await prisma.wordPressSite.findFirst({
        where: { userId: payload.userId, apiKey: { not: null } },
        orderBy: { createdAt: "desc" },
      });
      if (latestSite) {
        site = latestSite;
      }
    }

    if (!site) {
      return NextResponse.json({
        reply: "You're logged in! Please **connect a WordPress website** first so I can analyze its live inventory and assist you.",
        requireAuth: false,
        requireSite: true,
      });
    }

    let sitePages: any[] = [];
    let sitePosts: any[] = [];

    // Fetch WordPress inventory with retry & global memory fallback
    try {
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const hmacSecret = (site as any).hmacSecret || "default_hmac_secret";
      const signature = crypto.createHmac("sha256", hmacSecret).update(`${timestamp}.`).digest("hex");
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "X-WP-AI-Timestamp": timestamp,
        "X-WP-AI-Signature": signature,
      };
      if (site.apiKey) {
        headers["X-WP-AI-API-Key"] = site.apiKey;
        headers["Authorization"] = `Bearer ${site.apiKey}`;
      }

      let invRes = await fetch(`${site.url.replace(/\/$/, "")}/wp-json/wp-ai/v1/inventory`, {
        headers,
      }).catch(() => null);

      if (!invRes || !invRes.ok) {
        // Retry once if initial fetch failed
        invRes = await fetch(`${site.url.replace(/\/$/, "")}/wp-json/wp-ai/v1/inventory`, {
          headers,
        }).catch(() => null);
      }

      if (invRes && invRes.ok) {
        const invData = await invRes.json().catch(() => ({}));
        sitePages = invData.pages || [];
        sitePosts = invData.posts || [];

        if (sitePages.length > 0 || sitePosts.length > 0) {
          // Save to global in-memory backup cache
          (global as any).wpAiInventoryCache[site.id] = {
            pages: sitePages,
            posts: sitePosts,
            timestamp: Date.now(),
          };
          (global as any).wpAiInventoryCache["global_latest"] = {
            pages: sitePages,
            posts: sitePosts,
            timestamp: Date.now(),
          };
        }
      }
    } catch (err) {
      console.warn("[Chat API] Live inventory fetch notice:", err);
    }

    // Fallback to global in-memory inventory cache if current live fetch failed
    if (sitePages.length === 0 && sitePosts.length === 0) {
      const cached = (global as any).wpAiInventoryCache[site.id] || (global as any).wpAiInventoryCache["global_latest"];
      if (cached) {
        sitePages = cached.pages || [];
        sitePosts = cached.posts || [];
        console.log(`[Chat API] Restored ${sitePages.length} pages and ${sitePosts.length} posts from global inventory cache for ${site.name}.`);
      }
    }

    const allInventoryItems = [...sitePages, ...sitePosts];

    // Explicit Page & Post Summary formatting for OpenAI
    const pagesSummaryStr = sitePages.length > 0
      ? sitePages.map((p, idx) => `${idx + 1}. "${p.title}" (ID: ${p.id}, Slug: /${p.slug}, Words: ${p.word_count || 0}, MetaDesc: "${p.meta_description || 'MISSING'}")`).join("\n")
      : "No pages returned from site REST API.";

    const postsSummaryStr = sitePosts.length > 0
      ? sitePosts.map((p, idx) => `${idx + 1}. "${p.title}" (ID: ${p.id}, Slug: /${p.slug})`).join("\n")
      : "No posts returned from site REST API.";

    // Structured inventory payload
    const structuredInventory = allInventoryItems.map((i) => {
      const itemTitle = (i.title || "").toString();
      const itemSlug = (i.slug || "").toString();
      const titleMatch = itemTitle ? lowerPrompt.includes(itemTitle.toLowerCase()) : false;
      const slugMatch = itemSlug ? lowerPrompt.includes(itemSlug.toLowerCase()) : false;
      const isTarget = titleMatch || slugMatch;

      const raw = (i.raw_content || "").toString();
      const rawContentToInclude = isTarget || allInventoryItems.length <= 8 ? raw : raw.length > 1000 ? raw.slice(0, 1000) + "... [truncated]" : raw;

      return {
        id: i.id,
        type: i.type || (sitePages.some((p) => p.id === i.id) ? "page" : "post"),
        title: itemTitle || "Untitled",
        slug: itemSlug || "page",
        editor_type: i.editor_type || "classic",
        word_count: i.word_count || 0,
        meta_description: i.meta_description || "MISSING",
        h1_count: i.content_structure?.h1_count ?? (raw.includes("<h1") ? 1 : 0),
        images_count: i.content_structure?.images_count ?? 0,
        missing_alt_images: i.content_structure?.missing_alt_images || i.missing_alt_images || [],
        raw_content: rawContentToInclude,
      };
    });

    const openAiApiKey = getOpenAiApiKey();

    if (!openAiApiKey) {
      return NextResponse.json({
        reply: `⚠️ **OpenAI API Key Missing**: Please add \`OPENAI_API_KEY="sk-..."\` to your \`saas/.env\` file.`,
        site: { id: site.id, name: site.name, url: site.url },
      });
    }

    const imageContextStr = imageAttachment
      ? `USER ATTACHED AN IMAGE FILE FROM DESKTOP:
FileName: ${imageAttachment.name}
FileType: ${imageAttachment.type}`
      : "No image attached.";

    const systemMessage = `You are WordPress AI Assistant connected live to WordPress website "${site.name}" (${site.url}).

EXACT LIVE WEBSITE PAGES & POSTS LIST:
- Total Pages Count: ${sitePages.length}
- Total Posts Count: ${sitePosts.length}

PAGES LIST:
${pagesSummaryStr}

POSTS LIST:
${postsSummaryStr}

DETAILED INVENTORY & RAW CONTENT:
${JSON.stringify(structuredInventory, null, 2)}

${imageContextStr}

SUPPORTED ACTION TYPES FOR PROPOSAL_JSON:
- "update_post_title": Use when user wants to change, rename, or update page/post title. (ruleId: "CONTENT_002")
- "update_meta_description": Use when user wants to add/update meta description. (ruleId: "SEO_001")
- "update_meta_title": Use when user wants to update SEO title tag. (ruleId: "SEO_004")
- "update_post_content": Use when user wants to redesign, upgrade, remove, replace, add, or edit headings, paragraphs, hero banners, feature cards, team sections, images, or body content on a page. (ruleId: "CONTENT_001" or "CONTENT_003")
- "update_alt_text": Use when user wants to fix image ALT text. (ruleId: "MEDIA_001")

CRITICAL PERSONALITY & TONE RULES:
1. CHATGPT PERSONALITY:
   - Speak warmly, intelligently, and interactively (just like ChatGPT).
   - Use SUBTLE, TASTEFUL emojis (✨, 💡, 🚀, 📌) only where helpful (e.g. key callouts or bullet points). Do not over-use emojis.
   - Always encourage user collaboration and ask natural follow-up questions.
2. ACCURATE PAGE REPORTING:
   - Your site HAS ${sitePages.length} pages and ${sitePosts.length} posts listed in the inventory above.
   - NEVER state that there are 0 pages when pages exist in the inventory above!
3. ABSOLUTELY NO DUMMY ENDINGS:
   - NEVER write "Now, I will make that change.", "Now, I will implement this change.", or "I will proceed to update..." WITHOUT APPENDING PROPOSAL_JSON.
   - YOU DO NOT HAVE DIRECT WRITE ACCESS TO WORDPRESS. YOU MUST ALWAYS GENERATE PROPOSAL_JSON FOR EVERY EDIT/CHANGE/REDESIGN REQUEST.

CRITICAL PAGE REDESIGN & GUTENBERG BLOCK PATTERN RULES:
When the user asks to REDESIGN, UPGRADE, IMPROVE, or BEAUTIFY a page (or says a page is too normal):
1. Analyze the page's current content in DETAILED INVENTORY above.
2. Generate rich, modern Gutenberg block structures in "suggestedValue":
   - HERO COVER BANNER BLOCK:
     <!-- wp:cover {"dimRatio":50,"overlayColor":"black","isUserOverlayColor":true,"align":"full"} -->
     <div className="wp-block-cover alignfull"><span aria-hidden="true" className="wp-block-cover__gradient-background has-background-dim"></span>
     <div className="wp-block-cover__inner-container">
     <!-- wp:heading {"level":1,"className":"has-text-align-center"} -->
     <h1 className="has-text-align-center wp-block-heading">Welcome to Our Studio ✨</h1>
     <!-- /wp:heading -->
     <!-- wp:paragraph {"align":"center"} -->
     <p className="has-text-align-center">Empowering founders with high-scale AI systems.</p>
     <!-- /wp:paragraph -->
     </div></div>
     <!-- /wp:cover -->
   - 3-COLUMN FEATURE CARDS GRID:
     <!-- wp:columns {"align":"wide"} -->
     <div className="wp-block-columns alignwide">
     <!-- wp:column {"style":{"spacing":{"padding":{"top":"20px","right":"20px","bottom":"20px","left":"20px"}},"border":{"radius":"16px","width":"1px","color":"#e2e8f0"}},"backgroundColor":"slate-50"} -->
     <div className="wp-block-column has-slate-50-background-color has-background" style="border-color:#e2e8f0;border-width:1px;border-radius:16px;padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px">
     <!-- wp:heading {"level":3} --><h3>🚀 Feature One</h3><!-- /wp:heading -->
     <!-- wp:paragraph --><p>High performance architecture built from scratch.</p><!-- /wp:paragraph -->
     </div>
     <!-- /wp:column -->
     <!-- wp:column {"style":{"spacing":{"padding":{"top":"20px","right":"20px","bottom":"20px","left":"20px"}},"border":{"radius":"16px","width":"1px","color":"#e2e8f0"}},"backgroundColor":"slate-50"} -->
     <div className="wp-block-column has-slate-50-background-color has-background" style="border-color:#e2e8f0;border-width:1px;border-radius:16px;padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px">
     <!-- wp:heading {"level":3} --><h3>✨ Feature Two</h3><!-- /wp:heading -->
     <!-- wp:paragraph --><p>Battle-tested production systems engineered for scale.</p><!-- /wp:paragraph -->
     </div>
     <!-- /wp:column -->
     </div>
     <!-- /wp:columns -->
   - TEAM MEMBER CARDS & AVATARS:
     Include structured team member profile cards with name, title, bio, and image blocks.
3. DESKTOP IMAGE UPLOAD INSTRUCTION:
   If team/banner images are missing from inventory, explicitly tell the user:
   "💡 **Tip**: To add custom photos to your new team cards or banner, click the 📷 image icon in the input bar below to upload your photos from your desktop!"

MANDATORY PROACTIVE USER ENGAGEMENT RULE (ENFORCED ON EVERY SINGLE RESPONSE):
At the end of EVERY response (including greetings like "hi" or "hello", answers to questions, or proposal generation), you MUST ALWAYS analyze the live website inventory and append 2-3 specific, actionable recommendations/issues found on the website to keep the user engaged!

FOR ALL CHANGE/FIX/UPDATE/REDESIGN REQUESTS, YOU MUST APPEND PROPOSAL_JSON AT THE VERY END AS A CLEAN JSON OBJECT:
PROPOSAL_JSON:
{
  "ruleId": "CONTENT_001",
  "category": "content_quality",
  "actionType": "update_post_content",
  "fieldLabel": "Page Body Content",
  "pageTitle": "Target Page Title",
  "affectedUrl": "/page-slug",
  "entityId": 123,
  "currentValue": "Full Original raw_content",
  "suggestedValue": "Full Modified raw_content"
}`;

    const openAiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemMessage },
          ...chatHistory.slice(-4),
          { role: "user", content: cleanPrompt },
        ],
        temperature: 0.2,
        max_tokens: 3500,
      }),
    });

    if (!openAiRes.ok) {
      const errJson = await openAiRes.json().catch(() => ({}));
      const errorMsg = errJson?.error?.message || `HTTP ${openAiRes.status} ${openAiRes.statusText}`;
      console.error("[Chat API Error]:", errJson);

      return NextResponse.json({
        reply: `⚠️ **OpenAI API Error**: ${errorMsg}`,
        site: { id: site.id, name: site.name, url: site.url },
      });
    }

    const aiData = await openAiRes.json();
    let rawContent = aiData.choices?.[0]?.message?.content || "I have processed your request.";
    let fullReplyText = rawContent;
    let extractedProposal: any = null;

    // 1. Direct PROPOSAL_JSON keyword extraction
    if (rawContent.includes("PROPOSAL_JSON:")) {
      const parts = rawContent.split("PROPOSAL_JSON:");
      fullReplyText = parts[0].trim();
      let jsonStr = parts[1].trim();

      jsonStr = jsonStr.replace(/^```json/i, "").replace(/^```/, "").replace(/```$/, "").trim();

      const firstBrace = jsonStr.indexOf("{");
      const lastBrace = jsonStr.lastIndexOf("}");
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        jsonStr = jsonStr.slice(firstBrace, lastBrace + 1);
      }

      try {
        extractedProposal = JSON.parse(jsonStr);
      } catch (e) {
        console.warn("[Chat API] Failed to parse OpenAI proposal JSON:", e);
      }
    }

    // 2. Failsafe Raw JSON Object extraction (if PROPOSAL_JSON keyword was missing but JSON was outputted)
    if (!extractedProposal && (rawContent.includes('"actionType"') || rawContent.includes('"suggestedValue"'))) {
      const firstBrace = rawContent.indexOf("{");
      const lastBrace = rawContent.lastIndexOf("}");
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        const potentialJson = rawContent.slice(firstBrace, lastBrace + 1);
        try {
          const parsed = JSON.parse(potentialJson);
          if (parsed.actionType || parsed.suggestedValue || parsed.ruleId) {
            extractedProposal = parsed;
            fullReplyText = rawContent.slice(0, firstBrace).trim() || "I have prepared the proposal for your request below. ✨";
          }
        } catch (e) {}
      }
    }

    // Clean any hallucinated trailing phrases like "Now, I will make that change." from text reply
    fullReplyText = fullReplyText
      .replace(/Now,?\s*I\s*will\s*(make|implement|proceed\s*to\s*make|apply)\s*(that|this|the)?\s*change\.?/gi, "")
      .replace(/Here'?s\s*the\s*proposed\s*change:?\s*$/gi, "")
      .trim();

    // 3. FAILSAFE PROPOSAL GENERATOR: Guarantee proposal generation for any edit/redesign request
    const isChangeRequest = /(change|update|replace|remove|delete|add|fix|rename|set|email|heading|h1|meta|title|content|redesign|banner|cards|section|upgrade|improve|style)/i.test(cleanPrompt);

    if (!extractedProposal && isChangeRequest && allInventoryItems.length > 0) {
      // Find target item by prompt matching or default to About Us or first item
      const targetItem = allInventoryItems.find((i) =>
        lowerPrompt.includes((i.title || "").toLowerCase()) ||
        lowerPrompt.includes((i.slug || "").toLowerCase())
      ) || sitePages.find((p) => (p.title || "").toLowerCase().includes("about")) || allInventoryItems[0];

      if (targetItem) {
        const origRaw = targetItem.raw_content || "";
        let modRaw = origRaw;

        // Smart text replacement for emails or general strings
        const emailMatch = cleanPrompt.match(/(["']?[\w.-]+@[\w.-]+\.\w+["']?)\s*(?:to|with|=|->)\s*(["']?[\w.-]+@[\w.-]+\.\w+["']?)/i);
        if (emailMatch) {
          const oldEmail = emailMatch[1].replace(/["']/g, "").trim();
          const newEmail = emailMatch[2].replace(/["']/g, "").trim();
          if (origRaw.includes(oldEmail)) {
            modRaw = origRaw.replaceAll(oldEmail, newEmail);
          } else {
            modRaw = origRaw + `\n<!-- wp:paragraph -->\n<p>Contact: ${newEmail}</p>\n<!-- /wp:paragraph -->`;
          }
        }

        extractedProposal = {
          ruleId: "CONTENT_001",
          category: "content_quality",
          actionType: "update_post_content",
          fieldLabel: "Page Body Content",
          pageTitle: targetItem.title || "Target Page",
          affectedUrl: `/${targetItem.slug || "page"}`,
          entityId: targetItem.id,
          currentValue: origRaw,
          suggestedValue: modRaw,
        };

        console.log(`[Chat API Failsafe] Auto-generated proposal card for target page "${targetItem.title}" (#${targetItem.id}).`);
      }
    }

    return NextResponse.json({
      reply: fullReplyText,
      proposalDraft: extractedProposal,
      site: { id: site.id, name: site.name, url: site.url },
      requireAuth: false,
      requireSite: false,
    });
  } catch (error: any) {
    console.error("[Chat API Exception]:", error);
    return NextResponse.json({ error: `Chat processing error: ${error.message}` }, { status: 500 });
  }
}
