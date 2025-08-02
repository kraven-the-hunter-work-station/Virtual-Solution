@echo off
echo Starting PHP development server...
cd /d "%~dp0deploy\Server"
php -S localhost:80
