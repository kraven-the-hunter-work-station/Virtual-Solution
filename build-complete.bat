@echo off
echo 🚀 Building Virtual Solutions with PHP Integration...
echo.

rem Build the React application and PHP files
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo.
echo ✅ Build completed successfully!
echo 📂 Files ready for deployment in: dist/
echo.
echo 🔧 Next Steps:
echo   1. Upload the 'dist' folder contents to your web server
echo   2. Ensure PHP is enabled on your hosting server  
echo   3. Test the PHP endpoints at /Server/server-info.php
echo   4. Configure your database connection in the PHP files
echo.
pause
