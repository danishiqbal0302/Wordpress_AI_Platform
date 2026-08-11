# Deploying WordPress AI Platform SaaS to Vercel

This guide outlines the exact steps to deploy the Next.js SaaS application to **Vercel** with Supabase PostgreSQL integration.

---

## 1. Important Fix for "No Output Directory named public found"

If Vercel gave the error `No Output Directory named "public" found`:

1. **Root Directory must NOT have a dot**:
   - In **Vercel -> Project Settings -> General -> Root Directory**, enter:
     `saas`
     *(Do NOT type `.saas` with a dot. Type `saas` exact).*

2. **Framework Preset must be set to `Next.js`**:
   - In **Vercel -> Project Settings -> General -> Framework Preset**, select **`Next.js`** from the dropdown.
   - Leave **Output Directory** BLANK (do not type anything in Output Directory). Vercel will automatically handle `.next`.

---

## 2. Vercel Deployment Checklist

| Setting | Value |
|---|---|
| **Framework Preset** | `Next.js` |
| **Root Directory** | `saas` *(no leading dot)* |
| **Build Command** | `npm run build` |
| **Output Directory** | Leave Blank / Default |

---

## 3. Environment Variables to Set in Vercel

Go to **Vercel -> Your Project -> Settings -> Environment Variables** and add the following 4 variables:

```env
# 1. Supabase PostgreSQL Connection URL
DATABASE_URL="postgresql://postgres:J4HckHnClULr9mCy@db.cewfpkhzkudzmoxconzm.supabase.co:5432/postgres?schema=public"

# 2. JWT & Authentication Secrets
NEXTAUTH_SECRET="wp-ai-platform-super-secret-jwt-key-2026-production-grade"
JWT_SECRET="wp-ai-platform-super-secret-jwt-key-2026-production-grade"

# 3. Public Application Domain
NEXT_PUBLIC_APP_URL="https://your-project-name.vercel.app"
```

---

## 4. Redeploy Steps

1. Commit and push your changes (including the new `saas/vercel.json` file):
   ```bash
   git add .
   git commit -m "Fix: Add vercel.json for Next.js framework preset"
   git push origin main
   ```
2. Go to **Vercel -> Deployments** -> Click **Redeploy**.
