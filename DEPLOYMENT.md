# Deploy to Vercel

## Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to** [vercel.com](https://vercel.com)
2. **Sign in** with your GitHub account
3. **Click** "Add New Project"
4. **Import** `aslam-portfolio` repository
5. **Configure Project:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
6. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add these two variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://ampovegjevdjlsjgkxgn.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtcG92ZWdqZXZkamxzamdreGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMjY1ODYsImV4cCI6MjA3NDgwMjU4Nn0.h-HOuO9nK7AbzP0KZinh5psdn1BgMI6JZuCcVz5aflw
     ```
7. **Click** "Deploy"

Vercel will automatically deploy your site and give you a URL like `https://aslam-portfolio.vercel.app`

---

## Option 2: Deploy via CLI

1. **Login to Vercel:**
   ```bash
   vercel login
   ```

2. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

3. **Follow prompts:**
   - Link to existing project or create new one
   - Confirm settings
   - Deployment will start automatically

4. **Add Environment Variables** (if not done via dashboard):
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL production
   # Paste: https://ampovegjevdjlsjgkxgn.supabase.co

   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
   # Paste your Supabase anon key
   ```

5. **Redeploy after adding env vars:**
   ```bash
   vercel --prod
   ```

---

## Post-Deployment Checklist

### 1. Verify Deployment
- ✅ Site loads at Vercel URL
- ✅ Gallery shows project images
- ✅ Projects page works
- ✅ Individual project pages load
- ✅ Admin panel accessible at `/admin`

### 2. Test Supabase Connection
- ✅ Projects load from database
- ✅ Can create new project via CMS
- ✅ Can edit existing projects
- ✅ Can delete projects

### 3. Configure Custom Domain (Optional)
1. Go to Vercel dashboard → Your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### 4. Set up Supabase RLS (Security)
Currently, RLS allows all operations. For production:

1. Go to Supabase → Authentication → Policies
2. Update policies to restrict create/update/delete to authenticated users:

```sql
-- Remove the permissive policy
DROP POLICY "Allow all operations" ON projects;

-- Keep read access public
-- (Already exists: "Allow public read access")

-- Add authenticated-only policies
CREATE POLICY "Allow authenticated create" ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete" ON projects
  FOR DELETE
  TO authenticated
  USING (true);
```

3. Set up authentication in your app (optional for now)

---

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure environment variables are set

### Projects Not Loading
- Verify environment variables are set in Vercel
- Check Supabase URL and key are correct
- View browser console for errors

### Images Not Showing
- Images with spaces in filenames should be URL-encoded (already done)
- Verify images exist in `/public` folder
- Check browser network tab for 404s

### Admin Panel Not Working
- Verify Supabase policies allow operations
- Check browser console for errors
- Ensure RLS policies are correct

---

## Automatic Deployments

Vercel automatically deploys when you push to GitHub:
- **Push to `main`** → Production deployment
- **Push to other branches** → Preview deployment
- Each PR gets its own preview URL

---

## Useful Commands

```bash
# View deployment status
vercel ls

# View deployment logs
vercel logs

# View environment variables
vercel env ls

# Pull environment variables locally
vercel env pull

# Remove a deployment
vercel rm <deployment-url>
```

---

## Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Supabase + Vercel:** https://supabase.com/docs/guides/hosting/vercel
