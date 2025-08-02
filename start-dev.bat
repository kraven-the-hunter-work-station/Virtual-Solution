@echo off
echo Starting development environment...

:: Start PHP server
start cmd /k "cd src && php -S localhost:3000"

:: Wait a moment
timeout /t 2

:: Start development server (assuming it's a React/Next.js app)
start cmd /k "npm run dev"

echo Development environment started!
echo PHP server running at http://localhost:3000
echo Test credentials:
echo Email: test@example.com
echo Password: password123
