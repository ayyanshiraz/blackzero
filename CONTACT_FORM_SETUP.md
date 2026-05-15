# Contact Form Email Implementation Guide

## Overview
Your contact form is now fully functional with email sending capabilities using nodemailer. The form collects submissions and sends them to `info@blackzero.org` while also sending a confirmation email to the user.

## What's Been Set Up

### 1. **Frontend Component** (`src/components/ContactForm.tsx`)
- ✅ Full Name (First & Last Name)
- ✅ Email Address
- ✅ Phone Number (Optional)
- ✅ Service Selection (with predefined or custom options)
- ✅ **Subject** (Optional - newly added)
- ✅ Message (Required)
- ✅ Loading state on submit button
- ✅ Success/Error messages
- ✅ Form validation

### 2. **Backend API Route** (`src/app/api/send-email/route.ts`)
- ✅ Receives form data via POST request
- ✅ Validates required fields
- ✅ Sends professional HTML email to `info@blackzero.org`
- ✅ Sends confirmation email to the user
- ✅ Includes proper error handling
- ✅ Uses environment variables for security

### 3. **Email Templates**
The API sends two emails:
1. **Admin Email**: Full submission details to info@blackzero.org
2. **Confirmation Email**: Thank you message to the user with their submission details

## Environment Variables Setup

You need to configure SMTP settings in `.env.local` file. These variables are already created with placeholders.

### **Step 1: Choose Your Email Provider**

#### **Option A: Gmail (Recommended for Testing)**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable "2-Step Verification" if you haven't already
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" and "Windows Computer"
5. Google will generate a 16-character password
6. In `.env.local`, set:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-character-app-password
SMTP_FROM_EMAIL=your-email@gmail.com
```

#### **Option B: Outlook/Office365**
```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-password
SMTP_FROM_EMAIL=your-email@outlook.com
```

#### **Option C: SendGrid (For Production)**
1. Create account at [SendGrid](https://sendgrid.com)
2. Create an API key
3. In `.env.local`, set:
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
SMTP_FROM_EMAIL=noreply@yourdomain.com
```

#### **Option D: Custom SMTP Server**
Contact your hosting provider for:
- SMTP Host
- SMTP Port (usually 587 or 465)
- Username & Password
- Sender email address

### **Step 2: Update `.env.local`**

Edit `.env.local` in your project root with your chosen provider's credentials:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-actual-email@gmail.com
SMTP_PASSWORD=your-actual-app-password
SMTP_FROM_EMAIL=your-actual-email@gmail.com
```

### **Step 3: Test the Connection**

1. Save `.env.local`
2. Restart your dev server: `npm run dev`
3. Go to your contact form page
4. Fill out the form and submit
5. Check your inbox and spam folder for:
   - Confirmation email (to your address)
   - Admin email (to info@blackzero.org - this will fail if that mailbox doesn't exist, which is expected for testing)

## Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `SMTP_HOST` | Email server address | `smtp.gmail.com` |
| `SMTP_PORT` | Connection port (587 or 465) | `587` |
| `SMTP_SECURE` | Use SSL encryption (true for 465, false for 587) | `false` |
| `SMTP_USER` | Email account login | `info@blackzero.org` |
| `SMTP_PASSWORD` | Email account password or app-specific password | `your-password` |
| `SMTP_FROM_EMAIL` | Email address shown as sender | `info@blackzero.org` |

## Security Best Practices

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use App Passwords** - For Gmail, use 16-character app passwords instead of your main password
3. **For Production** - Use environment variables in your hosting platform (Netlify, Vercel, etc.)
   - In Netlify: Go to Site Settings → Build & Deploy → Environment → Edit Variables
   - In Vercel: Go to Settings → Environment Variables
4. **Limit Sending** - Consider adding rate limiting for production
5. **Change Destination** - The form currently sends to `info@blackzero.org`. To change it, edit line in `src/app/api/send-email/route.ts`:
   ```typescript
   to: 'info@blackzero.org',  // Change this email
   ```

## API Response Format

### Success Response (200)
```json
{
  "message": "Email sent successfully! We will get back to you soon."
}
```

### Error Response (400/500)
```json
{
  "message": "Failed to send email: [specific error]"
}
```

## Form Submission Flow

1. User fills out form with validation
2. Frontend sends POST request to `/api/send-email`
3. Backend validates data
4. Backend sends email to admin and confirmation to user
5. Frontend displays success/error message
6. Form clears on success

## Troubleshooting

### Email Not Sending?
- ✓ Check `.env.local` file exists and has correct values
- ✓ Restart dev server after editing `.env.local`
- ✓ For Gmail: Verify you're using an App Password, not your main password
- ✓ Check browser console and terminal for error messages
- ✓ Look in spam folder for confirmation emails

### "Failed to verify SMTP connection" Error
- Your SMTP credentials are incorrect
- The email server is not accessible from your network
- Firewall/network issue blocking the port

### Emails Going to Spam
- Gmail App Passwords emails sometimes get flagged
- Consider using a dedicated email service like SendGrid
- Add SPF/DKIM records for your domain (for production)

## Next Steps for Production

1. **Update the admin email** from `info@blackzero.org` to your actual email
2. **Set up environment variables** in your hosting platform
3. **Consider adding rate limiting** to prevent spam
4. **Add email validation** for corporate addresses
5. **Monitor email delivery** and bounce rates

## Contact Form Fields Reference

The form includes these fields:
- `firstName` - User's first name (required)
- `lastName` - User's last name (required)
- `email` - User's email address (required, validated)
- `phone` - User's phone number (optional)
- `service` - Selected service category (required, dropdown)
- `subject` - Email subject line (optional)
- `message` - Main message content (required, textarea)

All fields are sent to the admin email and relevant fields in the confirmation email to the user.
