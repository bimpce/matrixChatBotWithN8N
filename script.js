// Matrix Chatbot Terminal JavaScript

class MatrixChatbot {
    constructor() {
        this.messageCount = 0;
        this.isTyping = false;
        this.n8nWebhookUrl = ''; // You'll need to set this to your n8n webhook URL
        
        this.initializeElements();
        this.setupEventListeners();
        this.initializeMatrixRain();
        this.startTime = new Date();
        this.updateTimestamps();
    }

    initializeElements() {
        this.chatMessages = document.getElementById('chat-messages');
        this.messageInput = document.getElementById('message-input');
        this.sendButton = document.getElementById('send-button');
        this.messageCountElement = document.getElementById('message-count');
        this.canvas = document.getElementById('matrix-canvas');
        this.ctx = this.canvas.getContext('2d');

        // Debug: Check if elements were found
        console.log('Elements initialized:');
        console.log('chatMessages:', this.chatMessages);
        console.log('messageInput:', this.messageInput);
        console.log('sendButton:', this.sendButton);
        console.log('canvas:', this.canvas);
    }

    setupEventListeners() {
        // Send message on button click
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Send message on Enter key press
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize canvas
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Focus input on page load
        this.messageInput.focus();
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message || this.isTyping) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        this.messageInput.value = '';
        this.messageCount++;
        this.updateMessageCount();

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Send to n8n webhook
            console.log('Sending message to n8n:', message);
            const response = await this.sendToN8n(message);
            console.log('Received response from n8n:', response);

            // Remove typing indicator
            this.hideTypingIndicator();

