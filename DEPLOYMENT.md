# Deployment Guide: GitHub Pages + GoDaddy Domain

## Overview

This guide covers deploying sosofamily.ca using:
- **GitHub Pages** for hosting (free)
- **GoDaddy** for domain management
- **GitHub Actions** for automatic deployment

---

## Step 1: Enable GitHub Pages

1. Go to your repository: https://github.com/daiyongg-kim/sosofamily
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Build and deployment**:
   - Source: **GitHub Actions**
4. Click **Save**

---

## Step 2: Configure GoDaddy DNS

Log in to GoDaddy and update DNS settings for sosofamily.ca:

### A Records (Required)
Add these 4 A records pointing to GitHub's servers:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |

### CNAME Record (For www subdomain)
| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | daiyongg-kim.github.io | 600 |

### How to Add DNS Records in GoDaddy:
1. Log in to GoDaddy → **My Products**
2. Find **sosofamily.ca** → Click **DNS**
3. Click **Add** to add each record
4. Delete any existing A records for @ that conflict

---

## Step 3: Verify Custom Domain in GitHub

1. Go to repository **Settings** → **Pages**
2. Under **Custom domain**, enter: `sosofamily.ca`
3. Click **Save**
4. Wait for DNS check (can take up to 24 hours)
5. Check **Enforce HTTPS** once verified

---

## Step 4: Verify Deployment

After pushing to main branch:
1. Go to **Actions** tab in GitHub
2. Check the workflow run completes successfully
3. Visit https://sosofamily.ca

---

## Troubleshooting

### DNS Not Propagating
- Use https://dnschecker.org to verify DNS records
- DNS changes can take 24-48 hours to propagate globally

### Certificate Error
- Wait for GitHub to provision SSL certificate (can take up to 24 hours)
- Ensure "Enforce HTTPS" is checked in Pages settings

### 404 Error
- Check that `index.html` exists in repository root
- Verify GitHub Actions workflow completed successfully

---

## File Structure

```
sosofamily/
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions workflow
├── CNAME                  # Custom domain config
├── index.html             # Main page
├── styles/
│   └── main.css
├── scripts/
│   └── main.js
└── assets/
    └── icons/
        └── favicon.svg
```

---

## Automatic Deployment

Every push to `main` branch triggers automatic deployment:
1. GitHub Actions workflow runs
2. Files are uploaded to GitHub Pages
3. Site updates within 1-2 minutes

---

## DNS Records Summary

```
sosofamily.ca DNS Configuration:

A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   daiyongg-kim.github.io
```
