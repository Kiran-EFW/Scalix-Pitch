# Firebase Service Account Secret Setup

## Current Error
`Error: Failed to authenticate, have you run firebase login?`

## Required Secret

**Name:** `FIREBASE_SERVICE_ACCOUNT_SCALIX_PITCH_DECK`

**Location:** GitHub → Settings → Secrets and variables → Actions

## How to Get the Service Account JSON

### Step 1: Get Service Account Key
1. Go to Firebase Console: https://console.firebase.google.com/project/scalix-pitch-deck/settings/serviceaccounts/adminsdk
2. Click **"Generate new private key"**
3. Click **"Generate key"** in the confirmation dialog
4. A JSON file will download

### Step 2: Add to GitHub Secrets
1. Go to: https://github.com/Kiran-EFW/Scalix-Pitch/settings/secrets/actions
2. Click **"New repository secret"**
3. **Name:** `FIREBASE_SERVICE_ACCOUNT_SCALIX_PITCH_DECK` (exact match, case-sensitive)
4. **Value:** Open the downloaded JSON file and copy the **ENTIRE** contents
   - Should start with `{`
   - Should end with `}`
   - Should contain fields like: `type`, `project_id`, `private_key`, `client_email`, etc.
5. Click **"Add secret"**

## Important Notes

### Secret Format
The secret must contain the **complete JSON** from the service account file:
```json
{
  "type": "service_account",
  "project_id": "scalix-pitch-deck",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "...",
  ...
}
```

### Common Mistakes
1. ❌ Only copying part of the JSON
2. ❌ Adding extra quotes or escaping
3. ❌ Wrong secret name (must match exactly)
4. ❌ Using a different project's service account

### Verify Secret is Set
1. Go to: https://github.com/Kiran-EFW/Scalix-Pitch/settings/secrets/actions
2. You should see `FIREBASE_SERVICE_ACCOUNT_SCALIX_PITCH_DECK` in the list
3. If you see it, it's set (you can't view the value, only update/delete)

## After Adding the Secret

1. Push a new commit (or re-run the failed workflow)
2. The workflow should now authenticate successfully
3. Deployment should complete

## Troubleshooting

### If authentication still fails:

1. **Verify secret name:**
   - Must be exactly: `FIREBASE_SERVICE_ACCOUNT_SCALIX_PITCH_DECK`
   - Check for typos or extra spaces

2. **Verify JSON format:**
   - Open the service account JSON file
   - Ensure it's valid JSON (can test with JSON validator)
   - Copy the entire file content

3. **Check service account permissions:**
   - Service account needs "Firebase Hosting Admin" role
   - Or "Editor" role on the project

4. **Regenerate service account:**
   - Delete old one
   - Generate new key
   - Add to GitHub secrets again

## Workflow Usage

The workflow now:
1. Writes the secret JSON to a file
2. Sets `GOOGLE_APPLICATION_CREDENTIALS` environment variable
3. Uses Firebase CLI to authenticate and deploy
4. Cleans up the file after deployment

---

**Once the secret is properly set, the deployment should work!** 🚀

