@echo off
echo ====================================
echo Virtual Solutions - Build for Production
echo ====================================
echo.

echo Step 1: Building the React application...
call npm run build
if %errorlevel% neq 0 (
    echo Error: Build failed.
    pause
    exit /b 1
)
echo React build completed successfully!
echo.

echo Step 2: Creating deployment directory...
set DEPLOY_DIR=%~dp0deploy
if exist "%DEPLOY_DIR%" (
    echo Cleaning up existing deployment directory...
    rd /s /q "%DEPLOY_DIR%"
)
mkdir "%DEPLOY_DIR%"
mkdir "%DEPLOY_DIR%\Server"
echo Deployment directory created at: %DEPLOY_DIR%
echo.

echo Step 3: Copying built files to deployment directory...
xcopy "dist\*" "%DEPLOY_DIR%" /E /H /C /I
echo Copied React build files to deployment directory.
echo.

echo Step 4: Copying server files to deployment directory...
xcopy "Server\*.php" "%DEPLOY_DIR%\Server\" /Y
if exist "Server\vendor" (
    echo Copying PHP dependencies...
    xcopy "Server\vendor\*" "%DEPLOY_DIR%\Server\vendor\" /E /H /C /I
)

echo Step 5: Creating .htaccess file for React routing...
(
echo ^<IfModule mod_rewrite.c^>
echo   RewriteEngine On
echo   RewriteBase /
echo   RewriteRule ^index\.html$ - [L]
echo   RewriteCond %%{REQUEST_FILENAME} !-f
echo   RewriteCond %%{REQUEST_FILENAME} !-d
echo   RewriteRule . /index.html [L]
echo ^</IfModule^>
) > "%DEPLOY_DIR%\.htaccess"
echo Created .htaccess file for client-side routing.
echo.

echo Step 6: Creating PHP configuration file...
(
echo ^<?php
echo // PHP Configuration File
echo ini_set('display_errors', 0^);
echo error_reporting(E_ALL ^& ~E_NOTICE ^& ~E_WARNING^);
echo.
echo // Set timezone
echo date_default_timezone_set('UTC'^);
echo ?^>
) > "%DEPLOY_DIR%\Server\config.php"

echo Step 7: Creating README for deployment...
(
echo # Virtual Solutions - Deployment Package
echo.
echo This folder contains all the files needed to deploy the Virtual Solutions website to Hostinger.
echo.
echo ## Deployment Instructions
echo.
echo 1. Upload all files and folders from this directory to your Hostinger hosting account.
echo 2. Make sure to preserve the directory structure.
echo 3. The main website files should be in the root directory.
echo 4. The Server folder contains the PHP backend files.
echo.
echo ## Important Files
echo.
echo - index.html: The main entry point for the website
echo - .htaccess: Configuration for client-side routing
echo - Server/: Contains PHP backend files for the contact form
echo.
echo ## Setup Steps After Upload
echo.
echo 1. Configure your email settings in Server/email_config.php
echo 2. Make sure the Server directory has appropriate permissions ^(typically 755^)
echo 3. Test the contact form by submitting a test message
echo.
) > "%DEPLOY_DIR%\README-DEPLOYMENT.md"

echo ====================================
echo Build completed successfully!
echo ====================================
echo.
echo The deployment package is ready in the "deploy" folder.
echo Upload all contents of this folder to your Hostinger hosting account.
echo.
echo Important:
echo 1. After uploading, configure email settings in Server/email_config.php
echo 2. Review README-DEPLOYMENT.md for additional setup instructions
echo.
pause
