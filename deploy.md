# 🚀 Q Group Website — Deployment, Custom Domain & SEO Master Guide

This guide provides step-by-step instructions for connecting a custom domain, deploying updates, and maximizing Google & Yandex search engine rankings and indexing for **Q Group Armenia**.

---

## 📋 Table of Contents
1. [Connecting a Custom Domain to Firebase Hosting](#1-connecting-a-custom-domain-to-firebase-hosting)
2. [Google Search Console & Fast Indexing](#2-google-search-console--fast-indexing)
3. [Yandex Webmaster Setup](#3-yandex-webmaster-setup)
4. [Local Armenian SEO (Google Maps & Yandex Business)](#4-local-armenian-seo-google-maps--yandex-business)
5. [Standard Build & Deployment Commands](#5-standard-build--deployment-commands)
6. [Security & Maintenance Checklist](#6-security--maintenance-checklist)

---

## 1. Connecting a Custom Domain to Firebase Hosting

When you receive your domain registrar credentials (e.g. from `reg.am`, `namecheap.com`, `godaddy.com`, or `hoster.am`):

### Step 1: Add Custom Domain in Firebase Console
1. Open the [Firebase Hosting Console](https://console.firebase.google.com/project/q-group-armenia/hosting/sites).
2. Click **"Add custom domain"**.
3. Enter your domain name (e.g., `q-group.am` or `qgroup.am`).
4. Select the option to also connect `www.q-group.am` with automated redirection.

### Step 2: Configure DNS Records in Domain Registrar
Log into your domain provider panel (DNS Management / Zone Editor) and add the records provided by Firebase:

| Record Type | Host / Name | Target / IP Value | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` (or root) | `199.36.158.100` | Auto / 3600 | Directs traffic to Firebase CDN |
| **A** | `@` (or root) | `199.36.158.100` | Auto / 3600 | Secondary Firebase IP |
| **CNAME** | `www` | `q-group.am.` | Auto / 3600 | Routes `www` traffic to apex |
| **TXT** | `@` | *(Firebase verification code)* | Auto / 3600 | Proves domain ownership |

### Step 3: Automated SSL Certificate (HTTPS)
Firebase will automatically provision a **Free SSL Certificate** within 1 to 2 hours of DNS propagation. Your site will automatically enforce secure HTTPS connections.

---

## 2. Google Search Console & Fast Indexing

### Step 1: Add Property
1. Go to [Google Search Console](https://search.google.com/search-console).
2. Click **"Add Property"** and select **Domain** (e.g., `q-group.am`).
3. Verify ownership via the TXT record added to your DNS panel.

### Step 2: Submit Sitemap
1. In the left navigation, click **Sitemaps**.
2. Enter: `sitemap.xml` (Full URL: `https://q-group.am/sitemap.xml`).
3. Click **Submit**.

### Step 3: Request Priority Indexing (Fast-Track)
1. Paste your homepage URL (`https://q-group.am/`) into the top **"Inspect URL"** search bar.
2. Once inspected, click **"Request Indexing"**.
3. Google’s crawler will schedule prioritized indexing within 24–48 hours.

---

## 3. Yandex Webmaster Setup

Yandex is heavily used in Armenia and across the CIS region:

1. Open [Yandex Webmaster](https://webmaster.yandex.ru/).
2. Click **"+" (Add Site)** and enter `https://q-group.am`.
3. Verify ownership using DNS TXT or Meta Tag.
4. **Submit Sitemap**: Go to **Indexing ➔ Sitemap files** and enter `https://q-group.am/sitemap.xml`.
5. **Re-crawl Request**: Go to **Indexing ➔ Re-crawl pages** to request priority crawling of the homepage and services sections.

---

## 4. Local Armenian SEO (Google Maps & Yandex Business)

For B2B IT outsourcing and emergency technical support in Armenia, map listings appear at the very top of search results:

### Google Business Profile
1. Go to [Google Business Profile](https://business.google.com/).
2. Register: **Q Group LLC — IT Support & Managed Services**.
3. Category: *Computer Support and Services / IT Services*.
4. Address: *Arshakunyats 2, Yerevan, Armenia*.
5. Phone: *8123* | Website: *https://q-group.am*.

### Yandex Business (Яндекс Бизнес)
1. Go to [Yandex Business](https://yandex.ru/sprav).
2. Link the verified Yandex Maps location: [Yandex Maps Location Link](https://yandex.com/maps/-/CTHZrF08).

---

## 5. Standard Build & Deployment Commands

Whenever you make code updates, run the following three commands in order:

### 1. Build Production Static Bundle
```bash
npm run build
```

### 2. Deploy to Firebase Hosting
```bash
npx -y firebase-tools@latest deploy --only hosting
```

### 3. Push to GitHub Repository
```bash
git add .
git commit -m "feat: description of changes made"
git push origin main
```

---

## 6. Security & Maintenance Checklist

- ✅ **Zero Secrets in Git**: No personal passwords, API keys, or `.env*` files are ever committed (`.gitignore` enforced).
- ✅ **Form Endpoint Obfuscation**: Form targets are decoded dynamically at runtime to prevent spam harvesting.
- ✅ **Enterprise HTTP Security Headers**: HSTS, CSP, X-Frame-Options, and X-Content-Type-Options active in `firebase.json`.
- ✅ **Clean Sitemap & Robots**: [`public/sitemap.xml`](public/sitemap.xml) and [`public/robots.txt`](public/robots.txt) configured with valid canonical paths.

---

*Production URL:* [https://q-group-armenia.web.app](https://q-group-armenia.web.app)  
*Repository:* [https://github.com/valerimirzoyan/qgroup-website](https://github.com/valerimirzoyan/qgroup-website)
