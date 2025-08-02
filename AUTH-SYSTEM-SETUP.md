# Authentication System Setup Guide

This guide will walk you through setting up the user authentication system that connects to your Hostinger database.

## Overview

The authentication system includes:
- User registration (sign up)
- User login
- Secure session management
- Protected routes
- User dashboard
- Database integration with Hostinger MySQL

## Database Setup

### 1. Configure Database Connection

The `src/config/hostinger-config.php` file has been updated with your Hostinger database credentials:

```php
return [
    // Database connection settings
    'db' => [
        'host'     => 'localhost',         // Usually 'localhost' for Hostinger MySQL databases
        'name'     => 'u770934494_User_Info', // Your database name
        'user'     => 'u770934494_Shared_Base', // Your database username
        'password' => 'Mirza.Ali!1', // Your database password
        'charset'  => 'utf8mb4',
        'port'     => 3306                 // Default MySQL port
    ],
    // Other settings...
];
```

### 2. Create Database Tables

Upload all PHP files to your Hostinger server, then visit:
```
https://yourdomain.com/src/config/install-database.php
```

This will create all necessary tables:
- `users` - Stores user account information
- `user_sessions` - Manages active user sessions
- `user_profiles` - Stores additional user profile data
- `contact_submissions` - Stores contact form submissions

## PHP Files

The system uses these PHP files:

1. **auth-handler.php**: Handles authentication requests (login, signup, session verification)
2. **db-config.php**: Database connection configuration
3. **hostinger-config.php**: Hostinger-specific settings
4. **install-database.php**: Database installation script
5. **database-setup.sql**: SQL schema for creating tables
6. **contact-handler.php**: Processes contact form submissions

## React Components

The system includes these React components:

1. **AuthPage.tsx**: Login and registration form
2. **UserDashboard.tsx**: User dashboard shown after login
3. **AppRoutes.tsx**: Route management with protected routes

## Deployment Steps

Follow these steps to deploy the authentication system:

### 1. Upload PHP Files to Hostinger

Using FTP or Hostinger's File Manager, upload these files to your server:
- `src/config/auth-handler.php`
- `src/config/db-config.php` 
- `src/config/hostinger-config.php`
- `src/config/install-database.php`
- `src/config/database-setup.sql`
- `src/config/contact-handler.php`

### 2. Update API Endpoints

Make sure all API endpoints in your React components match your file paths:

```javascript
// Example in AuthPage.tsx
const endpoint = `/src/config/auth-handler.php?action=${isLogin ? 'login' : 'signup'}`;
```

Update these paths if you place the PHP files in different locations on your server.

### 3. Add Required Packages

Install required React packages:

```bash
npm install react-router-dom
```

### 4. Update Main App Component

Update your main app component to use the routes:

```jsx
import AppRoutes from './AppRoutes';

function App() {
  return <AppRoutes />;
}

export default App;
```

## Security Considerations

- **HTTPS**: Ensure your website uses HTTPS to protect user credentials
- **Password Storage**: Passwords are hashed using PHP's password_hash() function
- **Session Management**: Sessions expire after 30 days or upon logout
- **Input Validation**: All user inputs are validated and sanitized
- **CORS Headers**: Properly configured to prevent unauthorized access

## Testing Authentication

1. **Register**: Create a new account at `/auth` (sign up form)
2. **Login**: Log in with your credentials
3. **Dashboard**: You should be redirected to `/dashboard`
4. **Protected Routes**: Try accessing `/dashboard` without logging in (should redirect to `/auth`)
5. **Logout**: Test the logout functionality

## Extending the System

### Adding User Roles

The database already supports user roles (`user`, `admin`, `instructor`). To implement role-based access:

1. Update the auth-handler.php to return the user's role in the response
2. Create additional protected route components based on roles
3. Modify the AdminRoute component in AppRoutes.tsx with actual role checking

### Password Reset

To add password reset functionality:

1. Create a new PHP handler for password reset requests
2. Add a "Forgot Password" link on the login form
3. Implement email sending for reset tokens
4. Create a password reset form component

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify your database credentials in hostinger-config.php
   - Check if your database exists and is accessible

2. **CORS Issues**
   - If you get CORS errors, make sure your PHP files have proper CORS headers
   - You may need to specify your exact domain in the Access-Control-Allow-Origin header

3. **404 Not Found Errors**
   - Check that your PHP file paths match the fetch URLs in your React components
   - Verify file permissions on your server

4. **Registration Failures**
   - Check for unique constraint violations (email already exists)
   - Validate password requirements (length, complexity)

For any issues, check your browser console and server logs for specific error messages.

## Support

If you need further assistance, please contact our support team or refer to the following resources:

- React Router documentation: https://reactrouter.com/
- PHP PDO documentation: https://www.php.net/manual/en/book.pdo.php
- Hostinger database guide: https://support.hostinger.com/en/articles/1583546-how-to-create-a-database-using-mysql
