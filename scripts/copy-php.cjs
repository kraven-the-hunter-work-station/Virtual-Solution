const fs = require('fs');
const path = require('path');

/**
 * Build Script - Copy PHP Files
 * 
 * This script copies PHP server files to the dist directory during build
 */

const sourceDirectories = [
  'src/config',
  'deploy/Server',
  'hostinger-deployment/server'
];

const phpFiles = [
  'local-auth-mock.php',
  'auth-handler.php',
  'contact-handler.php',
  'db-config.php',
  'direct-mail.php',
  'email-config.php',
  'email-handler.php',
  'hostinger-config.php',
  'hostinger-test.php',
  'install-database.php',
  'secure-mailer.php',
  'setup-test-users.php',
  'test-connection.php',
  'user-auth.php'
];

const distDir = path.join(__dirname, '..', 'dist');
const serverDir = path.join(distDir, 'Server');

// Create dist/Server directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

if (!fs.existsSync(serverDir)) {
  fs.mkdirSync(serverDir, { recursive: true });
}

/**
 * Copy a file if it exists
 */
function copyFileIfExists(sourcePath, destPath) {
  if (fs.existsSync(sourcePath)) {
    try {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✅ Copied: ${path.basename(sourcePath)}`);
      return true;
    } catch (error) {
      console.error(`❌ Error copying ${path.basename(sourcePath)}:`, error.message);
      return false;
    }
  }
  return false;
}

/**
 * Copy directory recursively
 */
function copyDirectoryRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const files = fs.readdirSync(src);
  
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectoryRecursive(srcPath, destPath);
    } else if (file.endsWith('.php') || file.endsWith('.htaccess')) {
      copyFileIfExists(srcPath, destPath);
    }
  });
}

console.log('🔧 Building PHP backend files...\n');

let copiedCount = 0;

// Copy specific PHP files from various locations
for (const filename of phpFiles) {
  let fileCopied = false;
  
  for (const sourceDir of sourceDirectories) {
    const sourcePath = path.join(__dirname, '..', sourceDir, filename);
    const destPath = path.join(serverDir, filename);
    
    if (copyFileIfExists(sourcePath, destPath)) {
      copiedCount++;
      fileCopied = true;
      break; // Stop looking in other directories once found
    }
  }
  
  if (!fileCopied) {
    console.log(`⚠️  File not found: ${filename}`);
  }
}

// Copy vendor directory if it exists (for Composer dependencies)
const vendorSources = [
  path.join(__dirname, '..', 'deploy', 'Server', 'vendor'),
  path.join(__dirname, '..', 'hostinger-deployment', 'server', 'vendor')
];

for (const vendorSource of vendorSources) {
  if (fs.existsSync(vendorSource)) {
    const vendorDest = path.join(serverDir, 'vendor');
    console.log(`📦 Copying vendor directory...`);
    copyDirectoryRecursive(vendorSource, vendorDest);
    break;
  }
}

// Copy .htaccess file if it exists
const htaccessSources = [
  path.join(__dirname, '..', 'deploy', '.htaccess'),
  path.join(__dirname, '..', 'hostinger-deployment', 'public_html', '.htaccess')
];

for (const htaccessSource of htaccessSources) {
  if (fs.existsSync(htaccessSource)) {
    const htaccessDest = path.join(distDir, '.htaccess');
    copyFileIfExists(htaccessSource, htaccessDest);
    break;
  }
}

// Copy any additional PHP files from hostinger-deployment/public_html
const publicHtmlDir = path.join(__dirname, '..', 'hostinger-deployment', 'public_html');
if (fs.existsSync(publicHtmlDir)) {
  console.log('📁 Copying additional files from hostinger-deployment...');
  const files = fs.readdirSync(publicHtmlDir);
  
  files.forEach(file => {
    if (file.endsWith('.php')) {
      const sourcePath = path.join(publicHtmlDir, file);
      const destPath = path.join(serverDir, file);
      
      if (copyFileIfExists(sourcePath, destPath)) {
        copiedCount++;
      }
    }
  });
}

console.log(`\n✨ Build complete! Copied ${copiedCount} PHP files to dist/Server/`);
console.log(`📂 Output directory: ${serverDir}`);

// Create a simple PHP info file for testing
const phpInfoContent = `<?php
/**
 * Server Information
 * Generated during build process
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

echo json_encode([
    'status' => 'success',
    'message' => 'PHP server is running',
    'php_version' => PHP_VERSION,
    'server_time' => date('Y-m-d H:i:s'),
    'available_endpoints' => [
        '/Server/local-auth-mock.php',
        '/Server/auth-handler.php', 
        '/Server/contact-handler.php',
        '/Server/test-connection.php'
    ]
]);
?>`;

fs.writeFileSync(path.join(serverDir, 'server-info.php'), phpInfoContent);
console.log('📄 Created server-info.php for testing');
