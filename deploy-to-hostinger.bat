@echo off
echo Running Hostinger Deployment Script...
node deploy-to-hostinger.js
if %ERRORLEVEL% NEQ 0 (
  echo Deployment script failed! Check the errors above.
  pause
  exit /b %ERRORLEVEL%
)
echo.
echo Deployment preparation completed successfully!
echo The files are ready in the 'deploy' directory.
echo.
echo Please follow the instructions in HOSTINGER-DEPLOYMENT.md to upload the files.
pause
