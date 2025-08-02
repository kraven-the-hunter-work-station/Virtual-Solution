import { submitContactForm } from '../services/api';

// Import this file at the top of your ContactPage.tsx file
// and modify the handleSubmit function to use the API service

export const submitContactFormToApi = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await submitContactForm(formData);
    return response;
  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      message: 'An error occurred while submitting the form. Please try again.',
    };
  }
};
