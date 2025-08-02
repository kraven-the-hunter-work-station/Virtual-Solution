# Virtual Solutions Path Website

This repository contains the code for the Virtual Solutions Path website.

## Features

- Modern React-based frontend with TypeScript
- Responsive design using Tailwind CSS
- Secure contact form with multiple email handling methods
- Premium UI components and animations
- User authentication system with secure login/signup
- Shopping cart for course purchases
- Course progress tracking system
- User dashboard with course statistics

## Email System

The website includes a secure email system for the contact form that:

1. Uses PHPMailer with SMTP authentication
2. Provides multiple fallback methods (EmailJS, Formspree, direct PHP)
3. Works reliably on Hostinger shared hosting

For detailed setup instructions, see [EMAIL-SETUP-INSTRUCTIONS.md](./EMAIL-SETUP-INSTRUCTIONS.md)

## Cart and Course Purchase System

The website includes a complete cart and course purchase system:

1. Users can add courses to their cart
2. Profile menu shows cart count with notification badge
3. Users can purchase courses which appear in "My Courses"
4. Course progress is tracked as users complete lessons
5. Dashboard shows statistics on course completion

For detailed information, see [CART-SYSTEM.md](./CART-SYSTEM.md)

## Authentication System

The website includes a secure authentication system:

1. User signup and login functionality
2. Token-based authentication with secure storage
3. Protected routes for authenticated users
4. User profile with customizable settings

For detailed setup instructions, see [AUTH-SYSTEM-SETUP.md](./AUTH-SYSTEM-SETUP.md)

