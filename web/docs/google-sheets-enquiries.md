# Enquiries → Google Sheets

Flow: enquiry form → `POST /api/enquiry` (validation, honeypot, rate limit) → Google Apps Script web app → new row in the `Enquiries` sheet.

The browser never sees the Apps Script URL or secret; both live in server env vars.

## Setup (about 10 minutes)

1. **Create the sheet.** In Google Drive, create a spreadsheet (e.g. "WebVitels Enquiries").
2. **Add the script.** In the sheet: **Extensions → Apps Script**. Delete the sample code, paste the contents of
   [`scripts/google-sheets/enquiries.gs`](../scripts/google-sheets/enquiries.gs), and save.
3. **Generate a secret.** Run `openssl rand -hex 32` and copy the output.
4. **Store the secret in Apps Script.** **Project Settings (gear icon) → Script Properties → Add script property**:
   name `WEBHOOK_SECRET`, value = the secret from step 3.
5. **Deploy.** **Deploy → New deployment → Select type: Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone** (required so the server can call it without Google login; the secret protects it)
   - Click **Deploy**, approve the permission prompt (Advanced → Go to project, if Google warns about an unverified app).
   - Copy the **Web app URL** (ends in `/exec`).
6. **Configure the site.** Create `web/.env.local`:
   ```
   GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
   GOOGLE_SHEETS_WEBHOOK_SECRET=<same secret as step 4>
   ```
   Restart `pnpm dev`. In production, add both variables in the host's environment settings
   (Vercel → Project → Settings → Environment Variables, or AWS Secrets Manager / PM2 ecosystem env on EC2).
7. **Test.** Submit the form. A row should appear in the `Enquiries` tab (it is created with headers on the first enquiry).

## Notes

- **Changing the script** requires **Deploy → Manage deployments → Edit → Version: New version**. Saving alone does not update the live URL.
- **Notifications:** in the sheet, **Tools → Notification settings → Edit notifications** to get an email on every new row.
- **Failure handling:** if the webhook is missing or fails, the user still gets WhatsApp/email buttons with the enquiry pre-filled, and the server logs `[enquiry] ...`.
- **Rate limit** is 5 enquiries per IP per 10 minutes, in memory. On serverless hosts it is per instance; use Upstash/Redis if spam becomes an issue.
- **Privacy:** the sheet holds personal data (name, email, phone). Share it only with people who handle enquiries.
