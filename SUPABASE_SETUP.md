# Supabase Backend Setup

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in project details:
   - **Name**: aslam-portfolio (or your preferred name)
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to you
5. Click "Create new project" and wait for it to initialize (takes ~2 minutes)

## Step 2: Create the Database Table

1. In your Supabase dashboard, click on **SQL Editor** in the left sidebar
2. Click **New Query**
3. Copy and paste the entire contents of `supabase-schema.sql` file
4. Click **Run** to execute the SQL

This will create:
- The `projects` table with all necessary fields
- Indexes for better performance
- Row Level Security policies (allows public read, all operations for now)
- An auto-update trigger for `updated_at` field

## Step 3: Get Your API Keys

1. In Supabase dashboard, go to **Settings** (gear icon in left sidebar)
2. Click **API** in the settings menu
3. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

## Step 4: Configure Your .env.local File

1. Open `/Users/macbook/aslam-portfolio/.env.local`
2. Replace the placeholders with your actual values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

3. Save the file
4. Restart your dev server (Ctrl+C and run `npm run dev` again)

## Step 5: Seed Initial Data (Optional)

You have two options:

### Option A: Use the CMS (Recommended)
1. Go to `http://localhost:3000/admin`
2. Click "Add New Project"
3. Fill in the form with the demo project data
4. Repeat for all 3 projects (Flow, Bloom, Spark)

### Option B: Use Supabase Dashboard
1. In Supabase, go to **Table Editor**
2. Select the `projects` table
3. Click **Insert** → **Insert row**
4. Manually enter project data

## Step 6: Verify It's Working

1. Visit `http://localhost:3000`
2. You should see your projects in the gallery
3. If the database is empty, you'll see the 3 default fallback projects
4. Once you add projects via CMS, they will be stored in Supabase

## Testing the CMS

1. Go to `/admin` - see all projects
2. Go to `/admin/projects/new` - create a new project
3. Click Edit on any project - update existing project
4. Click Delete - remove a project

## Security Note

The current RLS policy allows all operations for testing. For production:

1. Go to Supabase → **Authentication** → **Policies**
2. Update the policies to restrict create/update/delete to authenticated users only
3. Set up authentication in your app

## Troubleshooting

**"Error fetching projects"**
- Check that your API keys in `.env.local` are correct
- Verify the table was created successfully in Supabase
- Check browser console for detailed error messages

**"Projects showing as fallback data"**
- This is normal if the database is empty
- Add projects via CMS to persist to Supabase

**"Failed to create/update project"**
- Check RLS policies in Supabase
- Verify your API key has proper permissions
