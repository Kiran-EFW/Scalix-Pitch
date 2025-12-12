# Firebase Service Account Permissions Setup

## Current Error
`Error: Failed to get Firebase project scalix-pitch-deck. Please make sure the project exists and your account has permission to access it.`

## Problem
The service account is authenticating successfully, but it doesn't have permission to access the Firebase project.

## Solution: Grant Service Account Permissions

### Step 1: Get Service Account Email

The service account email is in the JSON file you downloaded. It looks like:
```
"client_email": "firebase-adminsdk-xxxxx@scalix-pitch-deck.iam.gserviceaccount.com"
```

### Step 2: Add Service Account to Firebase Project

1. Go to Firebase Console: https://console.firebase.google.com/project/scalix-pitch-deck/settings/iam
2. Click **"Add member"**
3. Paste the service account email (from the JSON file)
4. Select role: **"Firebase Admin"** or **"Editor"**
   - **Firebase Admin** - Full access to Firebase services
   - **Editor** - Can deploy and manage resources
5. Click **"Add"**

### Step 3: Verify Permissions

The service account needs these permissions:
- ✅ Firebase Hosting Admin (or Firebase Admin)
- ✅ Can access the project
- ✅ Can deploy to hosting

### Alternative: Use Firebase CLI to Grant Permissions

If you have access to the Firebase CLI locally:

```bash
# Login with your account
firebase login

# Grant the service account access
# Replace EMAIL with the service account email from the JSON
gcloud projects add-iam-policy-binding scalix-pitch-deck \
  --member="serviceAccount:EMAIL@scalix-pitch-deck.iam.gserviceaccount.com" \
  --role="roles/firebase.admin"
```

## Verify Service Account Setup

### Check Service Account Email

1. Open the service account JSON file
2. Find the `client_email` field
3. Copy that email address

### Check Project Access

1. Go to: https://console.firebase.google.com/project/scalix-pitch-deck/settings/iam
2. Search for the service account email
3. Verify it's listed with appropriate role

## Common Issues

### Issue 1: Service Account Not Added to Project
**Symptom:** "Failed to get Firebase project"
**Solution:** Add service account to Firebase project IAM (see Step 2 above)

### Issue 2: Wrong Project ID
**Symptom:** "Project not found"
**Solution:** Verify project ID matches in:
- Service account JSON (`project_id` field)
- Workflow file (`--project scalix-pitch-deck`)
- Firebase Console

### Issue 3: Insufficient Permissions
**Symptom:** "Permission denied"
**Solution:** Grant "Firebase Admin" or "Editor" role

## Required Roles

For deployment, the service account needs:
- **Firebase Admin** (recommended) OR
- **Editor** role on the project

## After Granting Permissions

1. Wait 1-2 minutes for permissions to propagate
2. Re-run the failed workflow (or push a new commit)
3. Deployment should now succeed

## Quick Checklist

- [ ] Service account JSON downloaded
- [ ] Service account added to GitHub Secrets as `FIREBASE_SERVICE_ACCOUNT_SCALIX_PITCH_DECK`
- [ ] Service account email copied from JSON
- [ ] Service account added to Firebase project IAM
- [ ] Service account has "Firebase Admin" or "Editor" role
- [ ] Project ID matches: `scalix-pitch-deck`

---

**Once permissions are granted, the deployment should work!** 🚀

