import axios from 'axios';

// Base URL configuration
const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://virtualsolutionspath.com' 
  : 'http://localhost:8000';

// Create an axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Contact form submission - Hostinger Business Email optimized
export const submitContactForm = async (formData: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}) => {
  try {
    console.log('Processing contact form submission for Hostinger email:', {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      timestamp: new Date().toISOString()
    });

    // Store submission locally for backup
    const submission = {
      id: Date.now().toString(),
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      message: formData.message,
      timestamp: new Date().toISOString(),
      status: 'processing'
    };

    const existingSubmissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
    existingSubmissions.push(submission);
    localStorage.setItem('contact_submissions', JSON.stringify(existingSubmissions));

    // Method 1: Try Server PHP handler (when deployed)
    try {
      const response = await fetch('/Server/contact-handler.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          console.log('Email sent successfully via Server PHP handler');
          
          // Update status
          submission.status = 'sent-via-server';
          const updatedSubmissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
          updatedSubmissions[updatedSubmissions.length - 1] = submission;
          localStorage.setItem('contact_submissions', JSON.stringify(updatedSubmissions));
          
          return { 
            success: true, 
            message: result.message || 'Thank you for your message! We will get back to you within 2 hours during business hours.'
          };
        }
      }
    } catch (serverError) {
      console.log('Server PHP handler not available, trying alternatives:', serverError);
    }

    // Method 2: Try FormSubmit (works well with business emails)
    try {
      const formSubmitResponse = await fetch('https://formsubmit.co/contact@virtualsolutionspath.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          message: formData.message,
          _subject: `New Contact Form Message from ${formData.firstName} ${formData.lastName}`,
          _captcha: 'false',
          _template: 'table'
        }),
      });

      if (formSubmitResponse.ok) {
        console.log('Email sent successfully via FormSubmit');
        submission.status = 'sent-via-formsubmit';
        const updatedSubmissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
        updatedSubmissions[updatedSubmissions.length - 1] = submission;
        localStorage.setItem('contact_submissions', JSON.stringify(updatedSubmissions));
        
        return { 
          success: true, 
          message: 'Thank you for your message! It has been sent to your Hostinger business email. We will get back to you within 2 hours during business hours.'
        };
      }
    } catch (formSubmitError) {
      console.log('FormSubmit failed, using mailto fallback for Hostinger email');
    }

    // Method 3: Enhanced mailto for Hostinger business email
    const subject = encodeURIComponent(`New Contact Form Message from ${formData.firstName} ${formData.lastName}`);
    const body = encodeURIComponent(`Hello!

You have received a new message from your website contact form:

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}

Message:
${formData.message}

---
This message was sent from Virtual Solutions Path Contact Form
Time: ${new Date().toLocaleString()}
Submission ID: ${submission.id}

Please reply directly to this email or contact the sender at: ${formData.email}

Note: This message is for your Hostinger business email account.
`);

    // Log detailed information for Hostinger setup
    console.log('HOSTINGER EMAIL SETUP - Manual sending required:');
    console.log('To: contact@virtualsolutionspath.com (Hostinger Business Email)');
    console.log('Subject:', decodeURIComponent(subject));
    console.log('Body:', decodeURIComponent(body));
    
    // Try to open email client
    const mailtoUrl = `mailto:contact@virtualsolutionspath.com?subject=${subject}&body=${body}`;
    
    setTimeout(() => {
      window.open(mailtoUrl, '_blank');
    }, 1000);

    submission.status = 'prepared-for-hostinger';
    const updatedSubmissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
    updatedSubmissions[updatedSubmissions.length - 1] = submission;
    localStorage.setItem('contact_submissions', JSON.stringify(updatedSubmissions));
    
    return { 
      success: true, 
      message: `Your message has been prepared for your Hostinger business email! Your email client should open automatically. If not, manually send the message to contact@virtualsolutionspath.com. Submission ID: ${submission.id}`
    };
    
  } catch (error) {
    console.error('Hostinger contact form error:', error);
    
    return { 
      success: false, 
      message: 'Please email us directly at contact@virtualsolutionspath.com (Hostinger business email). We apologize for the technical difficulty and will respond promptly!'
    };
  }
};

// Authentication services
interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData extends LoginCredentials {
  firstName: string;
  lastName: string;
}

export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await api.post('/login.php', credentials);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signup = async (userData: SignupData) => {
  try {
    const response = await api.post('/signup.php', userData);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('auth_token');
};

// User profile services
export const getUserProfile = async () => {
  try {
    const response = await api.get('/profile.php');
    return response.data;
  } catch (error) {
    console.error('Get profile error:', error);
    throw error;
  }
};

export const updateUserProfile = async (profileData: any) => {
  try {
    const response = await api.put('/profile.php', profileData);
    return response.data;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

// Error handler helper
export const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with error
    return {
      success: false,
      message: error.response.data.message || 'Server error occurred',
      status: error.response.status,
    };
  } else if (error.request) {
    // Request made but no response
    return {
      success: false,
      message: 'No response from server. Please check your connection.',
      status: 0,
    };
  } else {
    // Error setting up request
    return {
      success: false,
      message: 'Request failed. Please try again.',
      status: 0,
    };
  }
};
