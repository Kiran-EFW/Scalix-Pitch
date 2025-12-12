# Firebase Deployment Troubleshooting

## Current Issue: npx Failed

**Error:** `The process '/opt/hostedtoolcache/node/18.20.8/x64/bin/npx' failed with exit code 1`

## Fix Applied

✅ **Installed firebase-tools via npm** before the Firebase deployment action
- The Firebase action uses `npx` internally, which requires firebase-tools to be available
- Installing via npm ensures compatibility with the action's npx usage

## Additional Checks

### 1. Verify Service Account Secret

The deployment requires the secret: `FIREBASE_SERVICE_ACCOUNT_SCALIX_PITCH_DECK`

**To check/add:**
1. Go to: https://github.com/Kiran-EFW/Scalix-Pitch/settings/secrets/actions
2. Verify the secret exists
3. If missing:
   - Get service account key from: https://console.firebase.google.com/project/scalix-pitch-deck/settings/serviceaccounts/adminsdk
   - Add as secret: `FIREBASE_SERVICE_ACCOUNT_SCALIX_PITCH_DECK`
   - Value: Entire JSON content

### 2. Check Firebase Project ID

Verify the project ID matches:
- Workflow uses: `scalix-pitch-deck`
- Check: `firebase projects:list` should show this as current

### 3. Verify Firebase CLI Access

Test locally:
```bash
firebase projects:list
firebase deploy --only hosting --dry-run
```

## Workflow Steps (Current)

1. ✅ Checkout code
2. ✅ Setup pnpm v9
3. ✅ Setup Node.js v18
4. ✅ Install dependencies (pnpm)
5. ✅ Build project
6. ✅ Copy static files
7. ✅ Install firebase-tools (npm) - **NEW FIX**
8. ⏳ Deploy to Firebase

## If Still Failing

### Check the Error Details

1. Go to GitHub Actions: https://github.com/Kiran-EFW/Scalix-Pitch/actions
2. Click on the failed workflow run
3. Expand the "Deploy to Firebase" step
4. Look for specific error messages

### Common Issues

1. **Missing Secret:**
   - Error mentions authentication or service account
   - Solution: Add `FIREBASE_SERVICE_ACCOUNT_SCALIX_PITCH_DECK` secret

2. **Permission Issues:**
   - Error mentions permissions or access denied
   - Solution: Verify service account has Hosting Admin role

3. **Project ID Mismatch:**
   - Error mentions project not found
   - Solution: Verify project ID in workflow matches Firebase project

4. **Build Issues:**
   - Error in build step
   - Solution: Check build logs for specific errors

## Next Steps

After pushing the fix:
1. Push the commit
2. Watch GitHub Actions
3. Check if firebase-tools installation succeeds
4. Verify deployment completes

If it still fails, check the specific error message in the GitHub Actions logs.

