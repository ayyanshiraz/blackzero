import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, subject, message, serviceName, phone } = await request.json();

    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        { message: `Missing required fields: fullName, email, subject, and message are required.` },
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

    // Explicit SMTP configuration for Gmail
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

    // 1. Admin Notification Email
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #222;">New ${serviceName ? 'Service Request' : 'Contact Form Submission'}</h2>
        ${serviceName ? `<p style="background-color: #f0f0f0; padding: 10px; border-radius: 4px; font-weight: bold;"><strong>📌 Service:</strong> ${serviceName}</p>` : ''}
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Subject:</strong> ${subject}</p>
        <h3 style="color: #444; margin-top: 20px;">Message:</h3>
        <p style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #ff0000; border-radius: 4px;">
          ${message.replace(/\n/g, `<br />`)}
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.CONTACT_RECIPIENT_EMAIL,
      replyTo: email,
      subject: `${serviceName ? `[${serviceName}] ` : ''}New Submission: ${subject}`,
      html: adminHtml,
    });

    // 2. User Confirmation Email
    const userHtml = `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #222;">Thank You for Contacting Black Zero</h2>
        <p>Hi ${fullName.split(` `)[0]},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br />The Black Zero Team</p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: `We Received Your Message - Black Zero`,
      html: userHtml,
    });

    return NextResponse.json(
      { message: `Email sent successfully! We will get back to you soon.` },
      { status: 200 }
    );

  } catch (error) {
    console.error(`Error sending email:`, error);
    return NextResponse.json(
      { message: `Failed to send email. Please verify your App Password and try again.` },
      { status: 500 }
    );
  }
}