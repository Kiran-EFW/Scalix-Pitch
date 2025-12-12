# Fix Service Account Project Access

## Problem Identified

**Error:** `Invalid project selection, please verify project scalix-pitch-deck exists and you have access.`

**Root Cause:** 
The service account in GitHub Secrets only has access to `scalix-world-prod`, but we need access to `scalix-pitch-deck`.

## Solution: Generate New Service Account for Correct Project

### Step 1: Generate Service Account for scalix-pitch-deck

1. Go to Firebase Console: 
   **https://console.firebase.google.com/project/scalix-pitch-deck/settings/serviceaccounts/adminsdk**

2. Click **"Generate new private key"**

3. Click **"Generate key"** in the confirmation dialog

4. A JSON file will download - **this is the correct service account for scalix-pitch-deck**

### Step 2: Update GitHub Secret

1. Go to GitHub: 
   **https://github.com/Kiran-EFW/Scalix-Pitch/settings/secrets/actions**

2. Find the secret: `FIREBASE_SERVICE_ACCOUNT_SCALIX_PITCH_DECK`

3. Click **"Update"** (or delete and recreate if update isn't available)

4. **Value:** Open the NEW JSON file you just downloaded
   - Copy the **ENTIRE** contents
   - Should have `"project_id": "scalix-pitch-deck"` in it
   - Should have `"client_email": "...@scalix-pitch-deck.iam.gserviceaccount.com"`

5. Click **"Update secret"**

### Step 3: Verify Service Account Email

The service account email should be:
```
firebase-adminsdk-xxxxx@scalix-pitch-deck.iam.gserviceaccount.com
```

**NOT:**
```
...@scalix-world-prod.iam.gserviceaccount.com
```

### Step 4: Grant Permissions (if needed)

1. Go to Firebase IAM: 
   **https://console.firebase.google.com/project/scalix-pitch-deck/settings/iam**

2. Find the service account email (from the JSON file)

3. If not listed, click **"Add member"** and add it with **"Firebase Admin"** role

## Quick Verification

### Check Service Account Project ID

Open the JSON file and verify:
```json
{
  "project_id": "scalix-pitch-deck",  // ✅ Should be scalix-pitch-deck
  "client_email": "...@scalix-pitch-deck.iam.gserviceaccount.com"  // ✅ Should end with scalix-pitch-deck
}
```

### Check GitHub Secret

1. Go to: https://github.com/Kiran-EFW/Scalix-Pitch/settings/secrets/actions
2. Verify `FIREBASE_SERVICE_ACCOUNT_SCALIX_PITCH_DECK` exists
3. (You can't view the value, but you can verify it's there)

## After Updating

1. Wait 1-2 minutes for changes to propagate
2. Re-run the failed workflow (or push a new commit)
3. The service account should now have access to `scalix-pitch-deck`
4. Deployment should succeed

## Common Mistake

❌ **Using service account from wrong project:**
- Service account from `scalix-world-prod` won't work
- Must use service account from `scalix-pitch-deck`

✅ **Correct approach:**
- Generate service account from `scalix-pitch-deck` project
- Use that JSON in GitHub Secrets

---

**Once you update the secret with the correct service account, automation will work!** 🚀

