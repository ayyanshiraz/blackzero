# SendGrid Email Setup Guide

## Overview
Your contact form has been switched from Outlook SMTP to SendGrid. SendGrid is a reliable email delivery service that doesn't have the authentication restrictions that Microsoft enforces.

---

## ✅ What's Been Updated

### **Backend API** (`src/app/api/send-email/route.ts`)
- Switched from `nodemailer` to `@sendgrid/mail` package
- Uses SendGrid API for email delivery
- Form submissions sent to: `blackzero.official@outlook.com` (configurable)
- Sender email: Configurable from verified sender (see setup below)
- Same form fields: fullName, email, subject, message

### **Environment Variables** (`.env.local`)
- Removed SMTP configuration
- Added SendGrid API Key
- Added SendGrid From Email
- Added SendGrid Recipient Email

### **Benefits**
✅ No more Microsoft authentication restrictions
✅ Reliable delivery with automatic retries
✅ No more "SMTP disabled" errors
✅ Better email deliverability
✅ SendGrid free tier: 100 emails/day, unlimited receiving

---

## 🚀 Setup Steps

### Step 1: Create SendGrid Account

1. Go to: https://sendgrid.com
2. Click **Sign Up**
3. Create a free account
4. Verify your email address

### Step 2: Generate API Key

1. Sign in to SendGrid dashboard: https://app.sendgrid.com
2. Go to **Settings** (left sidebar)
3. Click **API Keys**
4. Click **Create API Key** (blue button)
5. **Name:** "Contact Form" (or any name)
6. **Permissions:** Leave as "Full Access"
7. Click **Create & Copy**
8. **Copy the entire key** (it looks like: `SG.abcde...`)

### Step 3: Update `.env.local`

Open `.env.local` and update:

```env
SENDGRID_API_KEY=SG.paste-your-full-api-key-here
SENDGRID_FROM_EMAIL=noreply@blackzero.org
SENDGRID_RECIPIENT_EMAIL=blackzero.official@outlook.com
```

**Replace:**
- `SG.paste-your-full-api-key-here` with your actual API key
- `noreply@blackzero.org` with a verified sender email (see Step 4)

### Step 4: Verify Sender Email (IMPORTANT!)

Before emails will send, you must verify the sender email address in SendGrid.

#### Option A: Verify a Single Email Address (Fastest)

1. In SendGrid dashboard, go to **Settings** > **Sender Authentication**
2. Click **Single Sender Verification** (first option)
3. Click **Create New Sender**
4. Fill in:
   - **From Name:** Black Zero
   - **From Email:** noreply@blackzero.org (or any email you want)
   - **Reply-To Email:** info@blackzero.org (optional)
5. Click **Create**
6. Check the email inbox of the address you entered
7. Click the verification link in the email
8. Done! You can now use that email

#### Option B: Verify Your Domain (Better for Production)

1. In SendGrid dashboard, go to **Settings** > **Sender Authentication**
2. Click **Domain Authentication**
3. Click **Create New Domain**
4. Enter: `blackzero.org`
5. Select **I have administrative access to blackzero.org** (if applicable)
6. Click **Next**
7. Copy the DNS records provided
8. Add these records to your domain's DNS (contact your domain provider)
9. Once DNS propagates (can take 24-48 hours), verification will complete
10. Then use any email at that domain: `noreply@blackzero.org`, `info@blackzero.org`, etc.

### Step 5: Restart Your Dev Server

```bash
npm run dev
```

### Step 6: Test the Contact Form

1. Go to `/contact` on your website
2. Fill out and submit the form
3. Should see: "Email sent successfully! We will get back to you soon."
4. Check your inbox for the confirmation email
5. Check `blackzero.official@outlook.com` for the admin submission

---

## 📧 Email Flow

```
User Submits Form
    ↓
Frontend: /contact page
    ↓
POST /api/send-email (with fullName, email, subject, message)
    ↓
Backend: Validates & calls SendGrid API
    ↓
Email 1: Admin notification → blackzero.official@outlook.com
Email 2: Confirmation → user's email
    ↓
Both emails sent via SendGrid
```

---

## 🔑 Environment Variables

| Variable | Required | Example | Purpose |
|----------|----------|---------|---------|
| `SENDGRID_API_KEY` | ✅ Yes | `SG.abc123...` | Authentication with SendGrid |
| `SENDGRID_FROM_EMAIL` | ✅ Yes | `noreply@blackzero.org` | Sender email (must be verified) |
| `SENDGRID_RECIPIENT_EMAIL` | ✅ Yes | `blackzero.official@outlook.com` | Where form submissions go |

---

## 🆘 Troubleshooting

### Error: "API Key is not set"
- Ensure `SENDGRID_API_KEY` is in `.env.local`
- Restart dev server after adding the key
- Check the key starts with `SG.`

### Error: "From email not verified"
- The `SENDGRID_FROM_EMAIL` must be verified in SendGrid
- Go to Settings > Sender Authentication > Single Sender Verification
- Verify the email and click the link in the confirmation email

### Emails not arriving
- Check SendGrid dashboard for delivery status
- Go to **Mail Activity** or **Logs** to see delivery attempts
- Check spam folders
- Verify sender email is actually verified (check mark should appear)

### Free tier limits
- **Free SendGrid tier:** 100 emails per day
- **Pro tier:** Unlimited (paid)
- Perfect for testing and small projects

---

## 📊 Monitoring Emails

In SendGrid dashboard, you can see:

1. **Mail Activity** - Live delivery status
2. **Logs** - Historical email records
3. **Statistics** - Delivery rates, bounces, opens, clicks

---

## 🔒 Security Notes

1. **API Key:** Keep it secret! Already in `.gitignore`
2. **Never commit** `.env.local` to git
3. **On production servers** (Netlify, Vercel):
   - Set environment variables in platform UI
   - Don't add to repositories
4. **Regenerate API key** if it's ever exposed

---

## 📝 Sender Email Options

### For Testing (Quickest)
```env
SENDGRID_FROM_EMAIL=noreply@blackzero.org
```
- Verify one email via "Single Sender Verification"
- Takes 5 minutes

### For Production (Better Deliverability)
```env
SENDGRID_FROM_EMAIL=noreply@blackzero.org
```
- Set up domain authentication
- Improves email deliverability
- Takes 24-48 hours for DNS

### What NOT to Use
❌ Don't use random emails like `test@test.com`
❌ Don't use @gmail.com emails (unless you have special permission)
❌ Don't use unverified email addresses

---

## 💡 Tips

1. **Use a descriptive from name:** "noreply@blackzero.org" is better than raw email
2. **Include your domain:** Use your actual domain if possible
3. **Monitor deliverability:** Check SendGrid stats regularly
4. **Set up domain verification:** Better long-term deliverability
5. **Use SendGrid webhooks** (advanced): Track bounces, unsubscribes, etc.

---

## Next Steps

1. ✅ Create SendGrid account
2. ✅ Generate API Key
3. ✅ Verify sender email
4. ✅ Update `.env.local`
5. ✅ Restart dev server
6. ✅ Test contact form
7. ✅ Monitor emails in SendGrid dashboard

---

## Files Modified

- ✅ `src/app/api/send-email/route.ts` - Now uses SendGrid
- ✅ `.env.local` - SendGrid configuration

## Package Already Installed

- ✅ `@sendgrid/mail` - SendGrid Mail package (v8.1.6)

Everything is ready to go! Just add your API key and verify a sender email.
