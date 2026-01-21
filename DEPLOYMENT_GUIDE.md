# CastUp Deployment Guide

This guide will walk you through deploying the CastUp application online using Vercel (frontend) and Render (backend).

## Prerequisites

- GitHub account (you already have this ✅)
- Code pushed to GitHub repository (castup-ai/castup) ✅
- Neon PostgreSQL database (already set up) ✅

## Part 1: Deploy Backend to Render

### Step 1: Create Render Account

1. Go to [https://render.com](https://render.com)
2. Click **"Get Started for Free"**
3. Sign up with your **GitHub account** (recommended for easy integration)

### Step 2: Deploy Backend

1. Once logged in, click **"New +"** → **"Web Service"**
2. Click **"Connect GitHub"** and authorize Render
3. Select your repository: **castup-ai/castup**
4. Configure the service:
   - **Name**: `castup-backend`
   - **Region**: Choose closest to you (e.g., Oregon/US East)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Click **"Advanced"** and add environment variables:

```
NODE_ENV=production
DATABASE_URL=postgresql://neondb_owner:npg_Xlw3vBdDN7aC@ep-gentle-morning-ahkaeuza-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=castup-secret-key-2026
JWT_REFRESH_SECRET=castup-refresh-secret-key-2026
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d
GOOGLE_CLIENT_ID=(leave empty for now)
GOOGLE_CLIENT_SECRET=(leave empty for now)
GOOGLE_CALLBACK_URL=(will update after deployment)
FACEBOOK_APP_ID=(leave empty for now)
FACEBOOK_APP_SECRET=(leave empty for now)
FACEBOOK_CALLBACK_URL=(will update after deployment)
CLOUDINARY_CLOUD_NAME=(your value)
CLOUDINARY_API_KEY=(your value)
CLOUDINARY_API_SECRET=(your value)
CLIENT_URL=(will update after frontend deployment)
PORT=5000
```

6. Click **"Create Web Service"**

### Step 3: Wait for Deployment

Render will:
- Clone your repository
- Install dependencies
- Start your server
- Provide you with a URL like: `https://castup-backend.onrender.com`

**Note**: First deployment may take 3-5 minutes.

### Step 4: Verify Backend

Once deployed, test the health endpoint:
- Visit: `https://castup-backend.onrender.com/api/health`
- You should see: `{"status":"OK","message":"CastUp API is running"}`

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Account

1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Sign up with your **GitHub account**

### Step 2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Import your repository: **castup-ai/castup**
3. Configure the project:
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)

### Step 3: Add Environment Variables

Click **"Environment Variables"** and add:

```
VITE_API_URL=https://castup-backend.onrender.com/api
```

(Replace with your actual Render backend URL)

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. Vercel will provide you with a URL like: `https://castup-xyz.vercel.app`

---

## Part 3: Update Backend Configuration

Now that you have both URLs, update the backend:

1. Go back to **Render Dashboard**
2. Open your **castup-backend** service
3. Go to **"Environment"** tab
4. Update `CLIENT_URL` to your Vercel URL: `https://castup-xyz.vercel.app`
5. Click **"Save Changes"**

Your service will automatically redeploy with the new configuration.

---

## Part 4: Test Your Deployed Application

1. Open your Vercel URL: `https://castup-xyz.vercel.app`
2. Try to **Sign Up** with a new account
3. Test **Login**
4. Check if you can create a portfolio
5. Try uploading a file

If everything works, congratulations! 🎉 Your CastUp application is now live!

---

## Troubleshooting

### Backend Issues

**Check Render Logs:**
1. Go to Render Dashboard → castup-backend
2. Click "Logs" tab
3. Look for errors

**Common Issues:**
- Database connection: Verify `DATABASE_URL` is correct
- CORS errors: Verify `CLIENT_URL` matches your Vercel domain

### Frontend Issues

**Check Vercel Deployment Logs:**
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on latest deployment → View Build Logs

**Common Issues:**
- API connection: Verify `VITE_API_URL` points to your Render backend
- Build errors: Check if all dependencies are in `package.json`

---

## Free Tier Limitations

**Render Free Tier:**
- Service spins down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- 750 hours/month (sufficient for personal use)

**Vercel Free Tier:**
- 100GB bandwidth/month
- Serverless function execution: 100 hours/month
- Perfect for most use cases

---

## Next Steps After Deployment

1. **Set up custom domain** (optional)
2. **Configure OAuth** for Google/Facebook login
3. **Set up Cloudinary** for file uploads
4. **Monitor application** via Render and Vercel dashboards

---

## Quick Reference

**Backend URL**: https://castup-backend.onrender.com  
**Frontend URL**: https://castup-xyz.vercel.app  
**Database**: Neon PostgreSQL ✅  
**GitHub Repo**: https://github.com/castup-ai/castup ✅
