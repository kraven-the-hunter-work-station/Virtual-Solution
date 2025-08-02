# Virtual Solutions - Build for Hostinger
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Virtual Solutions - Build for Production" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Get the script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$deployDir = Join-Path $scriptDir "deploy"

Write-Host "Step 1: Building the React application..." -ForegroundColor Green
try {
    npm run build
    if ($LASTEXITCODE -ne 0) {
        throw "Build command failed with exit code $LASTEXITCODE"
    }
    Write-Host "React build completed successfully!" -ForegroundColor Green
}
catch {
    Write-Host "Error: Build failed - $_" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host ""

Write-Host "Step 2: Creating deployment directory..." -ForegroundColor Green
if (Test-Path $deployDir) {
    Write-Host "Cleaning up existing deployment directory..."
    Remove-Item -Path $deployDir -Recurse -Force
}
New-Item -ItemType Directory -Path $deployDir | Out-Null
New-Item -ItemType Directory -Path "$deployDir\Server" | Out-Null
Write-Host "Deployment directory created at: $deployDir" -ForegroundColor Green
Write-Host ""

Write-Host "Step 3: Copying built files to deployment directory..." -ForegroundColor Green
Copy-Item -Path "$scriptDir\dist\*" -Destination $deployDir -Recurse
Write-Host "Copied React build files to deployment directory." -ForegroundColor Green
Write-Host ""

Write-Host "Step 4: Copying server files to deployment directory..." -ForegroundColor Green
Copy-Item -Path "$scriptDir\Server\*.php" -Destination "$deployDir\Server\"
if (Test-Path "$scriptDir\Server\vendor") {
    Write-Host "Copying PHP dependencies..."
    Copy-Item -Path "$scriptDir\Server\vendor\*" -Destination "$deployDir\Server\vendor\" -Recurse
}
Write-Host ""

Write-Host "Step 5: Creating .htaccess file for React routing..." -ForegroundColor Green
@"
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
"@ | Set-Content -Path "$deployDir\.htaccess"
Write-Host "Created .htaccess file for client-side routing." -ForegroundColor Green
Write-Host ""

Write-Host "Step 6: Creating PHP configuration file..." -ForegroundColor Green
@"
<?php
// PHP Configuration File
ini_set('display_errors', 0);
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);

// Set timezone
date_default_timezone_set('UTC');
?>
"@ | Set-Content -Path "$deployDir\Server\config.php"
Write-Host ""

Write-Host "Step 7: Creating README for deployment..." -ForegroundColor Green
@"
# Virtual Solutions - Deployment Package

This folder contains all the files needed to deploy the Virtual Solutions website to Hostinger.

## Deployment Instructions

1. Upload all files and folders from this directory to your Hostinger hosting account.
2. Make sure to preserve the directory structure.
3. The main website files should be in the root directory.
4. The Server folder contains the PHP backend files.

## Important Files

- index.html: The main entry point for the website
- .htaccess: Configuration for client-side routing
- Server/: Contains PHP backend files for the contact form

## Setup Steps After Upload

1. Configure your email settings in Server/email_config.php
2. Make sure the Server directory has appropriate permissions (typically 755)
3. Test the contact form by submitting a test message

"@ | Set-Content -Path "$deployDir\README-DEPLOYMENT.md"
Write-Host ""

Write-Host "====================================" -ForegroundColor Green
Write-Host "Build completed successfully!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
Write-Host ""
Write-Host "The deployment package is ready in the 'deploy' folder."
Write-Host "Upload all contents of this folder to your Hostinger hosting account."
Write-Host ""
Write-Host "Important:" -ForegroundColor Yellow
Write-Host "1. After uploading, configure email settings in Server/email_config.php" -ForegroundColor Yellow
Write-Host "2. Review README-DEPLOYMENT.md for additional setup instructions" -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to exit"
