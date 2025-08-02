# Build Script for Virtual Solutions - PHP Integration
# This script builds the React app and copies PHP files

Write-Host "🚀 Building Virtual Solutions with PHP Integration..." -ForegroundColor Cyan
Write-Host ""

# Build the React application
Write-Host "📦 Building React application..." -ForegroundColor Yellow
npm run build:vite

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ React build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ React build completed successfully!" -ForegroundColor Green
Write-Host ""

# Copy PHP files
Write-Host "🔧 Copying PHP server files..." -ForegroundColor Yellow
npm run build:php

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ PHP file copy failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ PHP files copied successfully!" -ForegroundColor Green
Write-Host ""

# Create deployment structure info
$distPath = Join-Path $PSScriptRoot ".." "dist"
$serverPath = Join-Path $distPath "Server"

if (Test-Path $distPath) {
    Write-Host "📂 Build Output Structure:" -ForegroundColor Cyan
    Write-Host "  📁 dist/" -ForegroundColor White
    Write-Host "    📄 index.html" -ForegroundColor Gray
    Write-Host "    📁 assets/" -ForegroundColor White
    
    if (Test-Path $serverPath) {
        Write-Host "    📁 Server/" -ForegroundColor White
        $phpFiles = Get-ChildItem -Path $serverPath -Filter "*.php" | Select-Object -ExpandProperty Name
        foreach ($file in $phpFiles) {
            Write-Host "      📄 $file" -ForegroundColor Gray
        }
    }
    
    $totalSize = (Get-ChildItem $distPath -Recurse | Measure-Object -Property Length -Sum).Sum
    $sizeInMB = [math]::Round($totalSize / 1MB, 2)
    Write-Host ""
    Write-Host "📊 Total build size: $sizeInMB MB" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "🎉 Build completed successfully!" -ForegroundColor Green
Write-Host "📂 Files ready for deployment in: $distPath" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔧 Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Upload the 'dist' folder contents to your web server" -ForegroundColor White
Write-Host "  2. Ensure PHP is enabled on your hosting server" -ForegroundColor White
Write-Host "  3. Test the PHP endpoints at /Server/server-info.php" -ForegroundColor White
Write-Host "  4. Configure your database connection in the PHP files" -ForegroundColor White
