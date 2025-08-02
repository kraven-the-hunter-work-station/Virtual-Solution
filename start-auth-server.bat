@echo off
echo ==============================================
echo DEVELOPMENT AUTH SERVER - LOCAL TESTING ONLY
echo ==============================================
echo.
echo Development Credentials:
echo Email: dev@local
echo Password: dev123
echo.
echo This server only accepts requests from localhost:5173
echo.
echo Starting PHP server for authentication...
cd /d "%~dp0public"
php -S localhost:8080
pause
