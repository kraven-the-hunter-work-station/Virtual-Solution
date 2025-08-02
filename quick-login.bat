@echo off
echo ===============================================
echo DEVELOPMENT LOGIN - NO SERVER REQUIRED
echo ===============================================
echo.
echo Username: test@example.com
echo Password: test123 (pre-filled)
echo.
echo This login is hardcoded and works offline!
echo.

start "" "http://localhost:8080/dev-login.html"

cd /d "%~dp0public"
php -S localhost:8080
