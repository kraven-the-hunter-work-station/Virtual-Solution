#!/usr/bin/env node

/**
 * Virtual Solutions Path - Hostinger Deployment Script
 * 
 * This script prepares your React app for deployment to Hostinger
 * - Builds the React app
 * - Copies PHP files to the appropriate location
 * - Configures the correct paths
 */

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

// Configuration
const config = {
  buildCommand: 'npm run build',
  buildOutputDir: 'dist',
  deployDir: 'deploy',
  phpSourceDir: path.join('hostinger-deployment', 'public_html'),
  phpTargetDir: path.join('deploy', 'api'),
};

// Create colored log functions
const log = {
  info: (msg) => console.log(chalk.blue('INFO: ') + msg),
  success: (msg) => console.log(chalk.green('SUCCESS: ') + msg),
  warn: (msg) => console.log(chalk.yellow('WARNING: ') + msg),
  error: (msg) => console.log(chalk.red('ERROR: ') + msg),
};

// Clean the deploy directory
function cleanDeployDir() {
  log.info('Cleaning deploy directory...');
  
  if (fs.existsSync(config.deployDir)) {
    fs.removeSync(config.deployDir);
  }
  
  fs.mkdirSync(config.deployDir);
  fs.mkdirSync(config.phpTargetDir, { recursive: true });
  
  log.success('Deploy directory cleaned');
}

// Build the React app
function buildReactApp() {
  log.info('Building React application...');
  
  try {
    execSync(config.buildCommand, { stdio: 'inherit' });
    log.success('React build completed');
  } catch (error) {
    log.error('Failed to build React application');
    process.exit(1);
  }
}

// Copy build files to deploy directory
function copyBuildFiles() {
  log.info(`Copying build files from '${config.buildOutputDir}' to '${config.deployDir}'...`);
  
  try {
    fs.copySync(config.buildOutputDir, config.deployDir);
    log.success('Build files copied to deploy directory');
  } catch (error) {
    log.error(`Failed to copy build files: ${error.message}`);
    process.exit(1);
  }
}

// Copy PHP files to deploy directory
function copyPhpFiles() {
  log.info(`Copying PHP files from '${config.phpSourceDir}' to '${config.phpTargetDir}'...`);
  
  try {
    // Copy PHP files from the source to the API target directory
    const files = fs.readdirSync(config.phpSourceDir);
    
    for (const file of files) {
      if (file.endsWith('.php')) {
        fs.copySync(
          path.join(config.phpSourceDir, file), 
          path.join(config.phpTargetDir, file)
        );
      }
    }
    
    log.success('PHP files copied to deploy directory');
  } catch (error) {
    log.error(`Failed to copy PHP files: ${error.message}`);
    process.exit(1);
  }
}

// Create .htaccess file
function createHtaccess() {
  log.info('Creating .htaccess file...');
  
  const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Handle API requests
  RewriteRule ^api/(.*)$ api/$1 [L]
  
  # Don't rewrite files or directories
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  
  # Rewrite everything else to index.html for React Router
  RewriteRule ^ index.html [L]
</IfModule>

# Allow CORS for API endpoints
<IfModule mod_headers.c>
  <FilesMatch "^api/.*\\.php$">
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "POST, GET, OPTIONS, PUT, DELETE"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
  </FilesMatch>
</IfModule>`;

  try {
    fs.writeFileSync(path.join(config.deployDir, '.htaccess'), htaccessContent);
    log.success('.htaccess file created');
  } catch (error) {
    log.error(`Failed to create .htaccess file: ${error.message}`);
    process.exit(1);
  }
}

// Main function
function main() {
  log.info('Starting Hostinger deployment preparation...');
  
  cleanDeployDir();
  buildReactApp();
  copyBuildFiles();
  copyPhpFiles();
  createHtaccess();
  
  log.success('Deployment preparation completed!');
  log.info(`Your application is ready to be deployed from the '${config.deployDir}' directory.`);
  log.info('Follow the instructions in HOSTINGER-DEPLOYMENT.md to complete the deployment.');
}

// Run the main function
main();