            // Add bot response - handle n8n response format
            if (response && response.text) {
                // Direct object format: {"text": "response"}
                console.log('Using direct text format response:', response.text);
                console.log('About to call addMessage with:', response.text, 'bot');
                this.addMessage(response.text, 'bot');
                console.log('addMessage called successfully');
            } else if (response && Array.isArray(response) && response.length > 0 && response[0].text) {
                // Array format: [{"text": "response"}]
                console.log('Using array format response:', response[0].text);
                this.addMessage(response[0].text, 'bot');
            } else if (response && response.message) {
                // Fallback for other response formats
                console.log('Using message format response:', response.message);
                this.addMessage(response.message, 'bot');
            } else {
                // Fallback response if n8n response is unexpected
                console.log('Using fallback response, unexpected format:', response);
                this.addMessage(this.getFallbackResponse(message), 'bot');
            }
        } catch (error) {
            console.error('Error sending message to n8n:', error);
            this.hideTypingIndicator();
            this.addMessage('Connection error. Please check your n8n configuration.', 'system');
        }
    }

    async sendToN8n(message) {
        if (!this.n8nWebhookUrl) {
            throw new Error('n8n webhook URL not configured');
        }

        // Since your webhook is GET, we'll send data as query parameters
        const params = new URLSearchParams({
            message: message,
            timestamp: new Date().toISOString(),
            sessionId: this.getSessionId()
        });

        const fullUrl = `${this.n8nWebhookUrl}?${params.toString()}`;
        console.log('Making request to:', fullUrl);

        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonResponse = await response.json();
        console.log('Parsed JSON response:', jsonResponse);
        return jsonResponse;
    }

    getFallbackResponse(userMessage) {
        const responses = [
            "I'm processing your request through the Matrix...",
            "Neural pathways activated. Analyzing your input...",
            "Connection to the mainframe established. Please wait...",
            "Decrypting your message through quantum channels...",
            "The Oracle is consulting the source code...",
            "Routing through secure Matrix protocols...",
            "Your request has been logged in the system archives...",
            "Initiating response sequence from the machine city..."
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    addMessage(text, type) {
        console.log('addMessage called with:', text, type);
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        console.log('Created messageDiv with class:', messageDiv.className);

        const timestamp = this.getCurrentTimestamp();
        const timestampSpan = document.createElement('span');
        timestampSpan.className = 'timestamp';
        timestampSpan.textContent = `[${timestamp}]`;

        const messageText = document.createElement('span');
        messageText.className = 'message-text';

        if (type === 'bot') {
            // Typewriter effect for bot messages
            console.log('Starting typewriter effect for bot message');
            this.typewriterEffect(messageText, text);
        } else {
            messageText.textContent = text;
        }

        messageDiv.appendChild(timestampSpan);
        messageDiv.appendChild(messageText);

        console.log('About to append messageDiv to chatMessages');
        this.chatMessages.appendChild(messageDiv);
        console.log('Message appended successfully');
        this.scrollToBottom();
    }

    typewriterEffect(element, text) {
        let i = 0;
        const speed = 30; // Typing speed in milliseconds
        
        const typeChar = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, speed);
            }
        };
        
        typeChar();
    }

    showTypingIndicator() {
        this.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        const timestamp = this.getCurrentTimestamp();
        const timestampSpan = document.createElement('span');
        timestampSpan.className = 'timestamp';
        timestampSpan.textContent = `[${timestamp}]`;
        
        const messageText = document.createElement('span');
        messageText.className = 'message-text';
        messageText.innerHTML = 'Agent is typing<span class="loading">...</span>';
        
        typingDiv.appendChild(timestampSpan);
        typingDiv.appendChild(messageText);
        
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    getCurrentTimestamp() {
        const now = new Date();
        const elapsed = Math.floor((now - this.startTime) / 1000);
        const hours = Math.floor(elapsed / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((elapsed % 3600) / 60).toString().padStart(2, '0');
        const seconds = (elapsed % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    updateTimestamps() {
        // Update existing timestamps every second
        setInterval(() => {
            const timestamps = document.querySelectorAll('.timestamp');
            timestamps.forEach((timestamp, index) => {
                if (index < 2) { // Don't update the initial system messages
                    return;
                }
                // You could implement dynamic timestamp updates here if needed
            });
        }, 1000);
    }

    updateMessageCount() {
        this.messageCountElement.textContent = `Messages: ${this.messageCount}`;
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    getSessionId() {
        // Generate or retrieve session ID for n8n
        let sessionId = localStorage.getItem('matrix-chat-session');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('matrix-chat-session', sessionId);
        }
        return sessionId;
    }

    // Matrix Rain Effect
    initializeMatrixRain() {
        this.resizeCanvas();
        
        // Japanese katakana and hiragana characters mixed with numbers and symbols
        const matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const charArray = matrixChars.split("");
        
        const fontSize = 18;
        const columns = Math.floor(this.canvas.width / fontSize);
        
        // Initialize drops array with random starting positions and speeds
        const drops = [];
        const dropSpeeds = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * -100);
            dropSpeeds[i] = Math.random() * 0.5 + 0.5; // Random speed between 0.5 and 1
        }
        
        const draw = () => {
            // Create trailing effect with semi-transparent black
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.ctx.font = `${fontSize}px Courier New`;
            
            for (let i = 0; i < drops.length; i++) {
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                
                // Create gradient effect - brightest at the head, fading down
                const trailLength = Math.floor(Math.random() * 15) + 10; // Variable trail length
                
                for (let j = 0; j < trailLength; j++) {
                    const trailY = y - (j * fontSize);
                    if (trailY > -fontSize && trailY < this.canvas.height + fontSize) {
                        // Calculate opacity based on position in trail
                        const opacity = Math.max(0, (trailLength - j) / trailLength);
                        
                        // Create the authentic Matrix color gradient
                        if (j === 0) {
                            // Head of the trail - bright white
                            this.ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(opacity * 1.2, 1)})`;
                            this.ctx.shadowColor = '#ffffff';
                            this.ctx.shadowBlur = 8;
                        } else if (j < 2) {
                            // Very bright green with slight glow
                            this.ctx.fillStyle = `rgba(200, 255, 200, ${opacity})`;
                            this.ctx.shadowColor = '#00ff00';
                            this.ctx.shadowBlur = 4;
                        } else if (j < 6) {
                            // Bright green
                            this.ctx.fillStyle = `rgba(100, 255, 100, ${opacity})`;
                            this.ctx.shadowColor = '#00ff00';
                            this.ctx.shadowBlur = 2;
                        } else if (j < 12) {
                            // Medium green
                            this.ctx.fillStyle = `rgba(0, 255, 0, ${opacity * 0.9})`;
                            this.ctx.shadowBlur = 0;
                        } else {
                            // Dark green
                            this.ctx.fillStyle = `rgba(0, 180, 0, ${opacity * 0.7})`;
                            this.ctx.shadowBlur = 0;
                        }
                        
                        // Draw character for this trail position
                        const trailChar = charArray[Math.floor(Math.random() * charArray.length)];
                        this.ctx.fillText(trailChar, x, trailY);
                        
                        // Reset shadow for next character
                        this.ctx.shadowBlur = 0;
                    }
                }
                
                // Move drop down with individual speed
                drops[i] += dropSpeeds[i];
                
                // Reset drop when it goes off screen with some randomness
                if (drops[i] * fontSize > this.canvas.height + Math.random() * 5000) {
                    drops[i] = Math.floor(Math.random() * -50);
                    dropSpeeds[i] = Math.random() * 0.5 + 0.5; // New random speed
                }
            }
        };
        
        // Smooth animation
        setInterval(draw, 40);
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // Method to configure n8n webhook URL
    setN8nWebhookUrl(url) {
        this.n8nWebhookUrl = url;
        console.log('n8n webhook URL configured:', url ? 'URL set' : 'No URL provided');
    }
}

 // Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.matrixChatbot = new MatrixChatbot();

    // Configure n8n webhook URL from environment variable
    const webhookUrl = window.ENV?.N8N_WEBHOOK_URL || '';
    if (webhookUrl) {
        window.matrixChatbot.setN8nWebhookUrl(webhookUrl);
        console.log('Matrix Chatbot Terminal initialized with webhook');
    } else {
        console.warn('No webhook URL configured. Set N8N_WEBHOOK_URL environment variable.');
        console.log('Matrix Chatbot Terminal initialized without webhook');
    }

    // Test function to verify addMessage works
    window.testAddMessage = function() {
        console.log('Testing addMessage function...');
        window.matrixChatbot.addMessage('This is a test bot message', 'bot');
        console.log('Test message added');
    };

    // Add test message after 2 seconds
    setTimeout(() => {
        console.log('Adding test message automatically...');
        window.matrixChatbot.addMessage('System test: Bot message display working!', 'bot');
    }, 2000);
});