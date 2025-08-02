# PowerShell script for Hostinger deployment
Write-Host "Running Hostinger Deployment Script..." -ForegroundColor Blue
node deploy-to-hostinger.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "Deployment script failed! Check the errors above." -ForegroundColor Red
    Read-Host -Prompt "Press Enter to exit"
    exit $LASTEXITCODE
}
Write-Host ""
Write-Host "Deployment preparation completed successfully!" -ForegroundColor Green
Write-Host "The files are ready in the 'deploy' directory."
Write-Host ""
Write-Host "Please follow the instructions in HOSTINGER-DEPLOYMENT.md to upload the files." -ForegroundColor Cyan
Read-Host -Prompt "Press Enter to exit"
