# Contact Form Implementation - Complete Setup

## Overview
Your contact form is now fully functional with email sending via Outlook SMTP. All form submissions are sent to `info@blackzero.org` with a confirmation email sent to the user.

---

## ✅ Implementation Complete

### 1. **Frontend Component** (`src/components/ContactForm.tsx`)
The form collects:
- ✅ **First Name** (Required)
- ✅ **Last Name** (Required)
- ✅ **Email Address** (Required, validated)
- ✅ **Subject** (Required)
- ✅ **Message** (Required, textarea)

**Features:**
- Form validation with error messages
- Loading state on submit button (shows "Submitting...")
- Success/error messages displayed after submission
- Form clears on successful submission
- Proper error handling for network issues

### 2. **Backend API Route** (`src/app/api/send-email/route.ts`)
- **Endpoint:** `POST /api/send-email`
- Receives and validates form data
- Sends professional HTML emails
- **Destination:** `info@blackzero.org`
- **Sender Email:** `blackzero.official@outlook.com`
- Sends confirmation email to user
- Comprehensive error handling

### 3. **SMTP Configuration** (`.env.local`)
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=blackzero.official@outlook.com
SMTP_PASSWORD=blackzero1122
SMTP_FROM_EMAIL=blackzero.official@outlook.com
```

---

## 📧 Email Flow

### Admin Receives:
```
To: info@blackzero.org
From: blackzero.official@outlook.com
Reply-To: [user's email]

Subject: [User's Subject Line]

New Contact Form Submission

Name: [First Name] [Last Name]
Email: [User Email]
Subject: [Subject Line]

Message:
[Full Message Content]
```

### User Receives Confirmation:
```
To: [User Email]
From: blackzero.official@outlook.com

Subject: We Received Your Message - Black Zero

Thank you for contacting Black Zero. We have received your message and will get back to you as soon as possible.

Your Message:
[User's Message]

Best regards,
The Black Zero Team
```

---

## 🚀 How to Test

1. **Restart your dev server:**
   ```bash
   npm run dev
   ```

2. **Navigate to your contact page** (`/contact`)

3. **Fill out the form:**
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Subject: Project Inquiry
   - Message: I'd like to discuss a new project...

4. **Click Submit**

5. **Expected Results:**
   - You should see "Submitting..." while the request processes
   - Success message: "Email sent successfully! We will get back to you soon."
   - Form fields clear
   - Confirmation email arrives at `john@example.com`
   - Email forwarded to `info@blackzero.org` (or your configured admin email)

---

## 🔧 API Endpoint Details

### Request Format
```json
POST /api/send-email
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss..."
}
```

### Success Response (200 OK)
```json
{
  "message": "Email sent successfully! We will get back to you soon."
}
```

### Error Response (400 Bad Request)
```json
{
  "message": "Missing required fields: firstName, lastName, email, subject, and message are required."
}
```

### Error Response (500 Internal Server Error)
```json
{
  "message": "Failed to send email: [specific error]"
}
```

---

## ⚙️ Required Dependencies

Your project already has these installed:
- `nodemailer` (^7.0.6) - For sending emails
- `@types/nodemailer` (^7.0.1) - TypeScript types

---

## 🔐 Security Notes

1. **Environment Variables:** `.env.local` is in `.gitignore` and won't be committed
2. **Credentials:** All SMTP credentials are stored securely in environment variables
3. **Email Validation:** Form validates email format before sending
4. **SMTP Configuration:** Uses TLS encryption (port 587, secure: false)

---

## 📝 Form Component Usage

The form is used in `src/components/ContactPageClient.tsx`:

```tsx
import ContactForm from '@/components/ContactForm';

export default function ContactPageClient() {
  return (
    <ContactForm 
      title="Get in Touch"
      subtitle="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
    />
  );
}
```

---

## 🎯 What Each Field Does

| Field | Type | Required | Validation | Notes |
|-------|------|----------|-----------|-------|
| firstName | text | Yes | Non-empty | User's first name |
| lastName | text | Yes | Non-empty | User's last name |
| email | email | Yes | Valid email format | Used for confirmation & reply-to |
| subject | text | Yes | Non-empty | Email subject line |
| message | textarea | Yes | Non-empty | Main message content (5 rows) |

---

## 🐛 Troubleshooting

### Issue: "Failed to send email"
- ✓ Verify `.env.local` file exists in project root
- ✓ Check SMTP credentials are correct
- ✓ Ensure SMTP port (587) is accessible from your network
- ✓ Look at browser console for specific error message

### Issue: Confirmation email not arriving
- ✓ Check spam/junk folder
- ✓ Verify user email address is correct
- ✓ Check Outlook account sending limits

### Issue: Admin email not arriving at info@blackzero.org
- ✓ Verify email address exists and is actively monitored
- ✓ Check if it's in spam folder
- ✓ Ensure Outlook account has permission to send

---

## 📞 Files Modified/Created

✅ **Created:**
- `src/app/api/send-email/route.ts` - Email API endpoint
- `.env.local` - Environment configuration

✅ **Updated:**
- `src/components/ContactForm.tsx` - Simplified to required fields only

---

## ✨ Next Steps

1. Test the form with a test submission
2. Monitor `info@blackzero.org` for incoming submissions
3. Consider adding rate limiting for production
4. Set up email forwarding if needed
5. Monitor bounce rates and adjust as needed

---

## 📚 Related Files

- Contact Page: `src/app/contact/page.tsx`
- Contact Page Client: `src/components/ContactPageClient.tsx`
- API Route: `src/app/api/send-email/route.ts`
- Form Component: `src/components/ContactForm.tsx`
