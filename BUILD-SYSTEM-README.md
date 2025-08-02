# Build System with PHP Integration

## Overview
The Virtual Solutions project now includes an integrated build system that handles both the React frontend and PHP backend files in a single build process.

## Build Commands

### Primary Build Command
```bash
npm run build
```
This runs the complete build process:
1. Builds the React application using Vite
2. Copies all PHP server files to the dist directory
3. Sets up the proper directory structure for deployment

### Individual Build Commands
```bash
npm run build:vite    # Build only the React application
npm run build:php     # Copy only the PHP files
npm run build:all     # Same as npm run build
```

### Windows Batch Scripts
```bash
build-complete.bat    # Complete build with progress display
scripts/build-with-php.ps1    # PowerShell build script
```

## Build Output Structure

After running `npm run build`, the `dist/` directory will contain:

```
dist/
├── index.html              # Main React application
├── assets/                 # CSS and JS bundles
│   ├── index-[hash].css
│   └── index-[hash].js
├── vs-logo.svg             # Application logo
├── .htaccess               # Apache configuration
└── Server/                 # PHP backend files
    ├── auth-handler.php
    ├── contact-handler.php
    ├── local-auth-mock.php
    ├── server-info.php     # Auto-generated test endpoint
    ├── vendor/             # PHP dependencies (if present)
    └── [all other PHP files]
```

## PHP Files Included

The build system automatically includes these PHP files:

### Authentication System
- `local-auth-mock.php` - Mock authentication for development
- `auth-handler.php` - Production authentication handler
- `user-auth.php` - User authentication utilities

### Contact & Email System
- `contact-handler.php` - Contact form processor
- `email-handler.php` - Email sending utilities
- `secure-mailer.php` - Secure email implementation

### Database & Configuration
- `db-config.php` - Database configuration
- `hostinger-config.php` - Hostinger-specific settings
- `install-database.php` - Database setup script

### Testing & Utilities
- `test-connection.php` - Connection testing
- `server-info.php` - Server information endpoint (auto-generated)

## Deployment Instructions

### 1. Build the Project
```bash
npm run build
```

### 2. Upload to Web Server
Upload the entire contents of the `dist/` folder to your web server's public directory.

### 3. Server Requirements
- PHP 7.4 or higher
- MySQL database (for production)
- Apache/Nginx with URL rewriting support

### 4. Configuration
1. Edit the PHP configuration files in the `Server/` directory
2. Update database credentials in `db-config.php`
3. Configure email settings in `email-config.php`

### 5. Testing
- Visit your site to test the React application
- Test PHP endpoints at `/Server/server-info.php`
- Verify authentication at `/Server/local-auth-mock.php`

## Development Workflow

### For Frontend Changes
```bash
npm run dev              # Start development server
npm run build:vite       # Build only frontend
```

### For Backend Changes
```bash
npm run build:php        # Copy updated PHP files
npm run build            # Full rebuild
```

### Local PHP Development
```bash
# Start a local PHP server for testing
cd dist
php -S localhost:8000
```

## File Sources

The build system copies PHP files from these locations:
- `src/config/` - Development PHP files
- `deploy/Server/` - Production PHP files  
- `hostinger-deployment/server/` - Hostinger-specific files
- `hostinger-deployment/public_html/` - Additional public files

## Build Script Customization

The PHP build logic is in `scripts/copy-php.cjs`. You can modify this file to:
- Add new PHP files to the copy list
- Change the output directory structure
- Add custom build steps
- Include additional file types

## Troubleshooting

### Build Fails on PHP Copy
- Ensure Node.js is installed and accessible
- Check that PHP source files exist in expected locations
- Verify write permissions on the dist directory

### PHP Files Not Working
- Ensure PHP is enabled on your web server
- Check file permissions (644 for PHP files)
- Verify database connections in PHP configuration files

### CORS Issues
- The PHP files include CORS headers for development
- For production, configure your web server's CORS settings

## Environment-Specific Builds

### Development
```bash
npm run dev              # Uses local-auth-mock.php
```

### Production  
```bash
npm run build           # Includes all PHP files for production
```

### Hostinger Deployment
The build system automatically includes Hostinger-specific configurations and files for seamless deployment to Hostinger hosting.

## Additional Features

- **Automatic vendor directory copying** - Includes Composer dependencies
- **CORS header management** - PHP files include development-friendly CORS headers
- **Build size reporting** - Shows total build size after completion
- **File verification** - Confirms all expected files are copied successfully
