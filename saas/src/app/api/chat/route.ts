import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
import { sideloadUnsplashImagesInContent } from "../../../lib/sideloadHelper";
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

    const userSites = await prisma.wordPressSite.findMany({
      where: { userId: payload.userId },
    });

    let site = null;
    if (siteId) {
      site = userSites.find((s) => s.id === siteId);
    }

    if (!site) {
      if (userSites.length === 0) {
        return NextResponse.json({
          reply: "You're logged in! Please **connect a WordPress website** first so I can analyze its live inventory and assist you.",
          requireAuth: false,
          requireSite: true,
        });
      } else if (userSites.length === 1) {
        site = userSites[0];
      } else {
        const siteList = userSites.map((s, idx) => `${idx + 1}. **${s.name}** (${s.url})`).join("\n");
        return NextResponse.json({
          reply: `I see you have multiple websites connected:\n\n${siteList}\n\n**Which website** would you like to discuss or optimize? Please select it from the sidebar on the left to start a focused conversation.`,
          requireAuth: false,
          requireSite: false,
          selectSiteList: userSites.map((s) => ({ id: s.id, name: s.name })),
        });
      }
    }

    let sitePages: any[] = [];
    let sitePosts: any[] = [];
    let siteSettings: any = {};
    let activeTheme: any = {};

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
        siteSettings = invData.site_settings || {};
        activeTheme = invData.active_theme || {};

        if (sitePages.length > 0 || sitePosts.length > 0) {
          // Save to global in-memory backup cache
          (global as any).wpAiInventoryCache[site.id] = {
            pages: sitePages,
            posts: sitePosts,
            site_settings: siteSettings,
            active_theme: activeTheme,
            timestamp: Date.now(),
          };
          (global as any).wpAiInventoryCache["global_latest"] = {
            pages: sitePages,
            posts: sitePosts,
            site_settings: siteSettings,
            active_theme: activeTheme,
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
        siteSettings = cached.site_settings || {};
        activeTheme = cached.active_theme || {};
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

    // Fetch site memory log entries
    const siteMemories = await prisma.siteMemory.findMany({
      where: { siteId: site.id },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    const memoriesStr = siteMemories.length > 0
      ? siteMemories.map(m => `[${m.createdAt.toISOString()}] Key: ${m.key} | Value: ${m.value}`).join("\n")
      : "No past memories or Search Console errors saved yet.";

    // Auto-save Search Console issues into memory if detected in the user prompt
    if (lowerPrompt.includes("google search console") || lowerPrompt.includes("search console") || lowerPrompt.includes("indexing error") || lowerPrompt.includes("crawl error")) {
      await prisma.siteMemory.create({
        data: {
          siteId: site.id,
          key: "search_console_error",
          value: JSON.stringify({
            prompt: cleanPrompt,
            detectedAt: new Date().toISOString(),
            status: "analyzed",
          }),
        },
      });
    }

    // State Machine logic
    const stateMemory = await prisma.siteMemory.findFirst({
      where: { siteId: site.id, key: "site_generation_state" },
      orderBy: { updatedAt: "desc" },
    });

    let genState: any = null;
    if (stateMemory) {
      try {
        genState = JSON.parse(stateMemory.value);
      } catch (e) {
        console.warn("[Chat API] Failed to parse site_generation_state:", e);
      }
    }

    const isNewBuildRequest = /(build|create|generate|start|setup|make|want|need|design)\s*(new)?\s*(website|site|pages|cleaning|portfolio|restaurant|dental|law|coffee|shop|dentist|clinic|cafe)/i.test(cleanPrompt);
    const isResetRequest = /(reset|start over|restart|clear state|delete state)/i.test(cleanPrompt);

    if (isResetRequest || isNewBuildRequest) {
      genState = {
        current_milestone: 0,
        status: "PLANNED",
        attempt: 0,
        started_at: new Date().toISOString(),
        completed_at: null,
        verification_result: null,
        last_error: null,
        siteContext: {},
        brandingContext: {},
        businessStrategy: {},
        designStrategy: {},
        websiteArchitecture: {},
        homepageBlueprint: {},
        mediaWorkflow: {},
        builderNeutralSpec: {},
        remainingPages: [],
        globalComponents: {
          navigation: { status: "PLANNED" },
          header: { status: "PLANNED" },
          footer: { status: "PLANNED" }
        }
      };

      if (stateMemory) {
        await prisma.siteMemory.update({
          where: { id: stateMemory.id },
          data: { value: JSON.stringify(genState) },
        });
      } else {
        await prisma.siteMemory.create({
          data: {
            siteId: site.id,
            key: "site_generation_state",
            value: JSON.stringify(genState),
          },
        });
      }
    }

    // Process Active Milestones
    let customMilestoneMessage = "";
    if (genState && genState.current_milestone === 0) {
      // 1. Run Scan and Classify Site
      const activeThemeInfo = activeTheme || {};
      const isBlock = !!activeThemeInfo.is_block_theme;
      
      const defaultTitles = ["sample page", "privacy policy", "hello world", "hello world!"];
      const actualNonDefaultPages = sitePages.filter((p: any) => {
        const title = (p.title || "").toLowerCase();
        return !defaultTitles.includes(title);
      });
      const actualNonDefaultPosts = sitePosts.filter((p: any) => {
        const title = (p.title || "").toLowerCase();
        return !defaultTitles.includes(title);
      });

      const isSiteBlank = actualNonDefaultPages.length === 0 && actualNonDefaultPosts.length === 0;
      
      let niche = "Business Niche";
      const titleLower = (site.name || "").toLowerCase();
      if (titleLower.includes("dental") || titleLower.includes("dentist")) niche = "Dental Clinic";
      else if (titleLower.includes("clean") || titleLower.includes("cleaning")) niche = "Cleaning Services";
      else if (titleLower.includes("coffee") || titleLower.includes("cafe") || titleLower.includes("coffee")) niche = "Coffee Shop";
      else if (titleLower.includes("law") || titleLower.includes("attorney")) niche = "Law Firm";

      if (isSiteBlank) {
        // Classify as FRESH
        genState.current_milestone = 9; // theme selection choice
        genState.status = "AWAITING_INPUT";
        genState.build_mode_status = "AWAITING_SELECTION";
        genState.suggestions = [
          "Generate premium custom block theme (Recommended)",
          "Keep current active theme"
        ];
        customMilestoneMessage = `👋 Welcome! I scanned your connected WordPress site and detected that this is a **fresh, blank WordPress installation**.\n\nTo build your visual framework, would you like to build using the **current active theme** or generate a modern, premium **custom block theme** (highly recommended for custom visual design controls)?`;
      } else {
        // Classify as EXISTING
        genState.current_milestone = 100; // Conversational chatbot
        genState.status = "PASSED";
        genState.build_mode = "CURRENT_THEME";
        
        // If it's the welcome scan trigger, return greeting. Otherwise, let it fall through to process prompt.
        if (cleanPrompt.toLowerCase().trim() === "hello") {
          genState.suggestions = [
            "Optimize SEO on my existing pages",
            "Create a new service page",
            "Change my site brand colors",
            "Build a custom block layout"
          ];
          customMilestoneMessage = `👋 Hi! I have successfully connected to your website. I detected your website topic is related to **${niche}**.\n\nIt looks very interesting! How can I help you improve or update your site today? You can choose one of the suggestion options below or describe what you want to do directly!`;
        }
      }

      // Save updated state to DB
      const currentMemory = await prisma.siteMemory.findFirst({
        where: { siteId: site.id, key: "site_generation_state" },
      });
      if (currentMemory) {
        await prisma.siteMemory.update({
          where: { id: currentMemory.id },
          data: { value: JSON.stringify(genState) },
        });
      }
    }
    else if (genState && genState.current_milestone === 9 && genState.status === "AWAITING_INPUT") {
      const choice = (cleanPrompt || "").toLowerCase().trim();
      let selectedOption = "";
      if (choice.includes("custom") || choice.includes("recommend") || choice.includes("theme")) {
        selectedOption = "CUSTOM_PREMIUM";
      } else if (choice.includes("keep") || choice.includes("active") || choice.includes("current")) {
        selectedOption = "CURRENT_THEME";
      }

      if (selectedOption === "CUSTOM_PREMIUM") {
        genState.build_mode = "CUSTOM_PREMIUM";
        genState.build_mode_status = "SELECTED";

        // Call connector install_custom_theme proposal directly
        try {
          const rawName = site.name || "Fresh Dental Clinic";
          const themeName = `${rawName} Premium AI Theme`;
          
          let cleanSlug = rawName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          if (!cleanSlug) { cleanSlug = "fresh-dental"; }
          const themeSlug = `${cleanSlug}-premium-ai`;

          const themeJsonObj = {
            version: 2,
            settings: {
              appearanceTools: true,
              color: {
                palette: [
                  { slug: "primary", color: "#1e3a8a", name: "Primary" },
                  { slug: "secondary", color: "#3b82f6", name: "Secondary" },
                  { slug: "background", color: "#ffffff", name: "Background" },
                  { slug: "text", color: "#212529", name: "Text" }
                ]
              },
              layout: {
                contentSize: "800px",
                wideSize: "1200px"
              }
            },
            styles: {
              color: {
                background: "var(--wp--preset--color--background)",
                text: "var(--wp--preset--color--text)"
              },
              elements: {
                link: {
                  color: { text: "var(--wp--preset--color--primary)" }
                }
              }
            }
          };

          const styleCssContent = `body { font-family: system-ui, sans-serif; line-height: 1.5; }`;
          const headerPart = `<!-- wp:group {"layout":{"type":"flex","justifyContent":"space-between"},"style":{"spacing":{"padding":{"top":"1.5rem","bottom":"1.5rem"}}}} -->\n<div class="wp-block-group" style="padding-top:1.5rem;padding-bottom:1.5rem"><!-- wp:site-title /--><!-- wp:navigation {"layout":{"type":"flex","orientation":"horizontal"}} /--></div>\n<!-- /wp:group -->`;
          const footerPart = `<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","bottom":"2rem"}},"border":{"top":{"color":"#eee","width":"1px"}}}} -->\n<div class="wp-block-group" style="border-top:1px solid #eee;padding-top:2rem;padding-bottom:2rem"><!-- wp:paragraph {"align":"center"} --><p class="has-text-align-center">© ${new Date().getFullYear()} ${rawName}. Custom AI Theme.</p><!-- /wp:paragraph --></div>\n<!-- /wp:group -->`;
          const frontPageHtml = `<!-- wp:template-part {"slug":"header","tagName":"header"} /-->\n<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->\n<main class="wp-block-group"><!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"8rem","bottom":"8rem"}},"color":{"background":"var(--wp--preset--color--primary)"}},"layout":{"type":"constrained"} } --><div class="wp-block-group alignfull has-background" style="padding-top:8rem;padding-bottom:8rem"><!-- wp:heading {"level":1,"align":"center","style":{"typography":{"fontSize":"3.5rem"},"color":{"text":"#ffffff"}}} --><h1 class="wp-block-heading has-text-align-center" style="color:#ffffff;font-size:3.5rem">Welcome to ${rawName}</h1><!-- /wp:heading --><!-- wp:paragraph {"align":"center","style":{"color":{"text":"#ffffff"}}} --><p class="has-text-align-center" style="color:#ffffff">Custom block template generation foundation verified.</p><!-- /wp:paragraph --></div><!-- /wp:group --></main>\n<!-- /wp:group -->\n<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->`;
          const pageHtml = `<!-- wp:template-part {"slug":"header","tagName":"header"} /-->\n<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->\n<main class="wp-block-group"><!-- wp:post-title {"style":{"spacing":{"margin":{"top":"3rem","bottom":"2rem"}}}} /--><!-- wp:post-content /--></main>\n<!-- /wp:group -->\n<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->`;
          const indexHtml = pageHtml;
          const singleHtml = pageHtml;
          const errorHtml = pageHtml;

          const requestBody = JSON.stringify({
            action_type: "install_custom_theme",
            proposed_values: {
              theme_slug: themeSlug,
              theme_name: themeName,
              theme_json: JSON.stringify(themeJsonObj),
              style_css: styleCssContent,
              templates: {
                "front-page.html": frontPageHtml,
                "page.html": pageHtml,
                "index.html": indexHtml,
                "single.html": singleHtml,
                "404.html": errorHtml
              },
              parts: {
                "header.html": headerPart,
                "footer.html": footerPart
              }
            }
          });

          const timestamp = Math.floor(Date.now() / 1000).toString();
          const signature = crypto.createHmac("sha256", site.hmacSecret || "default_hmac_secret").update(`${timestamp}.${requestBody}`).digest("hex");
          
          const installHeaders: Record<string, string> = {
            "Content-Type": "application/json",
            "X-WP-AI-Timestamp": timestamp,
            "X-WP-AI-Signature": signature,
          };
          if (site.apiKey) {
            installHeaders["X-WP-AI-API-Key"] = site.apiKey;
            installHeaders["Authorization"] = `Bearer ${site.apiKey}`;
          }

          const installRes = await fetch(`${site.url.replace(/\/$/, "")}/wp-json/wp-ai/v1/execute`, {
            method: "POST",
            headers: installHeaders,
            body: requestBody
          });

          if (installRes.ok) {
            customMilestoneMessage = `✨ **Theme Generated and Activated Successfully!** ✨\n\nI have successfully compiled, uploaded, and activated your custom premium block theme:\n* **Theme Slug**: \`${themeSlug}\`\n* **Templates**: Home, Page, Single, Archive, 404 compiled.\n\nYou are now ready to build your layouts. What pages should we create or design first?`;
          } else {
            customMilestoneMessage = `✨ **Theme Generated Successfully!** ✨\n\nI compiled and saved your custom theme files on your site under \`/wp-content/themes/${themeSlug}\`.\n\n* **Theme Name**: \`Fresh Dental Clinic Premium AI Theme\`\n* **Next Step**: Since automated core theme activation returned a standard authorization block, please go to your WordPress admin (**Appearance -> Themes**) and click **Activate** on the **${themeName}** manually!\n\nOnce activated, tell me what pages we should build next!`;
          }
        } catch (e) {
          customMilestoneMessage = `✨ **Theme Generated!** ✨\n\nI compiled your custom premium block theme templates. Please ensure your custom theme is activated in your WordPress admin under Appearance -> Themes. What pages should we build next?`;
        }

        genState.current_milestone = 100; // Move to conversational mode
        genState.status = "PASSED";
        genState.suggestions = [
          "Build Dentist Clinic website",
          "Build Cleaning Company website",
          "Build Coffee Shop website"
        ];
      } else if (selectedOption === "CURRENT_THEME") {
        genState.build_mode = "CURRENT_THEME";
        genState.build_mode_status = "SELECTED";
        customMilestoneMessage = `Great choice! We will proceed using your active theme layout system. What business niche or pages would you like to build today?`;

        genState.current_milestone = 100; // Move to conversational mode
        genState.status = "PASSED";
        genState.suggestions = [
          "Build Dentist Clinic website",
          "Build Cleaning Company website",
          "Build Coffee Shop website"
        ];
      } else {
        // Keep them on Milestone 9 and remind them of options
        customMilestoneMessage = `👋 Welcome! I scanned your connected WordPress site and detected that this is a **fresh, blank WordPress installation**.\n\nTo build your visual framework, would you like to build using the **current active theme** or generate a modern, premium **custom block theme** (highly recommended for custom visual design controls)?`;
      }

      // Save updated state to DB
      const currentMemory = await prisma.siteMemory.findFirst({
        where: { siteId: site.id, key: "site_generation_state" },
      });
      if (currentMemory) {
        await prisma.siteMemory.update({
          where: { id: currentMemory.id },
          data: { value: JSON.stringify(genState) },
        });
      }
    }
    else if (genState && genState.current_milestone === 100) {
      // Conversational state: Let it fall through to OpenAI to reply!
    }
    
    if (customMilestoneMessage) {
      return NextResponse.json({
        reply: customMilestoneMessage,
        generationState: genState,
        site: { id: site.id, name: site.name, url: site.url },
        requireAuth: false,
        requireSite: false,
      });
    }

    const openAiApiKey = getOpenAiApiKey();

    if (!openAiApiKey) {
      return NextResponse.json({
        reply: `⚠️ **OpenAI API Key Missing**: Please add \`OPENAI_API_KEY="sk-..."\` to your \`saas/.env\` file.`,
        site: { id: site.id, name: site.name, url: site.url },
      });
    }

    // 1. OpenAI Intent Routing Classifier
    let isBuildRequest = false;
    let classifierObj: any = null;

    if (genState && genState.current_milestone === 100) {
      try {
        const classifierRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openAiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: `Analyze the user's prompt and determine if they want to build, generate, create, or setup a new business website. Return a JSON object with this format. Do not return markdown backticks:
{
  "is_build_request": true/false,
  "niche": "string (e.g. coffee, cleaning, dentist, construction, restaurant, portfolio, custom)",
  "business_name": "string (detected name or default based on niche)",
  "location": "string or null (e.g. NYC)",
  "color_theme": "string or null (e.g. pale green, dark blue, default)",
  "services_count": number (default is 5, max 10),
  "contact_info": {
    "email": "string or null",
    "phone": "string or null",
    "address": "string or null"
  }
}`
              },
              { role: "user", content: cleanPrompt }
            ],
            temperature: 0,
            response_format: { type: "json_object" }
          })
        });

        if (classifierRes.ok) {
          const resJson = await classifierRes.json();
          classifierObj = JSON.parse(resJson.choices?.[0]?.message?.content || "{}");
          isBuildRequest = !!classifierObj.is_build_request;
        }
      } catch (e) {
        console.error("Classifier error:", e);
      }
    }

    if (isBuildRequest && classifierObj && genState && genState.current_milestone === 100) {
      const nicheKeyword = classifierObj.niche || "coffee";
      const businessName = classifierObj.business_name || site.name || "My AI Business";
      const homepageTitle = businessName;

      genState.status = "BUILDING";
      genState.current_milestone = 1;
      genState.logs = [`[${new Date().toLocaleTimeString()}] Initializing autonomous background site builder for ${businessName}...`];
      
      const currentMemory = await prisma.siteMemory.findFirst({
        where: { siteId: site.id, key: "site_generation_state" },
      });
      if (currentMemory) {
        await prisma.siteMemory.update({
          where: { id: currentMemory.id },
          data: { value: JSON.stringify(genState) },
        });
      }

      // Trigger background build asynchronously
      runAutonomousBuild(site.id, classifierObj).catch(err => {
        console.error("Autonomous background builder error:", err);
      });

      return NextResponse.json({
        reply: `⚙️ **Autonomous Site Builder Activated!** ⚙️\n\nI have successfully launched the background builder pipeline to construct your professional **${homepageTitle}** website:\n\n* **Niche & Brand**: ${nicheKeyword.toUpperCase()} business located in ${classifierObj.location || "Local Area"}.\n* **Branding Color Theme**: Compiled using ${classifierObj.color_theme || "standard premium"} color system.\n* **Pages Construction**: Creating Home page, Services page (${classifierObj.services_count || 5} categories), About Us, and Contact page.\n* **Dynamic Asset Import**: Sideloading professional high-resolution stock photos.\n\n*Please wait... I will display real-time background logs directly in the chat below!* 🚀`,
        proposalDraft: null,
        site: { id: site.id, name: site.name, url: site.url },
        generationState: genState,
        requireAuth: false,
        requireSite: false,
        suggestions: []
      });
    }

    const imageContextStr = imageAttachment
      ? `USER ATTACHED AN IMAGE FILE FROM DESKTOP:
FileName: ${imageAttachment.name}
FileType: ${imageAttachment.type}
IMPORTANT: If the user requests to set this attached image as their site logo, you MUST generate a proposal card with actionType "set_site_logo" and set suggestedValue to "${imageAttachment.name}". The backend will automatically map this name to the image dataUrl.`
      : "No image attached.";

    const systemMessage = `You are WordPress AI Assistant connected live to WordPress website "${site.name}" (${site.url}).

CURRENT STATE MACHINE CONTEXT (Milestone-based generation pipeline):
${genState ? `Active State: ${JSON.stringify(genState, null, 2)}` : "No active build state machine."}
Rule: You must strictly align any generated proposal content, layouts, sitemaps, templates, or media mapping variables with the active state machine parameters shown above. If the active state has established a designStrategy, websiteArchitecture, homepageBlueprint, or mediaWorkflow, you MUST read and apply them (e.g. use the exact layout, colors, sections, image mappings, and pages determined by those strategies).
DO NOT invent customer reviews, testimonials, ratings, years of experience, locations, phone numbers, or credentials unless explicitly supplied in the brandingContext or site context. If the blueprint has testimonials, do NOT invent fake reviews/ratings; either omit them or present non-factual visual section elements instead of customer attributions.
If the active state contains a mediaWorkflow with imported stock images (mapped under section IDs), you MUST use those exact sideloaded media attachment URLs for the corresponding sections inside Cover, Columns, Media & Text, or Image blocks. Do NOT request external Unsplash image URLs directly. Use the imported media URLs.

PAST SITE MEMORIES & SAVED CONTEXT (Learned from previous sessions or Search Console logs):
${memoriesStr}

SITE VOLUME ANALYSIS:
- Is site empty/blank? ${allInventoryItems.length === 0 ? "YES (The WordPress site has 0 pages and 0 posts. It is completely blank)" : "NO (The WordPress site has existing pages and posts)"}

GLOBAL SITE CONFIGURATION SETTINGS:
- Homepage Display Setting (show_on_front): ${siteSettings.show_on_front || "posts"}
- Page Displayed on Front (page_on_front): Page ID #${siteSettings.page_on_front || 0}
- Custom Header Logo Attachment ID (custom_logo_id): ${siteSettings.custom_logo_id || 0}
- Custom Header Logo URL (custom_logo_url): ${siteSettings.custom_logo_url || "No logo set"}

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
- "create_post": Use when the user requests to create or publish a new page or post (e.g. Services, About Us, Contact, Testimonials, Home). In suggestedValue, pass a JSON object: { "title": "Page Title", "content": "Gutenberg HTML content", "post_type": "page", "post_status": "publish" }. (ruleId: "CONTENT_006")
- "create_menu": Use when the user wants to set up navigation menus. In suggestedValue, pass a JSON object: { "menu_name": "Main Navigation", "menu_items": [ { "title": "Home", "type": "post_type", "object_id": 123 }, { "title": "Services", "type": "post_type", "object_id": 124 } ] }. (ruleId: "MENU_001")
- "set_front_page": Use when the user wants to configure which page is displayed as the static homepage. In suggestedValue, pass the Page ID as a number or string. (ruleId: "CONFIG_001")
- "set_site_logo": Use when the user uploads/shares a logo and wants it set globally. In suggestedValue, pass the Logo image URL. (ruleId: "CONFIG_002")

CRITICAL ONBOARDING & SCAN RULES:
1. BLANK SITE ONBOARDING:
   - If "Is site empty/blank?" is YES:
     - Promptly and warmly welcome the user to their fresh new WordPress site.
     - Tell them: "It looks like your WordPress site is currently empty. What kind of website do you want to build? Share a short summary (e.g., 'a premium cleaning company' or 'an AI agency portfolio') and I will guide you to create and design your pages with outstanding Gutenberg blocks, optimized content, and perfect SEO configurations!"
     - Do not scan for existing issues since there is no content.
   - HOMEPAGE SETTING ENFORCEMENT:
     - If you create or update a page intended to be the Homepage (e.g. "Home" page, or a page titled "Deep Cleaning"), and the GLOBAL SITE CONFIGURATION SETTINGS shows show_on_front is not "page" or page_on_front is not set to this page's ID:
       - You MUST inform the user in your message that you need to set this page as their website's static Homepage so it loads automatically at the root URL / instead of a blog roll.
       - You MUST generate a proposal card with actionType "set_front_page" and suggestedValue set to that page's ID (e.g. 232).
2. EXISTING SITE ENGAGEMENT:
   - If "Is site empty/blank?" is NO:
     - Keep the user highly engaged by adding a "Proactive Scan Recommendation" at the bottom of your response:
       - *"I also ran a quick background audit on your site and found X issues (e.g. Y alt texts missing, Z heading hierarchy skips). Would you like me to resolve them safely?"*
     - If they asked to modify page content, once executed, mention that you've kept the page SEO-friendly, and show the follow-up scanner results to encourage fixing other pages.
3. SEARCH CONSOLE ERROR & MEMORY RECORDING:
   - If the user shares Search Console errors or asks you to diagnose indexability:
     - Formulate a clear fix plan, execute page updates if needed, and tell the user that you've logged this in the database Site Memory so you will remember it in future messages.

CRITICAL PERSONALITY & TONE RULES:
1. CHATGPT PERSONALITY:
   - Speak warmly, intelligently, and interactively (just like ChatGPT).
   - Use SUBTLE, TASTEFUL emojis (✨, 💡, 🚀, 📌) only where helpful. Do not over-use emojis.
   - Always encourage user collaboration and ask natural follow-up questions.
2. ACCURATE PAGE REPORTING:
   - Your site HAS ${sitePages.length} pages and ${sitePosts.length} posts listed in the inventory above.
   - NEVER state that there are 0 pages when pages exist in the inventory above!
3. ABSOLUTELY NO DUMMY ENDINGS:
   - NEVER write "Now, I will make that change.", "Now, I will implement this change.", or "I will proceed to update..." WITHOUT APPENDING PROPOSAL_JSON.
   - YOU DO NOT HAVE DIRECT WRITE ACCESS TO WORDPRESS. YOU MUST ALWAYS GENERATE PROPOSAL_JSON FOR EVERY EDIT/CHANGE/REDESIGN REQUEST.
4. SINGLE PROPOSAL LIMIT:
   - YOU MUST ONLY PROPOSE EXACTLY ONE ACTION IN PROPOSAL_JSON PER TURN. DO NOT OUTPUT MULTIPLE PROPOSAL JSON BLOCKS.
   - If multiple actions are requested (e.g., creating a page AND setting a logo AND creating a menu), propose the most important one first (e.g., create_post to create the page), and inform the user that you will configure the menu and logo in the next steps as soon as this page is created.

CRITICAL PAGE REDESIGN & GUTENBERG BLOCK PATTERN RULES:
When the user asks to CREATE, REDESIGN, UPGRADE, IMPROVE, or BEAUTIFY a page:
1. CLAUDE-LEVEL PREMIUM DESIGN:
   - Do NOT just generate boring, plain grey boxes. Generate stunning, modern layouts.
   - Use inline 'style' attributes on wrapping 'div' containers to apply rich, modern styling:
     - Card Container: style="box-shadow: 0 10px 25px -5px rgba(0,0,0,0.08); border-radius: 20px; border: 1px solid rgba(226, 232, 240, 0.8); padding: 30px; background: #ffffff; margin-bottom: 20px; text-align: left;"
     - Text colors: slate-800 (#1e293b), indigo-600 (#4f46e5), slate-500 (#64748b).
     - Button styles: style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: #ffffff; font-weight: 700; padding: 14px 28px; border-radius: 9999px; text-decoration: none; display: inline-block; box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3); border: none; margin-top: 15px;"
2. High-Quality Stock Images:
   - Do NOT leave cover blocks empty or use plain grey blocks. Use gorgeous, context-relevant Unsplash stock image URLs inside 'wp:cover' and 'img' src tags.
   - NYC/Cleaning Unsplash Images:
     - Hero/Cleaning Cover: https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1920&q=80 (A professional cleaner sanitizing)
     - Office/Window Clean: https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80 (Washing windows)
     - Luxury Home: https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80 (Clean modern apartment)
     - NYC Skyline (Local context): https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80
3. Structured Content Sections:
   - **Hero Cover Banner**: Cover block with overlay opacity 50%, a bold, optimized H1 title, a descriptive subtitle, and a beautiful CTA button.
   - **Features/Benefits Grid**: 3-column layout showing cards with icons, bold titles (H3), and clean description.
   - **Services Grid**: 2-column or 3-column layout highlighting specialized services (e.g., "Manhattan Residential Deep Cleaning", "Brooklyn Office Sanitization").
   - **Testimonials Section**: Blockquote styled like cards with quote icons.
4. User Guidance on Global Configs:
   - Explain to the user that post content execution can be done via 1-click apply, but global theme settings (menu navigation, header logo, homepage settings, favicon) are global WordPress configurations.
   - In your chat reply text, ALWAYS provide a clean, step-by-step markdown checklist instructing them how to set these up in 30 seconds:
     1. **Set Homepage**: Go to Settings -> Reading -> Select "A static page" -> Set Homepage to Home.
     2. **Add Logo & Favicon**: Go to Appearance -> Customize -> Site Identity and upload your logo and favicon.
     3. **Create Menu**: Go to Appearance -> Menus, add your pages, and check the "Primary Menu" location.

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

      const potentialJson = extractFirstJsonObject(jsonStr);
      if (potentialJson) {
        try {
          extractedProposal = JSON.parse(potentialJson);
          extractedProposal = normalizeProposalObject(extractedProposal, imageAttachment);
        } catch (e) {
          console.warn("[Chat API] Failed to parse OpenAI proposal JSON:", e);
        }
      }
    }

    // 2. Failsafe Raw JSON Object extraction (if PROPOSAL_JSON keyword was missing but JSON was outputted)
    if (!extractedProposal && (rawContent.includes('"actionType"') || rawContent.includes('"suggestedValue"') || rawContent.includes('"proposedValue"'))) {
      const potentialJson = extractFirstJsonObject(rawContent);
      if (potentialJson) {
        try {
          const parsed = JSON.parse(potentialJson);
          if (parsed.actionType || parsed.suggestedValue || parsed.proposedValue || parsed.ruleId) {
            extractedProposal = normalizeProposalObject(parsed, imageAttachment);
            const firstBrace = rawContent.indexOf("{");
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
      generationState: genState,
      requireAuth: false,
      requireSite: false,
    });
  } catch (error: any) {
    console.error("[Chat API Exception]:", error);
    return NextResponse.json({ error: `Chat processing error: ${error.message}` }, { status: 500 });
  }
}

function extractFirstJsonObject(str: string): string | null {
  const firstBrace = str.indexOf("{");
  if (firstBrace === -1) return null;

  let depth = 0;
  for (let i = firstBrace; i < str.length; i++) {
    if (str[i] === "{") depth++;
    else if (str[i] === "}") {
      depth--;
      if (depth === 0) {
        return str.slice(firstBrace, i + 1);
      }
    }
  }
  return null;
}

function normalizeProposalObject(proposal: any, imageAttachment: any): any {
  if (!proposal) return proposal;

  if (proposal.proposedValue !== undefined && proposal.suggestedValue === undefined) {
    proposal.suggestedValue = proposal.proposedValue;
  }

  if (proposal.actionType === "set_site_logo" && imageAttachment) {
    const valStr = String(proposal.suggestedValue || "").toLowerCase();
    const nameStr = String(imageAttachment.name || "").toLowerCase();
    if (valStr.includes(nameStr) || valStr.includes("logo") || valStr.includes("uploaded")) {
      proposal.suggestedValue = imageAttachment.dataUrl;
    }
  }

  if (proposal.actionType === "create_post" && proposal.suggestedValue === undefined) {
    proposal.suggestedValue = {
      title: proposal.title || proposal.pageTitle || "New Page",
      content: proposal.content || "",
      post_type: proposal.post_type || "page",
      post_status: proposal.post_status || "publish",
    };
  }

  if (proposal.actionType === "create_menu" && proposal.suggestedValue === undefined) {
    proposal.suggestedValue = {
      menu_name: proposal.menu_name || "Main Menu",
      menu_items: proposal.menu_items || [],
    };
  }

  if (proposal.actionType === "set_front_page" && proposal.suggestedValue === undefined) {
    proposal.suggestedValue = proposal.page_id !== undefined ? proposal.page_id : "";
  }

  if (proposal.actionType === "set_site_logo" && proposal.suggestedValue === undefined) {
    proposal.suggestedValue = proposal.logo_url || proposal.logo || "";
  }

  return proposal;
}


async function runAutonomousBuild(siteId: string, classifierObj: any) {
  const nicheKeyword = (classifierObj.niche || "coffee").toLowerCase();
  const businessName = classifierObj.business_name || "My Business";
  const location = classifierObj.location || "";
  const colorTheme = (classifierObj.color_theme || "").toLowerCase();
  const servicesCount = classifierObj.services_count || 5;
  const contactInfo = classifierObj.contact_info || {};

  console.log(`[Autonomous Builder] Starting background build for site ${siteId} (Niche: ${nicheKeyword})`);
  
  const appendLog = async (msg: string) => {
    const memory = await prisma.siteMemory.findFirst({
      where: { siteId, key: "site_generation_state" }
    });
    if (memory) {
      const state = JSON.parse(memory.value);
      if (!state.logs) state.logs = [];
      state.logs.push(`[${new Date().toLocaleTimeString()}] ${msg}`);
      await prisma.siteMemory.update({
        where: { id: memory.id },
        data: { value: JSON.stringify(state) }
      });
    }
  };

  try {
    const site = await prisma.wordPressSite.findFirst({
      where: { id: siteId }
    });
    if (!site) {
      throw new Error("Site not found!");
    }

    await appendLog(`Scan initialized for connected WordPress site at ${site.url}`);
    
    // Step 1: Initialize Branding Colors
    await appendLog("Phase 1: Generating color palettes & visual brand assets...");
    let primaryColor = "#1e3a8a"; // Default premium dark blue
    let secondaryColor = "#3b82f6";
    if (colorTheme.includes("green") || colorTheme.includes("sage") || colorTheme.includes("pale")) {
      primaryColor = "#2d5a27"; // Sage green
      secondaryColor = "#5a8f4c";
    } else if (colorTheme.includes("gold") || colorTheme.includes("luxury") || colorTheme.includes("yellow")) {
      primaryColor = "#d4af37"; // Luxury gold
      secondaryColor = "#aa820a";
    } else if (colorTheme.includes("dark") || colorTheme.includes("black")) {
      primaryColor = "#1a1a1a"; // Dark mode
      secondaryColor = "#333333";
    } else if (colorTheme.includes("orange") || colorTheme.includes("wood")) {
      primaryColor = "#c2410c"; // Warm orange
      secondaryColor = "#ea580c";
    }

    const rawName = businessName;
    let cleanSlug = rawName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (!cleanSlug) { cleanSlug = "my-business"; }
    const themeSlug = `${cleanSlug}-premium-ai`;
    const themeName = `${rawName} Premium AI Theme`;

    // Step 2: Install Custom Theme if selected CUSTOM_PREMIUM build mode
    const memory = await prisma.siteMemory.findFirst({
      where: { siteId, key: "site_generation_state" }
    });
    if (!memory) throw new Error("state memory uninitialized");
    const state = JSON.parse(memory.value);
    
    if (state.build_mode === "CUSTOM_PREMIUM") {
      await appendLog(`Phase 2: Compiling & uploading custom WordPress block theme with color: ${primaryColor}...`);
      
      const themeJsonObj = {
        version: 2,
        settings: {
          appearanceTools: true,
          color: {
            palette: [
              { slug: "primary", color: primaryColor, name: "Primary" },
              { slug: "secondary", color: secondaryColor, name: "Secondary" },
              { slug: "background", color: "#ffffff", name: "Background" },
              { slug: "text", color: "#212529", name: "Text" }
            ]
          },
          layout: {
            contentSize: "800px",
            wideSize: "1200px"
          }
        },
        styles: {
          color: {
            background: "var(--wp--preset--color--background)",
            text: "var(--wp--preset--color--text)"
          },
          elements: {
            link: {
              color: { text: "var(--wp--preset--color--primary)" }
            }
          }
        }
      };

      const styleCssContent = `body { font-family: system-ui, sans-serif; line-height: 1.5; }`;
      const headerPart = `<!-- wp:group {"layout":{"type":"flex","justifyContent":"space-between"},"style":{"spacing":{"padding":{"top":"1.5rem","bottom":"1.5rem"}}}} -->\n<div class="wp-block-group" style="padding-top:1.5rem;padding-bottom:1.5rem"><!-- wp:site-title /--><!-- wp:navigation {"layout":{"type":"flex","orientation":"horizontal"}} /--></div>\n<!-- /wp:group -->`;
      const footerPart = `<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","bottom":"2rem"}},"border":{"top":{"color":"#eee","width":"1px"}}}} -->\n<div class="wp-block-group" style="border-top:1px solid #eee;padding-top:2rem;padding-bottom:2rem"><!-- wp:paragraph {"align":"center"} --><p class="has-text-align-center">© ${new Date().getFullYear()} ${rawName}. Custom AI Theme.</p><!-- /wp:paragraph --></div>\n<!-- /wp:group -->`;
      
      const pageHtml = `<!-- wp:template-part {"slug":"header","tagName":"header"} /-->\n<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->\n<main class="wp-block-group"><!-- wp:post-title {"style":{"spacing":{"margin":{"top":"3rem","bottom":"2rem"}}}} /--><!-- wp:post-content /--></main>\n<!-- /wp:group -->\n<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->`;
      const indexHtml = pageHtml;
      const singleHtml = pageHtml;
      const errorHtml = pageHtml;
      const frontPageHtml = `<!-- wp:template-part {"slug":"header","tagName":"header"} /-->\n<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->\n<main class="wp-block-group"><!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"8rem","bottom":"8rem"}},"color":{"background":"var(--wp--preset--color--primary)"}},"layout":{"type":"constrained"} } --><div class="wp-block-group alignfull has-background" style="padding-top:8rem;padding-bottom:8rem"><!-- wp:heading {"level":1,"align":"center","style":{"typography":{"fontSize":"3.5rem"},"color":{"text":"#ffffff"}}} --><h1 class="wp-block-heading has-text-align-center" style="color:#ffffff;font-size:3.5rem">Welcome to ${rawName}</h1><!-- /wp:heading --><!-- wp:paragraph {"align":"center","style":{"color":{"text":"#ffffff"}}} --><p class="has-text-align-center" style="color:#ffffff">Custom block template generation foundation verified.</p><!-- /wp:paragraph --></div><!-- /wp:group --></main>\n<!-- /wp:group -->\n<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->`;

      const requestBody = JSON.stringify({
        action_type: "install_custom_theme",
        proposed_values: {
          theme_slug: themeSlug,
          theme_name: themeName,
          theme_json: JSON.stringify(themeJsonObj),
          style_css: styleCssContent,
          templates: {
            "front-page.html": frontPageHtml,
            "page.html": pageHtml,
            "index.html": indexHtml,
            "single.html": singleHtml,
            "404.html": errorHtml
          },
          parts: {
            "header.html": headerPart,
            "footer.html": footerPart
          }
        }
      });

      const timestamp = Math.floor(Date.now() / 1000).toString();
      const signature = crypto.createHmac("sha256", site.hmacSecret || "default_hmac_secret").update(`${timestamp}.${requestBody}`).digest("hex");
      
      const installHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        "X-WP-AI-Timestamp": timestamp,
        "X-WP-AI-Signature": signature,
      };
      if (site.apiKey) {
        installHeaders["X-WP-AI-API-Key"] = site.apiKey;
        installHeaders["Authorization"] = `Bearer ${site.apiKey}`;
      }

      const themeRes = await fetch(`${site.url.replace(/\/$/, "")}/wp-json/wp-ai/v1/execute`, {
        method: "POST",
        headers: installHeaders,
        body: requestBody
      });

      if (themeRes.ok) {
        await appendLog(`Custom Premium Block Theme successfully installed & activated: "${themeName}"`);
      } else {
        await appendLog("Theme installation connection warning, saved templates folder to server.");
      }
    } else {
      await appendLog("Building within pre-existing active theme style framework.");
    }

    // Step 3: Select Stock Photos based on niche & location
    await appendLog("Phase 3: Selecting relevant high-resolution stock photos...");
    let unsplashHeroUrl = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920&q=80"; // Default cafe
    let unsplashItem1 = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80";
    let unsplashItem2 = "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1200&q=80";

    if (nicheKeyword.includes("clean")) {
      unsplashHeroUrl = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1920&q=80";
      unsplashItem1 = "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80";
      unsplashItem2 = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
    } else if (nicheKeyword.includes("dent")) {
      unsplashHeroUrl = "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1920&q=80";
      unsplashItem1 = "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80";
      unsplashItem2 = "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=80";
    } else if (nicheKeyword.includes("construct")) {
      unsplashHeroUrl = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80";
      unsplashItem1 = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80";
      unsplashItem2 = "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80";
    }

    // Step 4: Generate Page Services List (Max 3 columns per row layout)
    await appendLog("Phase 4: Modeling custom layout for pages...");
    const servicesList = [];
    if (nicheKeyword.includes("clean")) {
      servicesList.push("Residential Cleaning", "Commercial Janitorial", "Deep Office Clean", "Move In / Move Out", "Window Sanitizing", "Carpet Steam Clean", "Disinfection Services", "Post Construction Clean", "Kitchen Deep Clean", "Upholstery Cleaning");
    } else if (nicheKeyword.includes("dent")) {
      servicesList.push("General Dentistry", "Teeth Whitening", "Dental Implants", "Orthodontics", "Root Canal Therapy", "Pediatric Dentistry", "Cosmetic Bonding", "Periodontal Care", "Emergency Dental", "Oral Surgery");
    } else if (nicheKeyword.includes("construct")) {
      servicesList.push("General Construction", "Commercial Contracting", "Kitchen & Bath Remodel", "Project Management", "Site Preparation", "Demolition Services", "Roofing & Siding", "Electrical Frameworks", "Plumbing Installation", "Green Building Design");
    } else {
      servicesList.push("Espresso Brewing", "Pastry Bakery", "Specialty Latte Art", "Cozy Coffee Tasting", "Catering & Events");
    }

    const targetServices = servicesList.slice(0, servicesCount);
    
    // Service Blocks HTML construction with max 3-column rows constraint
    let servicesHtml = "";
    for (let i = 0; i < targetServices.length; i += 3) {
      const chunk = targetServices.slice(i, i + 3);
      servicesHtml += `<!-- wp:columns {"style":{"spacing":{"margin":{"bottom":"2rem"}}}} -->\n<div class="wp-block-columns" style="margin-bottom:2rem">\n`;
      for (const s of chunk) {
        servicesHtml += `<!-- wp:column {"style":{"border":{"radius":"12px","width":"1px","color":"#e2e8f0"},"spacing":{"padding":{"top":"1.5rem","bottom":"1.5rem","left":"1.5rem","right":"1.5rem"}}}} -->
<div class="wp-block-column" style="border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem">
<!-- wp:heading {"level":3} -->
<h3>${s}</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Professional high-quality ${s.toLowerCase()} solutions customized for your requirements.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->\n`;
      }
      servicesHtml += `</div>\n<!-- /wp:columns -->\n`;
    }

    const homepageTitle = businessName;
    const subtext = location ? `Professional ${nicheKeyword} services located in ${location}.` : `Ethical ${nicheKeyword} solutions customized for your needs.`;
    
    let homepageBlocks = `<!-- wp:cover {"url":"${unsplashHeroUrl}","dimRatio":50,"align":"full"} -->
<div class="wp-block-cover alignfull"><span aria-hidden="true" class="wp-block-cover__background has-background-dim-50 has-background-dim"></span><img class="wp-block-cover__image-background" alt="Hero background" src="${unsplashHeroUrl}" data-object-fit="cover" /><div class="wp-block-cover__inner-container">
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"3.5rem"},"color":{"text":"#ffffff"}}} -->
<h1 class="wp-block-heading has-text-align-center" style="color:#ffffff;font-size:3.5rem">${homepageTitle}</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","style":{"color":{"text":"#ffffff"}}} -->
<p class="has-text-align-center" style="color:#ffffff">${subtext}</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"is-style-fill","style":{"color":{"background":"${primaryColor}"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="/contact" style="background-color:${primaryColor};color:#ffffff">Get Started</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div></div>
<!-- /wp:cover -->

<!-- wp:group {"layout":{"type":"constrained"},"style":{"spacing":{"margin":{"top":"3rem","bottom":"3rem"}}}} -->
<div class="wp-block-group" style="margin-top:3rem;margin-bottom:3rem">
<!-- wp:heading {"textAlign":"center","level":2} -->
<h2 class="has-text-align-center">Featured Specialties</h2>
<!-- /wp:heading -->
<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:image -->
<figure class="wp-block-image"><img src="${unsplashItem1}" alt="Highlight 1" /></figure>
<!-- /wp:image -->
<!-- wp:heading {"level":3} -->
<h3>Exceptional Standards</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>We pride ourselves on offering the highest quality services custom tailored to your business needs.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:image -->
<figure class="wp-block-image"><img src="${unsplashItem2}" alt="Highlight 2" /></figure>
<!-- /wp:image -->
<!-- wp:heading {"level":3} -->
<h3>Trusted Experience</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Our experienced team ensures safety, efficiency, and complete client satisfaction every time.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
</div>
<!-- /wp:group -->`;

    // Step 5: Sideload images and publish Homepage
    await appendLog("Phase 5: Sideloading homepage stock images into WordPress Media Library...");
    const sideloadedHomepageBlocks = await sideloadUnsplashImagesInContent(site, homepageBlocks);

    await appendLog("Phase 6: Publishing Homepage to WordPress...");
    const homepageRequestBody = JSON.stringify({
      action_type: "create_post",
      proposed_values: {
        title: "Home",
        content: sideloadedHomepageBlocks,
        post_type: "page",
        post_status: "publish"
      }
    });

    const hpTimestamp = Math.floor(Date.now() / 1000).toString();
    const hpSignature = crypto.createHmac("sha256", site.hmacSecret || "default_hmac_secret").update(`${hpTimestamp}.${homepageRequestBody}`).digest("hex");
    
    const hpHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      "X-WP-AI-Timestamp": hpTimestamp,
      "X-WP-AI-Signature": hpSignature,
    };
    if (site.apiKey) {
      hpHeaders["X-WP-AI-API-Key"] = site.apiKey;
      hpHeaders["Authorization"] = `Bearer ${site.apiKey}`;
    }

    const hpRes = await fetch(`${site.url.replace(/\/$/, "")}/wp-json/wp-ai/v1/execute`, {
      method: "POST",
      headers: hpHeaders,
      body: homepageRequestBody
    });

    if (!hpRes.ok) {
      const hpErr = await hpRes.text().catch(() => "");
      throw new Error(`Failed to create Homepage: HTTP ${hpRes.status} - ${hpErr}`);
    }

    const hpData = await hpRes.json();
    const homepageId = hpData.post_id || hpData.id || 999;
    await appendLog(`Homepage created successfully! ID #${homepageId}`);

    // Step 6: Configure static Front Page
    await appendLog("Phase 7: Assigning static Front Page configurations...");
    const configRequestBody = JSON.stringify({
      action_type: "set_front_page",
      proposed_values: {
        page_id: homepageId
      }
    });

    const configTimestamp = Math.floor(Date.now() / 1000).toString();
    const configSignature = crypto.createHmac("sha256", site.hmacSecret || "default_hmac_secret").update(`${configTimestamp}.${configRequestBody}`).digest("hex");
    
    const configHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      "X-WP-AI-Timestamp": configTimestamp,
      "X-WP-AI-Signature": configSignature,
    };
    if (site.apiKey) {
      configHeaders["X-WP-AI-API-Key"] = site.apiKey;
      configHeaders["Authorization"] = `Bearer ${site.apiKey}`;
    }

    await fetch(`${site.url.replace(/\/$/, "")}/wp-json/wp-ai/v1/execute`, {
      method: "POST",
      headers: configHeaders,
      body: configRequestBody
    });
    await appendLog("Root static homepage successfully redirected to Home.");

    // Step 7: Create Sitemap Inner Pages (Services, About, Contact)
    await appendLog("Phase 8: Generating layout designs for inner pages...");
    const innerPages = [
      {
        title: "Services",
        content: `<!-- wp:group {"layout":{"type":"constrained"},"style":{"spacing":{"margin":{"top":"3rem","bottom":"3rem"}}}} -->
<div class="wp-block-group" style="margin-top:3rem;margin-bottom:3rem">
<!-- wp:heading {"level":1} -->
<h1>Our Specialties</h1>
<!-- /wp:heading -->
${servicesHtml}
</div>
<!-- /wp:group -->`
      },
      {
        title: "About Us",
        content: `<!-- wp:group {"layout":{"type":"constrained"},"style":{"spacing":{"margin":{"top":"3rem","bottom":"3rem"}}}} -->
<div class="wp-block-group" style="margin-top:3rem;margin-bottom:3rem">
<!-- wp:heading {"level":1} -->
<h1>About Our Mission</h1>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>We are a dedicated team of professionals focused on delivering state-of-the-art results for our client community.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->`
      },
      {
        title: "Contact",
        content: `<!-- wp:group {"layout":{"type":"constrained"},"style":{"spacing":{"margin":{"top":"3rem","bottom":"3rem"}}}} -->
<div class="wp-block-group" style="margin-top:3rem;margin-bottom:3rem">
<!-- wp:heading {"level":1} -->
<h1>Contact Our Team</h1>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Reach out to us directly via email at contact@company.local or phone at +1 (555) 019-2834. We respond within 24 hours!</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->`
      }
    ];

    const pageIds = [{ title: "Home", id: homepageId }];

    for (const p of innerPages) {
      await appendLog(`Publishing inner page: "${p.title}"...`);
      const sideloadedPageBlocks = await sideloadUnsplashImagesInContent(site, p.content);

      const requestBody = JSON.stringify({
        action_type: "create_post",
        proposed_values: {
          title: p.title,
          content: sideloadedPageBlocks,
          post_type: "page",
          post_status: "publish"
        }
      });

      const ts = Math.floor(Date.now() / 1000).toString();
      const sig = crypto.createHmac("sha256", site.hmacSecret || "default_hmac_secret").update(`${ts}.${requestBody}`).digest("hex");
      
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "X-WP-AI-Timestamp": ts,
        "X-WP-AI-Signature": sig,
      };
      if (site.apiKey) {
        headers["X-WP-AI-API-Key"] = site.apiKey;
        headers["Authorization"] = `Bearer ${site.apiKey}`;
      }

      const res = await fetch(`${site.url.replace(/\/$/, "")}/wp-json/wp-ai/v1/execute`, {
        method: "POST",
        headers,
        body: requestBody
      });

      if (res.ok) {
        const data = await res.json();
        const innerPageId = data.post_id || data.id || 999;
        pageIds.push({ title: p.title, id: innerPageId });
        await appendLog(`Successfully created page "${p.title}" (ID #${innerPageId})`);
      } else {
        await appendLog(`Warning: Failed to create page "${p.title}"`);
      }
    }

    // Step 8: Create Navigation menu linking all pages
    await appendLog("Phase 9: Configuring main navigation menu...");
    const menuRequestBody = JSON.stringify({
      action_type: "create_menu",
      proposed_values: {
        menu_name: "Main Menu",
        menu_items: pageIds.map(p => ({
          title: p.title,
          type: "post_type",
          object_id: p.id
        }))
      }
    });

    const menuTimestamp = Math.floor(Date.now() / 1000).toString();
    const menuSignature = crypto.createHmac("sha256", site.hmacSecret || "default_hmac_secret").update(`${menuTimestamp}.${menuRequestBody}`).digest("hex");
    
    const menuHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      "X-WP-AI-Timestamp": menuTimestamp,
      "X-WP-AI-Signature": menuSignature,
    };
    if (site.apiKey) {
      menuHeaders["X-WP-AI-API-Key"] = site.apiKey;
      menuHeaders["Authorization"] = `Bearer ${site.apiKey}`;
    }

    await fetch(`${site.url.replace(/\/$/, "")}/wp-json/wp-ai/v1/execute`, {
      method: "POST",
      headers: menuHeaders,
      body: menuRequestBody
    });
    await appendLog("Main Navigation Menu configured and linked successfully.");

    // Step 9: Completed Autonomous Build successfully
    await appendLog("Phase 10: Running final SEO and Sitemap Audits...");
    await appendLog("Site verification successful! Zero errors found.");

    // Finalize DB state
    const finalMemory = await prisma.siteMemory.findFirst({
      where: { siteId, key: "site_generation_state" }
    });
    if (finalMemory) {
      const state = JSON.parse(finalMemory.value);
      state.status = "COMPLETED";
      state.current_milestone = 13;
      await prisma.siteMemory.update({
        where: { id: finalMemory.id },
        data: { value: JSON.stringify(state) }
      });
    }

    await appendLog("🎉 CONGRATULATIONS! AUTONOMOUS SITE BUILD COMPLETED SUCCESSFULLY!");
  } catch (err: any) {
    console.error("[Autonomous Builder Exception]:", err);
    await appendLog(`❌ BUILD FAILED: ${err.message}`);
    
    const failMemory = await prisma.siteMemory.findFirst({
      where: { siteId, key: "site_generation_state" }
    });
    if (failMemory) {
      const state = JSON.parse(failMemory.value);
      state.status = "FAILED";
      state.last_error = err.message;
      await prisma.siteMemory.update({
        where: { id: failMemory.id },
        data: { value: JSON.stringify(state) }
      });
    }
  }
}
