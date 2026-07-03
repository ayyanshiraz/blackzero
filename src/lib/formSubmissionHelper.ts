/**
 * Reusable form submission helper for service forms
 * Handles validation, API communication, and state management
 */

export interface FormSubmissionPayload {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  serviceName?: string;
  phone?: string;
  [key: string]: any; // Allow additional custom fields
}

export interface FormSubmissionResult {
  success: boolean;
  message: string;
}

/**
 * Validates email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Submits form data to the email API
 * @param payload - Form data to submit
 * @returns Result with success status and message
 */
export const submitServiceForm = async (
  payload: FormSubmissionPayload
): Promise<FormSubmissionResult> => {
  try {
    // Validate required fields
    if (!payload.fullName || !payload.email || !payload.subject || !payload.message) {
      return {
        success: false,
        message: 'Please fill in all required fields.',
      };
    }

    // Validate email
    if (!validateEmail(payload.email)) {
      return {
        success: false,
        message: 'Please enter a valid email address.',
      };
    }

    // Submit to API
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'An error occurred while sending your request.');
    }

    return {
      success: true,
      message: result.message || 'Your request has been sent successfully!',
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred. Please try again.';

    return {
      success: false,
      message: errorMessage,
    };
  }
};
