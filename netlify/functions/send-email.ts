import { Handler } from '@netlify/functions';
import sgMail from '@sendgrid/mail';

// Set the API key from your Netlify environment variables
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Log that the function was invoked to know it's running
  console.log('Function invoked. Parsing request body...');

  try {
    const { fullName, email, subject, message } = JSON.parse(event.body || '{}');
    const yourEmail = process.env.EMAIL_USER;

    if (!yourEmail) {
      console.error('CRITICAL: EMAIL_USER environment variable is not set.');
      return { statusCode: 500, body: JSON.stringify({ message: 'Server configuration error.' }) };
    }
    
    // Log the data received from the form
    console.log('Parsed form data:', { fullName, email, subject });

    const msg = {
      to: yourEmail,
      from: yourEmail,
      subject: `New Contact Form Submission: ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr>
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
    };

    // Log the email object just before sending
    console.log('Constructed email object. Attempting to send via SendGrid...');

    // Send the email AND capture the response from SendGrid
    const response = await sgMail.send(msg);

    // If successful, log the entire response from SendGrid
    console.log('Email sent successfully! SendGrid responded with:', JSON.stringify(response, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success! Your query has been submitted.' }),
    };
  } catch (error: any) {
    // If there's an error, log the entire detailed error object
    console.error('CRITICAL: Error sending email. Full error from SendGrid:', JSON.stringify(error, null, 2));

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'An error occurred. Please try again.' }),
    };
  }
};

export { handler };

