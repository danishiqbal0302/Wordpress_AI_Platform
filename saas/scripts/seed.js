const { PrismaClient } = require("../src/generated/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@agency.com";
  const rawPassword = "adminPassword123!";

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(rawPassword, salt);

  // Seed Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: "Admin Agency Owner",
      passwordHash: passwordHash,
      role: "ADMIN",
      agencyName: "Apex Digital Agency",
    },
    create: {
      email: adminEmail,
      name: "Admin Agency Owner",
      passwordHash: passwordHash,
      role: "ADMIN",
      agencyName: "Apex Digital Agency",
    },
  });

  console.log("Admin User Seeded:", adminUser.email);

  // Seed Default WordPress Sites for Admin
  const site1 = await prisma.wordPressSite.upsert({
    where: { id: "site-1" },
    update: {
      name: "Apex Plumbing & Heating",
      url: "https://apexplumbing.com",
      adminEmail: "admin@apexplumbing.com",
      connectionState: "connected_healthy",
      themeName: "Astra Pro",
      acfVersion: "6.3.1 (Basic Fields Enabled)",
      seoProvider: {
        name: "Yoast SEO",
        version: "22.6",
        adapterSupportLevel: "verified",
        lastTestedDate: "2026-07-25",
      },
      health: {
        connectorInstalled: true,
        connectorVersion: "1.4.2",
        wordpressVersion: "6.5.3",
        phpVersion: "8.2.14",
        restAvailable: true,
        httpsStatus: true,
        authMethods: ["application_passwords", "jwt_bearer"],
        authHeaderStatus: true,
        appPasswordStatus: true,
        multisiteStatus: false,
        firewallDetected: null,
        filesystemWriteMethod: "direct",
        requiredCapabilitiesPass: true,
        checks: [
          { id: "c1", name: "REST API Endpoint", status: "pass", message: "Available at /wp-json/" },
          { id: "c2", name: "Authorization Header", status: "pass", message: "Header preserved by server" },
          { id: "c3", name: "Service User Capabilities", status: "pass", message: "edit_posts, edit_pages, upload_files active" },
          { id: "c4", name: "Application Passwords", status: "pass", message: "Native App Passwords enabled" },
          { id: "c5", name: "Firewall Diagnostics", status: "pass", message: "No request blocking detected" },
        ],
      },
    },
    create: {
      id: "site-1",
      userId: adminUser.id,
      name: "Apex Plumbing & Heating",
      url: "https://apexplumbing.com",
      adminEmail: "admin@apexplumbing.com",
      connectionState: "connected_healthy",
      themeName: "Astra Pro",
      acfVersion: "6.3.1 (Basic Fields Enabled)",
      seoProvider: {
        name: "Yoast SEO",
        version: "22.6",
        adapterSupportLevel: "verified",
        lastTestedDate: "2026-07-25",
      },
      health: {
        connectorInstalled: true,
        connectorVersion: "1.4.2",
        wordpressVersion: "6.5.3",
        phpVersion: "8.2.14",
        restAvailable: true,
        httpsStatus: true,
        authMethods: ["application_passwords", "jwt_bearer"],
        authHeaderStatus: true,
        appPasswordStatus: true,
        multisiteStatus: false,
        firewallDetected: null,
        filesystemWriteMethod: "direct",
        requiredCapabilitiesPass: true,
        checks: [
          { id: "c1", name: "REST API Endpoint", status: "pass", message: "Available at /wp-json/" },
          { id: "c2", name: "Authorization Header", status: "pass", message: "Header preserved by server" },
          { id: "c3", name: "Service User Capabilities", status: "pass", message: "edit_posts, edit_pages, upload_files active" },
          { id: "c4", name: "Application Passwords", status: "pass", message: "Native App Passwords enabled" },
          { id: "c5", name: "Firewall Diagnostics", status: "pass", message: "No request blocking detected" },
        ],
      },
    },
  });

  const site2 = await prisma.wordPressSite.upsert({
    where: { id: "site-2" },
    update: {
      name: "Horizon Law Firm",
      url: "https://horizonlaw.co",
      adminEmail: "contact@horizonlaw.co",
      connectionState: "connected_warnings",
      themeName: "GeneratePress Premium",
      seoProvider: {
        name: "Rank Math",
        version: "1.0.218",
        adapterSupportLevel: "compatible",
        lastTestedDate: "2026-07-20",
      },
      health: {
        connectorInstalled: true,
        connectorVersion: "1.4.0",
        wordpressVersion: "6.4.2",
        phpVersion: "8.1.10",
        restAvailable: true,
        httpsStatus: true,
        authMethods: ["application_passwords"],
        authHeaderStatus: true,
        appPasswordStatus: true,
        multisiteStatus: false,
        firewallDetected: "Wordfence Security",
        filesystemWriteMethod: "direct",
        requiredCapabilitiesPass: true,
        checks: [
          { id: "c1", name: "REST API Endpoint", status: "pass", message: "Available at /wp-json/" },
          { id: "c2", name: "Authorization Header", status: "pass", message: "Header preserved by server" },
          { id: "c3", name: "Security Plugin Alert", status: "warn", message: "Wordfence detected in learning mode. May throttle bulk operations." },
        ],
      },
    },
    create: {
      id: "site-2",
      userId: adminUser.id,
      name: "Horizon Law Firm",
      url: "https://horizonlaw.co",
      adminEmail: "contact@horizonlaw.co",
      connectionState: "connected_warnings",
      themeName: "GeneratePress Premium",
      seoProvider: {
        name: "Rank Math",
        version: "1.0.218",
        adapterSupportLevel: "compatible",
        lastTestedDate: "2026-07-20",
      },
      health: {
        connectorInstalled: true,
        connectorVersion: "1.4.0",
        wordpressVersion: "6.4.2",
        phpVersion: "8.1.10",
        restAvailable: true,
        httpsStatus: true,
        authMethods: ["application_passwords"],
        authHeaderStatus: true,
        appPasswordStatus: true,
        multisiteStatus: false,
        firewallDetected: "Wordfence Security",
        filesystemWriteMethod: "direct",
        requiredCapabilitiesPass: true,
        checks: [
          { id: "c1", name: "REST API Endpoint", status: "pass", message: "Available at /wp-json/" },
          { id: "c2", name: "Authorization Header", status: "pass", message: "Header preserved by server" },
          { id: "c3", name: "Security Plugin Alert", status: "warn", message: "Wordfence detected in learning mode. May throttle bulk operations." },
        ],
      },
    },
  });

  // Seed Proposals
  await prisma.actionProposal.upsert({
    where: { id: "prop-101" },
    update: {
      siteId: site1.id,
      userId: adminUser.id,
      targetPageId: 42,
      targetPageTitle: "Emergency Plumbing Services",
      targetPageSlug: "emergency-plumbing",
      actionType: "update_meta_description",
      currentValues: { meta_description: "Old emergency plumbing page description." },
      proposedValues: { meta_description: "Fast 24/7 emergency plumbing in Chicago. Certified technicians available in 45 mins. Zero hidden fees, free estimates!" },
      approvedChecksum: "a7c82f91b490",
      currentChecksum: "a7c82f91b490",
      isStale: false,
      seoProvider: "Yoast SEO 22.6",
      adapterSupportLevel: "verified",
      rollbackConfidence: "full",
      possibleSideEffects: ["sitemap_regenerated_by_yoast", "cache_invalidated", "search_indexing_ping"],
      status: "AWAITING_APPROVAL",
    },
    create: {
      id: "prop-101",
      siteId: site1.id,
      userId: adminUser.id,
      targetPageId: 42,
      targetPageTitle: "Emergency Plumbing Services",
      targetPageSlug: "emergency-plumbing",
      actionType: "update_meta_description",
      currentValues: { meta_description: "Old emergency plumbing page description." },
      proposedValues: { meta_description: "Fast 24/7 emergency plumbing in Chicago. Certified technicians available in 45 mins. Zero hidden fees, free estimates!" },
      approvedChecksum: "a7c82f91b490",
      currentChecksum: "a7c82f91b490",
      isStale: false,
      seoProvider: "Yoast SEO 22.6",
      adapterSupportLevel: "verified",
      rollbackConfidence: "full",
      possibleSideEffects: ["sitemap_regenerated_by_yoast", "cache_invalidated", "search_indexing_ping"],
      status: "AWAITING_APPROVAL",
    },
  });

  // Seed Action Log Items
  await prisma.actionLogItem.upsert({
    where: { id: "act-501" },
    update: {
      siteId: site1.id,
      userId: adminUser.id,
      actionTitle: "Updated Meta Title for 'Commercial Drain Jetting'",
      targetEntity: "Page #108 (/commercial-drain-jetting)",
      executedBy: "Naday (Admin)",
      executionState: "SUCCEEDED",
      verificationStatus: "verified_exact_match",
      rollbackStatus: "available",
      rollbackConfidence: "full",
      checksum: "8f90a2b13c7d",
      snapshotData: {
        previousValues: { title: "Commercial Drain Jetting" },
        appliedValues: { title: "Commercial Hydro Jetting & Sewer Line Cleaning | Apex Plumbing" },
      },
      sideEffects: ["Yoast XML sitemap updated", "Page cache purged"],
    },
    create: {
      id: "act-501",
      siteId: site1.id,
      userId: adminUser.id,
      actionTitle: "Updated Meta Title for 'Commercial Drain Jetting'",
      targetEntity: "Page #108 (/commercial-drain-jetting)",
      executedBy: "Naday (Admin)",
      executionState: "SUCCEEDED",
      verificationStatus: "verified_exact_match",
      rollbackStatus: "available",
      rollbackConfidence: "full",
      checksum: "8f90a2b13c7d",
      snapshotData: {
        previousValues: { title: "Commercial Drain Jetting" },
        appliedValues: { title: "Commercial Hydro Jetting & Sewer Line Cleaning | Apex Plumbing" },
      },
      sideEffects: ["Yoast XML sitemap updated", "Page cache purged"],
    },
  });

  console.log("Full Database Seed Completed Successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
