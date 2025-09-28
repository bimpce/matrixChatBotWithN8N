# Matrix Chatbot Terminal

A Matrix-themed landing page for your n8n chatbot with a terminal-style interface.

## Features

- 🟢 Matrix-style terminal UI with green text and dark background
- 💬 Real-time chat interface with typewriter effects
- 🌧️ Animated Matrix "digital rain" background
- 📱 Responsive design for mobile and desktop
- 🔗 n8n webhook integration for chatbot communication
- ⚡ Session management and message history
- 🎨 Smooth animations and visual effects
- 🔒 Secure environment variable configuration

## Files Structure
```
matrix-chatbot/
├── index.html          # Main Matrix chatbot interface
├── styles.css          # Matrix terminal styling
├── script.js           # Chat functionality and Matrix effects
├── config.js           # Environment configuration (auto-generated)
├── test-webhook.html   # n8n webhook testing page
├── build.js            # Build script for deployment
├── package.json        # Project configuration
├── vercel.json         # Vercel deployment configuration
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Quick Start

### 1. Local Development

**Clone and setup:**
```bash
git clone <your-repo-url>
cd matrix-chatbot-terminal
```

**Start local server:**
```bash
# Using Node.js (Recommended)
npx http-server -p 8000

# Using Python
python -m http.server 8000

# Using PHP
php -S localhost:8000
```

Then open your browser to:
- **Main Chat Interface**: `http://localhost:8000`
- **Webhook Test Page**: `http://localhost:8000/test-webhook.html`

### 2. Environment Configuration

#### For Local Development:
1. Edit `config.js` and uncomment the development override:
```javascript
// For development, you can override these values
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Development mode detected');
    window.ENV.N8N_WEBHOOK_URL = 'your-n8n-webhook-url-here';
}
```

#### For Production (Vercel):
Set environment variables in your Vercel dashboard:
- `N8N_WEBHOOK_URL`: Your n8n webhook URL

## Deployment

### Deploy to Vercel

1. **Push to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the configuration

3. **Set Environment Variables:**
   - In Vercel dashboard, go to Project Settings → Environment Variables
   - Add: `N8N_WEBHOOK_URL` with your webhook URL
   - Deploy

### Manual Vercel CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel --prod

# Set environment variable
vercel env add N8N_WEBHOOK_URL
```

## n8n Integration Setup

### 1. Create n8n Workflow

Your n8n workflow should include:

1. **Webhook Node**: 
   - Method: GET
   - Receives query parameters: `message`, `timestamp`, `sessionId`

2. **Processing Nodes**: 
   - Add your AI/chatbot logic here
   - Process the incoming message

3. **Response Node**: 
   - Return JSON response in format:
   ```json
   {
     "response": "Your bot response here",
     "timestamp": "2024-01-01T00:00:00.000Z"
   }
   ```

### 2. Configure Webhook URL

**For Local Development:**
- Edit `config.js` and set your webhook URL in the development section

**For Production:**
- Set the `N8N_WEBHOOK_URL` environment variable in Vercel

### 3. Test the Integration

1. Start your local server or deploy to Vercel
2. Open the webhook test page
3. Click "Test n8n Webhook" to verify connectivity
4. Check the main chat interface

## Security Features

✅ **No hardcoded credentials** - All sensitive data uses environment variables  
✅ **Secure deployment** - Webhook URLs are injected at build time  
✅ **Development overrides** - Safe local development configuration  
✅ **Git security** - Sensitive files excluded via .gitignore  

## Troubleshooting

### Common Issues:

1. **"No webhook URL configured" error:**
   - Check environment variable is set correctly
   - For local dev: uncomment and set URL in config.js
   - For production: verify Vercel environment variable

2. **CORS errors:**
   - Ensure your n8n workflow allows cross-origin requests
   - Check n8n webhook node settings

3. **Webhook not responding:**
   - Verify n8n workflow is active
   - Check webhook URL is correct
   - Test webhook directly in n8n

4. **Build failures on Vercel:**
   - Check build.js script runs successfully
   - Verify environment variables are set in Vercel dashboard

## Development

### Project Structure:
- `index.html` - Main chat interface
- `script.js` - Chat functionality and Matrix effects
- `styles.css` - Matrix terminal styling
- `config.js` - Environment configuration (auto-generated)
- `build.js` - Build script for environment injection

### Adding New Environment Variables:
1. Add to `build.js` template
2. Add to `config.js` template
3. Update Vercel environment variables
4. Redeploy

## License

MIT License - feel free to use and modify as needed.