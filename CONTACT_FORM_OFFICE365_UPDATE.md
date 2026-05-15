# Contact Form - Office 365 SMTP Update

## Changes Made

### ✅ Updated SMTP Configuration (`.env.local`)
- **SMTP Host:** Changed from `smtp-mail.outlook.com` to `smtp.office365.com`
- **Port:** Remains `587` (TLS)
- **Secure:** Remains `false`
- **Auth User:** `blackzero.official@outlook.com`
- **Auth Pass:** `blackzero1122`
- **From Email:** `blackzero.official@outlook.com`

### ✅ Updated Backend API (`src/app/api/send-email/route.ts`)
- **Field Change:** Accepts `fullName` instead of separate `firstName` and `lastName`
- **Email Destination:** Changed from `info@blackzero.org` to `blackzero.official@outlook.com`
- **Validation:** Updated to require `fullName`, `email`, `subject`, and `message`
- **Email Templates:** Updated HTML and text templates to use `fullName`
- **Confirmation Email:** Extracts first name from `fullName` for personalized greeting

### ✅ Updated Frontend Component (`src/components/ContactForm.tsx`)
- **Form Fields:** 
  - Changed from: First Name (separate) + Last Name (separate)
  - Changed to: Full Name (single field)
  - Kept: Email, Subject, Message
- **Validation:** Updated to validate `fullName` field
- **State Management:** Updated form data structure
- **Form Reset:** Updated to clear new field structure on success

---

## Form Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| fullName | text | Yes | Complete name of the person |
| email | email | Yes | User's email (validated) |
| subject | text | Yes | Email subject line |
| message | textarea | Yes | Main message (5 rows) |

---

## Email Flow

### User Submits Form
```
Full Name: John Doe
Email: john@example.com
Subject: Project Inquiry
Message: I'm interested in your services...
```

### Email Sent To: `blackzero.official@outlook.com`
**HTML Format:**
```
From: blackzero.official@outlook.com
To: blackzero.official@outlook.com
Reply-To: john@example.com

Subject: Project Inquiry

New Contact Form Submission

Name: John Doe
Email: john@example.com
Subject: Project Inquiry

Message:
I'm interested in your services...

---
This email was sent from your website's contact form. 
Please reply directly to john@example.com to respond.
```

### Confirmation Sent To User
```
From: blackzero.official@outlook.com
To: john@example.com

Subject: We Received Your Message - Black Zero

Hi John,

We have received your message and will get back to you 
as soon as possible.

Your Message:
I'm interested in your services...

Best regards,
The Black Zero Team
```

---

## API Request Format

```json
POST /api/send-email
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss..."
}
```

---

## API Response

### Success (200 OK)
```json
{
  "message": "Email sent successfully! We will get back to you soon."
}
```

### Error (400 Bad Request)
```json
{
  "message": "Missing required fields: fullName, email, subject, and message are required."
}
```

### Error (500 Server Error)
```json
{
  "message": "Failed to send email: [specific error]"
}
```

---

## Frontend Features

✅ **Form Validation**
- Validates all required fields
- Email format validation
- Displays error messages inline

✅ **Loading State**
- Submit button shows "Submitting..." while request is in progress
- Button is disabled during submission

✅ **Success Message**
- Green success message displays after successful submission
- Form automatically clears
- Message appears for user feedback

✅ **Error Handling**
- Red error message displays on failure
- Network errors are caught and displayed
- Detailed error messages from API

---

## Environment Variables Summary

```env
# Office 365 SMTP Configuration
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=blackzero.official@outlook.com
SMTP_PASSWORD=blackzero1122
SMTP_FROM_EMAIL=blackzero.official@outlook.com
```

---

## Testing the Form

1. **Navigate to:** `/contact`
2. **Fill in:**
   - Full Name: Your name
   - Email: Your email
   - Subject: Test submission
   - Message: Test message content
3. **Click:** Submit
4. **Observe:**
   - Button shows "Submitting..."
   - Success message appears
   - Form clears
5. **Check Email:**
   - Confirmation email in your inbox
   - Submission email in `blackzero.official@outlook.com`

---

## Files Modified

✅ `.env.local` - Updated SMTP host to Office 365
✅ `src/app/api/send-email/route.ts` - Updated for fullName and new recipient
✅ `src/components/ContactForm.tsx` - Updated form fields and validation

---

## Important Notes

- **Office 365 SMTP:** Uses `smtp.office365.com` with TLS (port 587)
- **Email Recipient:** All submissions now go to `blackzero.official@outlook.com`
- **Field Change:** Forms now accept a single `fullName` field instead of separate first/last names
- **Backward Compatibility:** Forms using separate name fields should update their requests
- **Restart Required:** After changing `.env.local`, restart your dev server

---

## Verification Checklist

- [x] SMTP host updated to smtp.office365.com
- [x] Auth credentials set correctly
- [x] Email recipient changed to blackzero.official@outlook.com
- [x] fullName field implemented in frontend
- [x] fullName field implemented in backend
- [x] Validation updated
- [x] Email templates updated
- [x] Confirmation email uses fullName
- [x] Loading state functional
- [x] Success message displays
- [x] Error handling in place
