// Environment configuration for Matrix Chatbot Terminal
// This file is auto-generated during build - do not edit manually

window.ENV = {
    N8N_WEBHOOK_URL: 'test-url ',
    // Add other environment variables here as needed
};

// For development, you can override these values
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Development mode detected');
    // Uncomment and set for local development:
    // window.ENV.N8N_WEBHOOK_URL = 'your-local-webhook-url-here';
}