'use server';

// Define the shape of the state object that the action will return
export interface FormState {
  success: boolean;
  message: string | null;
}

export async function handleForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const fakeUrl = process.env.URL || 'http://localhost:3000';

  try {
    const body = new URLSearchParams(
      Object.fromEntries(formData) as Record<string, string>
    ).toString();

    const response = await fetch(fakeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body,
    });

    if (response.ok) {
      return { 
        success: true, 
        message: 'Success! Your query has been submitted.' 
      };
    }
    return { 
      success: false, 
      message: 'An error occurred on the server. Please try again.' 
    };
  } catch (error) {
    console.error('Form submission error:', error);
    return { 
      success: false, 
      message: 'An error occurred. Please try again.' 
    };
  }
}

