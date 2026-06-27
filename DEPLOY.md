# Deployment Guide — Bluesky Study Abroad
## From your computer → GitHub → Vercel → blueskystudyabroad.com

---

## STEP 1: Set up Supabase Database (5 minutes)

1. Go to https://supabase.com and sign in
2. Click **New Project** → name it `blueskystudyabroad` → choose a region closest to India
3. Once the project is ready, click **SQL Editor** in the left sidebar
4. Click **New Query**, paste the entire contents of `supabase/schema.sql`, and click **Run**
5. Go to **Project Settings → API**
6. Copy your **Project URL** and **anon/public key** — you'll need these in Step 3

---

## STEP 2: Create a GitHub Repository (5 minutes)

1. Go to https://github.com and sign in
2. Click **New Repository** (top-right green button)
3. Name it `blueskystudyabroad` → set to **Private** → click **Create Repository**
4. On the next screen, click **uploading an existing file**
5. Drag and drop the entire `blueskystudyabroad` folder contents into the upload area
6. Scroll down, click **Commit changes**

---

## STEP 3: Deploy on Vercel (5 minutes)

1. Go to https://vercel.com and sign in with your GitHub account
2. Click **Add New → Project**
3. Find `blueskystudyabroad` in the list → click **Import**
4. Before clicking Deploy, click **Environment Variables** and add:
   - Key: `NEXT_PUBLIC_SUPABASE_URL` → Value: (your Supabase Project URL from Step 1)
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Value: (your anon key from Step 1)
5. Click **Deploy** — Vercel will build and deploy automatically (takes ~2 minutes)
6. You'll get a URL like `blueskystudyabroad.vercel.app` — this is your live site

---

## STEP 4: Connect blueskystudyabroad.com (10 minutes)

### In Vercel:
1. Go to your project → **Settings → Domains**
2. Type `blueskystudyabroad.com` → click **Add**
3. Vercel will show you two DNS records to add (an A record and CNAME)

### In GoDaddy:
1. Log in to GoDaddy → go to your domain `blueskystudyabroad.com`
2. Click **DNS** (or Manage DNS)
3. Find the existing **A record** for `@` → click Edit → replace the IP with the one Vercel gave you
4. Add a **CNAME record**: Name = `www`, Value = `cname.vercel-dns.com`
5. Save — DNS changes take 10 minutes to 2 hours to go live

---

## STEP 5: Verify Everything Works

1. Open https://blueskystudyabroad.com — you should see the homepage
2. Click **Search Courses** — you should see the 5 sample universities from the schema
3. Submit the contact form — check your Supabase **Table Editor → leads** to confirm it saved

---

## After Launch: The Loop

Every time you want to improve the site:
1. Edit the files in the `blueskystudyabroad` folder
2. Upload the changed files to GitHub (same way as Step 2)
3. Vercel auto-deploys within 1-2 minutes — no manual action needed

---

## Add More Courses

Go to **Supabase → Table Editor → universities** and click **Insert Row** to add universities.
Then go to **programmes** → **Insert Row** to add their courses.
The site updates instantly — no code changes needed.
