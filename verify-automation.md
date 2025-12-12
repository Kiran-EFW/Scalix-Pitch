# Verify Firebase Automation Status

## Quick Verification Steps

### Step 1: Check GitHub Actions Status
Visit: **https://github.com/Kiran-EFW/Scalix-Pitch/actions**

Look for:
- ✅ Recent workflow runs (should show "Deploy to Firebase Hosting on merge")
- ✅ Green checkmarks = Working
- ❌ Red X marks = Needs attention

### Step 2: Verify Secret is Set
1. Go to: **https://github.com/Kiran-EFW/Scalix-Pitch/settings/secrets/actions**
2. Look for secret: `FIREBASE_SERVICE_ACCOUNT_SCALIX_PITCH_DECK`
3. If missing, you need to add it (see instructions below)

### Step 3: Check Firebase Deploy History
Visit: **https://console.firebase.google.com/project/scalix-pitch-deck/hosting**

Check the "Deploy history" for recent automated deployments.

## How to Add Missing Secret

If the secret `FIREBASE_SERVICE_ACCOUNT_SCALIX_PITCH_DECK` is missing:

1. **Get Service Account Key:**
   - Visit: https://console.firebase.google.com/project/scalix-pitch-deck/settings/serviceaccounts/adminsdk
   - Click "Generate new private key"
   - Download the JSON file

2. **Add to GitHub:**
   - Go to: https://github.com/Kiran-EFW/Scalix-Pitch/settings/secrets/actions
   - Click "New repository secret"
   - Name: `FIREBASE_SERVICE_ACCOUNT_SCALIX_PITCH_DECK`
   - Value: Paste entire JSON content
   - Click "Add secret"

## Test Automation

To test if automation is working, make a small change and push:

```bash
# Add a test comment to verify deployment
echo "<!-- Automation test -->" >> public/slides-updated/slide-13.html
git add public/slides-updated/slide-13.html
git commit -m "Test automation deployment"
git push origin main
```

Then check:
1. GitHub Actions tab - should show a new workflow run
2. Wait 2-3 minutes for deployment
3. Check Firebase Hosting - should show new deployment

## Current Workflow Configuration

**Active Workflow:** `firebase-hosting-merge.yml`
- Triggers on: Push to `main` branch
- Builds: `npm run build`
- Copies: All files from `public/` to `dist/`
- Deploys: To Firebase Hosting live channel

## Troubleshooting

### If automation is not working:

1. **Check Secret Name:**
   - Must be exactly: `FIREBASE_SERVICE_ACCOUNT_SCALIX_PITCH_DECK`
   - Case-sensitive!

2. **Check Workflow Permissions:**
   - Go to: Settings → Actions → General
   - Ensure "Workflow permissions" allows read/write

3. **Check Recent Errors:**
   - Go to: Actions tab
   - Click on failed runs to see error messages
   - Common issues:
     - Missing secret
     - Build errors
     - Permission issues

4. **Verify Firebase Project:**
   ```bash
   firebase projects:list
   # Should show scalix-pitch-deck as current
   ```

## Expected Behavior

When you push to `main`:
1. GitHub Actions triggers automatically
2. Builds your project (~1-2 minutes)
3. Copies static files
4. Deploys to Firebase Hosting (~30 seconds)
5. Your site updates at: https://scalix-pitch-deck.web.app

