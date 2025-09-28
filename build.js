#!/usr/bin/env node

// Build script to inject environment variables into config.js for Vercel deployment
const fs = require('fs');
const path = require('path');

const configTemplate = `// Environment configuration for Matrix Chatbot Terminal
// This file is auto-generated during build - do not edit manually

window.ENV = {
    N8N_WEBHOOK_URL: '${process.env.N8N_WEBHOOK_URL || ''}',
    // Add other environment variables here as needed
};

// For development, you can override these values
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Development mode detected');
    // Uncomment and set for local development:
    // window.ENV.N8N_WEBHOOK_URL = 'your-local-webhook-url-here';
}`;

// Write the config file
fs.writeFileSync(path.join(__dirname, 'config.js'), configTemplate);
console.log('✅ Environment variables injected into config.js');
console.log('N8N_WEBHOOK_URL:', process.env.N8N_WEBHOOK_URL ? 'Set' : 'Not set');