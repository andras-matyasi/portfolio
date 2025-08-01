# Deploy Portfolio to GitHub Pages with Custom Domain

## Overview
This guide will help you migrate your portfolio from Replit to GitHub Pages with your custom domain, providing free hosting.

## Step 1: Create GitHub Repository
1. Go to [github.com](https://github.com) and create a new repository
2. Name it something like `portfolio` or `your-name-portfolio`
3. Make it public (required for free GitHub Pages)
4. Don't initialize with README, .gitignore, or license

## Step 2: Push Your Code to GitHub

### Option A: Using Replit Git Integration
1. In your Replit workspace, add the Git tool (click '+' in Tools section)
2. Initialize Git or connect to your GitHub repository
3. Set remote origin: `git remote add origin https://github.com/yourusername/your-repo.git`
4. Stage all files, commit, and push

### Option B: Manual Upload
1. Download all files as ZIP from Replit
2. Extract locally and use GitHub Desktop or command line
3. Push to your new repository

## Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click Settings → Pages (in left sidebar)
3. Source: "GitHub Actions" (recommended) or "Deploy from branch"
4. If using branch: select "main" branch and "/ (root)" folder

## Step 4: Configure Your Custom Domain

### A. DNS Configuration (at your domain registrar)
Add these DNS records:

**For apex domain (yoursite.com):**
```
Type: A, Name: @, Value: 185.199.108.153
Type: A, Name: @, Value: 185.199.109.153  
Type: A, Name: @, Value: 185.199.110.153
Type: A, Name: @, Value: 185.199.111.153
```

**For www subdomain:**
```
Type: CNAME, Name: www, Value: yourusername.github.io
```

### B. GitHub Pages Domain Configuration
1. Repository Settings → Pages
2. Custom domain: Enter `andras.matyasi.me`
3. Enable "Enforce HTTPS"
4. Wait for DNS check to pass (can take up to 24 hours)

## Step 5: Update CNAME File
1. Edit `client/public/CNAME` file
2. Replace `yourdomain.com` with your actual domain
3. Commit and push changes

## Step 6: Automatic Deployment
The GitHub Action workflow is already configured and will:
- Automatically build your portfolio when you push changes
- Deploy to GitHub Pages
- Handle the static site generation

## Troubleshooting

### DNS Propagation
- DNS changes can take 5 minutes to 48 hours
- Use [whatsmydns.net](https://whatsmydns.net) to check propagation
- Try accessing both `yourdomain.com` and `www.yourdomain.com`

### Build Issues
- Check GitHub Actions tab in your repository for build logs
- Ensure all dependencies are in package.json
- Verify the build creates files in `dist/public` directory

### HTTPS Certificate
- GitHub automatically provides SSL certificates
- May take 10-15 minutes after DNS is configured
- Certificate renews automatically

## What's Included
- ✅ Automatic GitHub Actions deployment
- ✅ Custom domain support with HTTPS
- ✅ Optimized static build
- ✅ Free hosting (no Replit subscription needed)

## Post-Migration
After successful setup:
1. Test your domain works: `https://yourdomain.com`
2. Verify HTTPS is working
3. Check that all pages and assets load correctly
4. You can now cancel your Replit subscription

## Cost Comparison
- **Before:** Replit subscription ($10-20/month)
- **After:** GitHub Pages (FREE) + Domain registration (~$10-15/year)

Your hosting costs will drop from monthly to just the annual domain fee!