import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: `Missing required fields: name, email, and message are required.` },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { message: `Invalid email address.` },
        { status: 400 }
      );
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return NextResponse.json(
        { message: `Email service is not configured. Please contact support.` },
        { status: 500 }
      );
    }

    // Gmail SMTP configuration
    const transporter = nodemailer.createTransport({
      host: `smtp.gmail.com`,
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Admin Notification Email
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #222;">New Turnitin Feedback Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <h3 style="color: #444; margin-top: 20px;">Feedback:</h3>
        <p style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #3b82f6; border-radius: 4px;">
          ${message.replace(/\n/g, `<br />`)}
        </p>
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;" />
        <p style="font-size: 12px; color: #777;">
          <em>This feedback was submitted from the Turnitin page. Reply to ${email} to respond.</em>
        </p>
      </div>
    `;

    const adminText = `
New Turnitin Feedback Submission

Name: ${name}
Email: ${email}

Feedback:
${message}

---
This feedback was submitted from the Turnitin page. Reply to ${email} to respond.
    `;

    // Send to admin
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.CONTACT_RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New Feedback from ${name} - Turnitin Service`,
      html: adminHtml,
      text: adminText,
    });

    // Confirmation email to user
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #222;">Thank You for Your Feedback</h2>
        <p>Hi ${name.split(' ')[0]},</p>
        <p>We have received your feedback regarding our Turnitin detection service. We truly appreciate you taking the time to share your thoughts with us.</p>
        <p style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #3b82f6; border-radius: 4px;">
          <strong>Your Feedback:</strong><br />
          ${message.replace(/\n/g, `<br />`)}
        </p>
        <p>Your input helps us improve our service. If you have any additional questions or concerns, feel free to reply to this email.</p>
        <p>Best regards,<br />The Black Zero Team</p>
      </div>
    `;

    const confirmationText = `
Thank you for your feedback!

Hi ${name.split(' ')[0]},

We have received your feedback regarding our Turnitin detection service. We truly appreciate you taking the time to share your thoughts with us.

Your Feedback:
${message}

Your input helps us improve our service. If you have any additional questions or concerns, feel free to reply to this email.

Best regards,
The Black Zero Team
    `;

    // Send confirmation to user
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'We Received Your Feedback - Black Zero Turnitin Service',
      html: confirmationHtml,
      text: confirmationText,
    });

    return NextResponse.json(
      { message: 'Feedback sent successfully! Thank you for your input.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending feedback email:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { message: `Failed to send feedback: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Failed to send feedback. Please try again later.' },
      { status: 500 }
    );
  }
}
