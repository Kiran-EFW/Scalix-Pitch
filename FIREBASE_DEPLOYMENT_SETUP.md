# Firebase Automatic Deployment Setup Guide

## Overview
This guide will help you set up automatic Firebase deployments using GitHub Actions.

## Prerequisites
- Firebase project: `scalix-pitch-deck`
- GitHub repository connected to your project
- Firebase CLI installed locally

## Step 1: Get Firebase Service Account Key

### Option A: Using Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/project/scalix-pitch-deck/settings/serviceaccounts/adminsdk)
2. Click "Generate new private key"
3. Download the JSON file (keep it secure!)

### Option B: Using Firebase CLI
```bash
# Login to Firebase
firebase login:ci

# This will give you a token, but for GitHub Actions, you need the service account JSON
```

## Step 2: Add Service Account to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to: **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `FIREBASE_SERVICE_ACCOUNT`
5. Value: Paste the entire contents of the service account JSON file
6. Click **Add secret**

## Step 3: Verify Workflow File

The workflow file `.github/workflows/firebase-deploy.yml` is already created and will:
- Trigger on push to `main` or `master` branch
- Build your project
- Copy slides and assets
- Deploy to Firebase Hosting

## Step 4: Test the Deployment

1. Commit and push the workflow file:
```bash
git add .github/workflows/firebase-deploy.yml
git commit -m "Add Firebase deployment workflow"
git push origin main
```

2. Check GitHub Actions tab to see the deployment progress

## Manual Deployment (Alternative)

If you prefer manual deployments, you can still use:
```bash
npm run build
firebase deploy --only hosting
```

## Troubleshooting

### If deployment fails:
1. Check GitHub Actions logs
2. Verify `FIREBASE_SERVICE_ACCOUNT` secret is set correctly
3. Ensure Firebase project ID matches: `scalix-pitch-deck`
4. Check that all required files are in the repository

### To update the workflow:
Edit `.github/workflows/firebase-deploy.yml` and push changes.

