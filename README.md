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

## Setup Instructions

### 1. Files Structure
```
matrix-chatbot/
├── index.html          # Main Matrix chatbot interface
├── styles.css          # Matrix terminal styling
├── script.js           # Chat functionality and Matrix effects
├── test-webhook.html   # n8n webhook testing page
└── README.md           # This file
```

### 2. Local Development Server

**Using Node.js (Recommended):**
```bash
npx http-server -p 8000
```

**Using Python (if available):**
```bash
python -m http.server 8000
# or
python3 -m http.server 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open your browser to:
- **Main Chat Interface**: `http://localhost:8000`
- **Webhook Test Page**: `http://localhost:8000/test-webhook.html`

### 3. n8n Integration Setup

#### Your Current Configuration:
- **Webhook URL**: `https://primary-production-0556.up.railway.app/webhook/0f4c8c49-25b2-48b4-b781-a86ff354d504`
- **Method**: GET (with query parameters)
- **Status**: ✅ Already configured in the code

#### Testing the Integration:
1. Start your local server (see step 2 above)
2. Open `http://localhost:8000/test-webhook.html`
3. Click "Test n8n Webhook" to verify connectivity
4. If successful, open `http://localhost:8000` for the main chat interface

#### n8n Workflow Structure
Your n8n workflow should handle the incoming webhook data:

**Expected Input Format:**
```json
{
  "message": "User's message text",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "sessionId": "session_1234567890_abcdef123"
}
```

**Expected Response Format:**
```json
{
  "message": "Bot's response text"
}
```

### 3. Example n8n Workflow

1. **Webhook Node**: Receives the POST request
2. **Function Node**: Process the user message
3. **HTTP Request Node**: Call your AI service (OpenAI, etc.)
4. **Respond to Webhook Node**: Send response back to the chat

### 4. Local Development

To run locally, you can use any web server. For example:

**Using Python:**
```bash
python -m http.server 8000
```

**Using Node.js (http-server):**
```bash
npx http-server
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### 5. Deployment

You can deploy this to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any web server

## Customization

### Changing Colors
Modify the CSS variables in `styles.css`:
```css
/* Change from green to blue Matrix theme */
color: #00ffff; /* Cyan instead of green */
border-color: #00ffff;
text-shadow: 0 0 10px #00ffff;
```

### Adding Custom Messages
Modify the `getFallbackResponse()` function in `script.js` to add your own fallback messages.

### Styling the Chat
All chat styling can be customized in the `styles.css` file. Look for these classes:
- `.user-message` - User messages
- `.bot-message` - Bot responses
- `.system-message` - System notifications

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Responsive design included

## Security Notes

- Always use HTTPS for production deployments
- Validate and sanitize user inputs in your n8n workflow
- Consider implementing rate limiting
- Store sensitive configuration in environment variables

## Troubleshooting

### Chat not connecting to n8n
1. Check the webhook URL is correct
2. Verify n8n workflow is active
3. Check browser console for errors
4. Ensure CORS is properly configured in n8n

### Matrix rain not showing
1. Check if canvas is supported in your browser
2. Verify JavaScript is enabled
3. Check for console errors

### Styling issues
1. Ensure all CSS files are loaded
2. Check for conflicting styles
3. Verify font loading (Courier New)

## License

This project is open source and available under the MIT License.