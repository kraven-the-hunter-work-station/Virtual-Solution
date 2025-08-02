// EmailJS Configuration for Virtual Solutions Path Contact Form
// This service will send emails directly to contact@virtualsolutionspath.com

export const emailJSConfig = {
  serviceID: 'service_vsp2024',
  templateID: 'template_contact',
  userID: 'user_vsp_2024'
};

// Alternative: Direct SMTP configuration (for production)
export const smtpConfig = {
  host: 'smtp.gmail.com', // or your email provider's SMTP
  port: 587,
  secure: false,
  auth: {
    user: 'contact@virtualsolutionspath.com',
    pass: 'your-app-password' // Generate this from your email provider
  }
};

// Web3Forms configuration (reliable free service)
export const web3FormsConfig = {
  accessKey: 'YOUR_WEB3FORMS_ACCESS_KEY', // Get from https://web3forms.com
  endpoint: 'https://api.web3forms.com/submit'
};

// Instructions for setting up email services:
/*
1. EmailJS (Recommended - Easy setup):
   - Go to https://emailjs.com
   - Create account with contact@virtualsolutionspath.com
   - Create email service (Gmail/Outlook/etc.)
   - Create email template
   - Replace the config above with your keys

2. Web3Forms (Alternative - Very reliable):
   - Go to https://web3forms.com
   - Sign up with contact@virtualsolutionspath.com
   - Get your access key
   - Replace YOUR_WEB3FORMS_ACCESS_KEY above

3. SMTP (For advanced users):
   - Enable 2FA on your email account
   - Generate app password
   - Use SMTP configuration above
*/
