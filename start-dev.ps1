# PowerShell script to start the development server
Set-Location "d:\Virtual Solutions Path"

Write-Host "Starting Virtual Solutions Development Server..." -ForegroundColor Green
Write-Host "Make sure Node.js is installed and dependencies are installed with 'npm install'" -ForegroundColor Yellow

# Check if node_modules exists
if (!(Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

Write-Host "Starting development server..." -ForegroundColor Green
npm run dev

Read-Host "Press Enter to close this window"
