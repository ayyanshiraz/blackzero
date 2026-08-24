# Service Forms Email System - Quick Reference

## 📋 Overview
All service forms send emails to the **same recipient** (`blackzeroit1@gmail.com`) using a **unified system** with **zero code duplication**.

---

## 🔗 Key Files

| File | Purpose |
|------|---------|
| `src/app/api/send-email/route.ts` | ✅ API endpoint - handles all email submissions |
| `src/lib/formSubmissionHelper.ts` | ✅ Reusable `submitServiceForm()` function |
| `src/components/ContactForm.tsx` | ✅ Unified form component (all service pages use this) |
| `src/components/ServiceClientView.tsx` | Renders service pages + form |
| `src/components/SubSectionClientView.tsx` | Renders sub-service pages + form |

---

## 🚀 How Service Forms Work

### Step 1: Service page renders
```tsx
// /services/animation/page.tsx
export default function AnimationPage() {
  return <ServiceClientView service={animationData} />;
}
```

### Step 2: ServiceClientView passes serviceName
```tsx
// ServiceClientView.tsx
<ContactForm 
  title="Have a Project in Mind?"
  subtitle="Lets discuss how our Animation services..."
  serviceName={service.title} // ✅ "Animation"
  serviceOptions={contactFormOptions}
/>
```

### Step 3: Form is submitted
User fills form and clicks submit → `submitServiceForm()` is called

### Step 4: Email is sent
```
To: blackzeroit1@gmail.com
Subject: [Animation] New Submission: Inquiry about 2D Animation
Body: Includes service name, user details, and message
```

---

## 📝 API Endpoint

**URL:** `POST /api/send-email`

**Request Payload:**
```typescript
{
  fullName: string;
  email: string;
  subject: string;
  message: string;
  serviceName?: string;  // Optional - set by service pages
  phone?: string;        // Optional - for future use
}
```

**Response:**
```typescript
{
  success: true,
  message: "Email sent successfully! We will get back to you soon."
}
```

---

## 🎯 Helper Function

**Import:**
```typescript
import { submitServiceForm, type FormSubmissionPayload } from '@/lib/formSubmissionHelper';
```

**Usage:**
```typescript
const result = await submitServiceForm({
  fullName: 'John Doe',
  email: 'john@example.com',
  subject: 'Inquiry',
  message: 'I want to learn more about your services',
  serviceName: 'Animation',
});

if (result.success) {
  console.log('✅ Email sent!');
} else {
  console.log('❌ Error:', result.message);
}
```

---

## 🔄 Form Data Flow

```
User Form Input
     ↓
ContactForm (validation)
     ↓
submitServiceForm() helper (validation + API call)
     ↓
/api/send-email endpoint
     ↓
Nodemailer (Gmail SMTP)
     ↓
2 Emails sent:
  1. Admin notification (to blackzeroit1@gmail.com)
  2. User confirmation (to user's email)
```

---

## ✨ Features

✅ **Single Email Recipient:** All forms → `blackzeroit1@gmail.com`  
✅ **Service Name Included:** Subject line shows service name  
✅ **No Code Duplication:** One helper function, one API route  
✅ **Type Safe:** Full TypeScript support  
✅ **Error Handling:** Clear error messages to user  
✅ **Loading States:** Button disabled during submission  
✅ **Confirmation:** User receives confirmation email  

---

## 🧪 Test Each Form

| Service | URL | Expected Email Subject |
|---------|-----|--------|
| Animation | `/services/animation` | `[Animation] New Submission:...` |
| Business Analytics | `/services/business-analytics` | `[Business Analytics] New Submission:...` |
| Development | `/services/development` | `[Development] New Submission:...` |
| Graphic Designing | `/services/graphic-designing` | `[Graphic Designing] New Submission:...` |
| Marketing | `/services/marketing` | `[Marketing] New Submission:...` |
| Photo/Video | `/services/photo-video` | `[Photo/Video] New Submission:...` |
| Digital Marketing | `/services/marketing/digital-marketing` | `[Digital Marketing] New Submission:...` |

---

## 🔧 Environment Variables

Located in `.env.local`:
```env
GMAIL_USER=blackzeroit1@gmail.com
GMAIL_APP_PASSWORD=njxuogsoravkdzrr
CONTACT_RECIPIENT_EMAIL=blackzeroit1@gmail.com
```

---

## 📧 Email Templates

### Admin Notification
```
To: blackzeroit1@gmail.com
Subject: [Service Name] New Submission: [Subject]

📌 Service: [Service Name]
Name: [User Name]
Email: [User Email]
Phone: [Phone - optional]
Subject: [Subject]

Message:
[User Message]
```

### User Confirmation
```
To: [User Email]
Subject: We Received Your Message - Black Zero

Hi [First Name],

We have received your message and will get back to 
you as soon as possible.

Best regards,
The Black Zero Team
```

---

## 🆕 Adding a New Service Form

### Option 1: Use ServiceClientView (Recommended)
```tsx
// /app/services/new-service/page.tsx
import ServiceClientView from '@/components/ServiceClientView';

const newServiceData = {
  title: 'New Service',
  slug: 'new-service',
  // ...rest of data
};

export default function NewServicePage() {
  return <ServiceClientView service={newServiceData} />;
}
// ✅ Form automatically gets serviceName="New Service"
```

### Option 2: Custom Form Implementation
```tsx
'use client';
import { submitServiceForm } from '@/lib/formSubmissionHelper';

export default function CustomForm() {
  const handleSubmit = async (e) => {
    const result = await submitServiceForm({
      fullName: data.fullName,
      email: data.email,
      subject: data.subject,
      message: data.message,
      serviceName: 'My Service', // Set custom service name
    });
    // Handle result
  };
  // ...
}
```

---

## 🐛 Troubleshooting

**Problem:** Form doesn't submit  
**Solution:** Check console for validation errors, ensure email is valid

**Problem:** Email not received  
**Solution:** Check `.env.local` credentials, verify email in CONTACT_RECIPIENT_EMAIL

**Problem:** Service name not appearing in email  
**Solution:** Ensure `serviceName` prop is passed to `ContactForm` component

**Problem:** Validation errors not showing  
**Solution:** Make sure all required fields are filled (fullName, email, subject, message)

---

## 📚 Code Examples

### Complete Form Submission
```typescript
try {
  const result = await submitServiceForm({
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    subject: 'Project Inquiry',
    message: 'I need help with my project',
    serviceName: 'Development',
  });

  if (result.success) {
    // Show success message
    setStatusMessage({
      type: 'success',
      text: result.message
    });
    // Clear form
    resetForm();
  } else {
    // Show error message
    setStatusMessage({
      type: 'error',
      text: result.message
    });
  }
} catch (error) {
  console.error('Submission error:', error);
}
```

---

## ✅ Checklist for New Forms

- [ ] Form uses `ContactForm` component
- [ ] `serviceName` prop is passed
- [ ] All required fields present
- [ ] Success/error messages display
- [ ] Loading state shows during submission
- [ ] Form clears on successful submission
- [ ] Test submission
- [ ] Verify email received at `blackzeroit1@gmail.com`
