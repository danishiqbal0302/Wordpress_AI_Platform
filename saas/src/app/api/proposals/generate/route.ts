import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
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
    const { ruleId, category, title, affectedUrl, pageTitle, entityId, currentValue, siteId } = body;

    const cleanTitle = (pageTitle || "Page").trim();
    const rid = (ruleId || "").toUpperCase();

    let actionType = "update_meta_description";
    let fieldLabel = "Meta Description";
    let suggestedValue = "";

    // 1. Meta Description Rules (SEO_001, SEO_006, SEO_007)
    if (rid.includes("SEO_001") || rid.includes("SEO_006") || rid.includes("SEO_007")) {
      actionType = "update_meta_description";
      fieldLabel = "Meta Description";
      suggestedValue = `Explore ${cleanTitle}. Comprehensive insights, best practices, and expert updates tailored for high search performance.`;
    }
    // 2. SEO Title Rules (SEO_004, SEO_005, SEO_002)
    else if (rid.includes("SEO_004") || rid.includes("SEO_005") || rid.includes("SEO_002")) {
      actionType = "update_meta_title";
      fieldLabel = "SEO Meta Title Tag";
      suggestedValue = `${cleanTitle} | Official Guide & Services`;
    }
    // 3. Focus Keyword (SEO_003)
    else if (rid.includes("SEO_003")) {
      actionType = "update_focus_keyword";
      fieldLabel = "Focus Keyword";
      suggestedValue = cleanTitle.toLowerCase();
    }
    // 4. Media Image Alt Text (MEDIA_001, MEDIA_002)
    else if (rid.includes("MEDIA_001") || rid.includes("MEDIA_002") || (category && category.includes("media"))) {
      actionType = "update_alt_text";
      fieldLabel = "Image Alt Text";
      suggestedValue = `Descriptive photo illustrating ${cleanTitle}`;
    }
    // 5. Thin Content / Body Content (CONTENT_001) & Missing H1 (CONTENT_003) -> Editor Aware!
    else if (rid.includes("CONTENT_001") || rid.includes("CONTENT_003")) {
      actionType = "update_post_content";

      let rawContent = "";
      let editorType = "classic";

      if (siteId && entityId) {
        try {
          const site = await prisma.wordPressSite.findFirst({ where: { id: siteId } });
          if (site && site.url) {
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

            const invRes = await fetch(`${site.url.replace(/\/$/, "")}/wp-json/wp-ai/v1/inventory`, { headers });
            if (invRes.ok) {
              const invData = await invRes.json();
              const allItems = [...(invData.pages || []), ...(invData.posts || [])];
              const match = allItems.find((i: any) => String(i.id) === String(entityId));
              if (match) {
                rawContent = match.raw_content || "";
                editorType = match.editor_type || "classic";
              }
            }
          }
        } catch (err) {
          console.warn("[Proposal Generate Editor-Aware] Fetch notice:", err);
        }
      }

      // Determine editorType smartly if not provided by inventory
      if (editorType === "classic" || !editorType) {
        if (
          rawContent.includes("<!-- wp:") ||
          rawContent.includes("wp-block-") ||
          rawContent.includes("wp-block")
        ) {
          editorType = "gutenberg";
        } else if (
          rawContent.includes("elementor") ||
          rawContent.includes("elementor-widget") ||
          rawContent.includes("elementor-element") ||
          rawContent.includes("_elementor_data") ||
          cleanTitle.toLowerCase().includes("elementor")
        ) {
          editorType = "elementor";
        }
      }

      // Safe bypass for Elementor body content edits
      if (editorType === "elementor") {
        return NextResponse.json(
          {
            error: "Body content Quick Fix for Elementor pages must be updated directly in Elementor Builder to preserve layout integrity.",
            isSupported: false,
          },
          { status: 422 }
        );
      }

      const cleanExisting = rawContent.trim();

      if (rid.includes("CONTENT_003")) {
        fieldLabel = "H1 Heading Element Added";
        if (editorType === "gutenberg") {
          const h1Block = `<!-- wp:heading {"level":1} -->\n<h1 class="wp-block-heading">${cleanTitle}</h1>\n<!-- /wp:heading -->`;
          suggestedValue = cleanExisting
            ? `${h1Block}\n\n${cleanExisting}`
            : `${h1Block}\n\n<!-- wp:paragraph -->\n<p>Welcome to ${cleanTitle}. Article content overview.</p>\n<!-- /wp:paragraph -->`;
        } else {
          const h1Element = `<h1>${cleanTitle}</h1>`;
          suggestedValue = cleanExisting
            ? `${h1Element}\n\n${cleanExisting}`
            : `${h1Element}\n\n<p>Welcome to ${cleanTitle}. Article content overview.</p>`;
        }
      } else {
        // CONTENT_001
        fieldLabel = "Expanded Article Body (300+ Words)";
        const hasH1 = /<h1[\s>]/i.test(cleanExisting) || cleanExisting.includes('<!-- wp:heading {"level":1}');

        if (editorType === "gutenberg") {
          const prefix = hasH1 ? "" : `<!-- wp:heading {"level":1} -->\n<h1 class="wp-block-heading">${cleanTitle}</h1>\n<!-- /wp:heading -->\n\n`;

          const expansionBlocks = `\n\n<!-- wp:heading {"level":2} -->\n<h2 class="wp-block-heading">Core Pillars &amp; Foundational Concepts</h2>\n<!-- /wp:heading -->\n<!-- wp:paragraph -->\n<p>Understanding the foundational elements of ${cleanTitle} is essential for long-term operational success and audience retention. By focusing on quality, consistency, and user experience, you ensure optimal search engine performance, improved accessibility, and sustained user engagement across all digital platforms. First, evaluate primary objectives and align your content publishing workflow with industry standards. Second, implement structured methodologies that streamline content management, optimize resource allocation, and foster seamless cross-channel distribution. Third, maintain active oversight to adapt to evolving user requirements and technical benchmarks.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":2} -->\n<h2 class="wp-block-heading">Execution Framework &amp; Operational Best Practices</h2>\n<!-- /wp:heading -->\n<!-- wp:paragraph -->\n<p>To execute effectively, follow a systematic framework. Start by analyzing key performance metrics and identifying core areas for editorial improvement. Develop targeted content solutions that address audience intent, eliminate clarity bottlenecks, and enhance overall readability. Continuously measure performance indicators, adjust your editorial strategies based on empirical user feedback, and maintain rigorous quality control standards across all published articles, media assets, and structural layouts. Establishing standardized guidelines guarantees consistent tone, structural hierarchy, and content depth throughout the site.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":2} -->\n<h2 class="wp-block-heading">Strategic Optimization &amp; Long-Term Scalability</h2>\n<!-- /wp:heading -->\n<!-- wp:paragraph -->\n<p>Establishing scalable publishing workflows enables sustained growth, brand authority, and search visibility. Ensure that each content section provides actionable insights, clear headings, and logical paragraph transitions. Periodically review your content inventory to remove obsolete details, refresh statistical evidence, and maintain strict alignment with search engine guidelines and user expectations. Furthermore, integrate structured metadata, robust internal linking, and mobile-responsive layout elements to optimize content delivery across devices.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":2} -->\n<h2 class="wp-block-heading">Quality Control &amp; Editorial Integrity</h2>\n<!-- /wp:heading -->\n<!-- wp:paragraph -->\n<p>Maintaining high editorial standards requires continuous monitoring and automated auditing. Regularly audit page structures, word density metrics, and keyword placements to prevent content degradation over time. By incorporating clear remediation steps and automated validation loops, your editorial team ensures that published content consistently satisfies search engine algorithms while providing maximum value to human readers.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":2} -->\n<h2 class="wp-block-heading">Summary &amp; Key Takeaways</h2>\n<!-- /wp:heading -->\n<!-- wp:paragraph -->\n<p>In conclusion, mastering ${cleanTitle} requires ongoing dedication, strategic planning, and consistent execution. Review your editorial roadmap regularly to maintain high search visibility, foster reader trust, and maximize impact across all publishing channels. By combining high-value analysis with structured design, your organization positions itself for long-term success and domain dominance.</p>\n<!-- /wp:paragraph -->`;

          suggestedValue = cleanExisting
            ? `${prefix}${cleanExisting}${expansionBlocks}`
            : `<!-- wp:heading {"level":1} -->\n<h1 class="wp-block-heading">${cleanTitle}</h1>\n<!-- /wp:heading -->\n<!-- wp:paragraph -->\n<p>Welcome to ${cleanTitle}. In this comprehensive guide, we cover key strategies, operational standards, and best practices to help you achieve your goals effectively and drive engagement.</p>\n<!-- /wp:paragraph -->${expansionBlocks}`;
        } else {
          // Classic
          const prefix = hasH1 ? "" : `<h1>${cleanTitle}</h1>\n\n`;
          const expansionHtml = `\n\n<h2>Core Pillars &amp; Foundational Concepts</h2>\n<p>Understanding the foundational elements of ${cleanTitle} is essential for long-term operational success and audience retention. By focusing on quality, consistency, and user experience, you ensure optimal search engine performance, improved accessibility, and sustained user engagement across all digital platforms. First, evaluate primary objectives and align your content publishing workflow with industry standards. Second, implement structured methodologies that streamline content management, optimize resource allocation, and foster seamless cross-channel distribution. Third, maintain active oversight to adapt to evolving user requirements and technical benchmarks.</p>\n\n<h2>Execution Framework &amp; Operational Best Practices</h2>\n<p>To execute effectively, follow a systematic framework. Start by analyzing key performance metrics and identifying core areas for editorial improvement. Develop targeted content solutions that address audience intent, eliminate clarity bottlenecks, and enhance overall readability. Continuously measure performance indicators, adjust your editorial strategies based on empirical user feedback, and maintain rigorous quality control standards across all published articles, media assets, and structural layouts. Establishing standardized guidelines guarantees consistent tone, structural hierarchy, and content depth throughout the site.</p>\n\n<h2>Strategic Optimization &amp; Long-Term Scalability</h2>\n<p>Establishing scalable publishing workflows enables sustained growth, brand authority, and search visibility. Ensure that each content section provides actionable insights, clear headings, and logical paragraph transitions. Periodically review your content inventory to remove obsolete details, refresh statistical evidence, and maintain strict alignment with search engine guidelines and user expectations. Furthermore, integrate structured metadata, robust internal linking, and mobile-responsive layout elements to optimize content delivery across devices.</p>\n\n<h2>Quality Control &amp; Editorial Integrity</h2>\n<p>Maintaining high editorial standards requires continuous monitoring and automated auditing. Regularly audit page structures, word density metrics, and keyword placements to prevent content degradation over time. By incorporating clear remediation steps and automated validation loops, your editorial team ensures that published content consistently satisfies search engine algorithms while providing maximum value to human readers.</p>\n\n<h2>Summary &amp; Key Takeaways</h2>\n<p>In conclusion, mastering ${cleanTitle} requires ongoing dedication, strategic planning, and consistent execution. Review your editorial roadmap regularly to maintain high search visibility, foster reader trust, and maximize impact across all publishing channels. By combining high-value analysis with structured design, your organization positions itself for long-term success and domain dominance.</p>`;

          suggestedValue = cleanExisting
            ? `${prefix}${cleanExisting}${expansionHtml}`
            : `<h1>${cleanTitle}</h1>\n<p>Welcome to ${cleanTitle}. In this comprehensive guide, we cover key strategies, operational standards, and best practices to help you achieve your goals effectively and drive engagement.</p>${expansionHtml}`;
        }
      }
    }
    // 6. Other Body / Content Rules (CONTENT_002, etc.)
    else if (category && category.includes("content")) {
      actionType = "update_post_content";
      fieldLabel = "Updated Article Content";
      suggestedValue = `Welcome to ${cleanTitle}. Operational guidelines and content optimization.`;
    }
    // 6. Post / Page Title (CONTENT_006, CONTENT_007, CONTENT_009)
    else if (rid.includes("CONTENT_006") || rid.includes("CONTENT_007") || rid.includes("CONTENT_009")) {
      actionType = "update_post_title";
      fieldLabel = "Post / Page Title";
      suggestedValue = `${cleanTitle}`;
    }
    // Fallback
    else {
      actionType = "update_meta_description";
      fieldLabel = "Meta Description";
      suggestedValue = `Discover ${cleanTitle}. Professional guidelines, optimized details, and expert resources.`;
    }

    return NextResponse.json({
      success: true,
      proposalDraft: {
        ruleId: rid || "SEO_001",
        category: category || "SEO Metadata",
        title: title || "Remediation Proposal",
        affectedUrl: affectedUrl || "/",
        pageTitle: cleanTitle,
        entityId: entityId || 1,
        actionType,
        fieldLabel,
        currentValue: currentValue || "",
        suggestedValue,
      },
    });
  } catch (error) {
    console.error("Generate Proposal Error:", error);
    return NextResponse.json({ error: "Failed to generate remediation draft." }, { status: 500 });
  }
}
