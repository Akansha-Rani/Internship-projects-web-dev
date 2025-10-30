// Sample data
const contacts = [
    { id: 1, name: 'AI Assistant', avatar: 'AI', lastMessage: 'How can I help you today?', time: '2m ago', unread: 2 },
    { id: 2, name: 'Sarah Wilson', avatar: 'SW', lastMessage: 'See you tomorrow!', time: '1h ago', unread: 0 },
    { id: 3, name: 'Mike Johnson', avatar: 'MJ', lastMessage: 'Thanks for the update', time: '3h ago', unread: 0 },
    { id: 4, name: 'Tech Team', avatar: 'TT', lastMessage: 'Meeting at 3 PM', time: '5h ago', unread: 5 },
    { id: 5, name: 'Emma Davis', avatar: 'ED', lastMessage: 'Check the latest design', time: '1d ago', unread: 0 }
];

let currentChatId = null;
let messages = {};

// Initialize messages for each contact
contacts.forEach(contact => {
    messages[contact.id] = [];
});

// Add initial messages for AI Assistant
messages = [
    { id: 1, text: 'Hello! How can I help you today?', sent: false, time: '10:30 AM' },
    { id: 2, text: 'Hi! I need some help with my project', sent: true, time: '10:31 AM' },
    { id: 3, text: 'I\'d be happy to help! What kind of project are you working on?', sent: false, time: '10:31 AM' }
];

// DOM Elements
const chatList = document.getElementById('chatList');
const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const currentChatName = document.getElementById('currentChatName');
const searchInput = document.getElementById('searchInput');
const newChatBtn = document.getElementById('newChatBtn');
const typingIndicator = document.getElementById('typingIndicator');

// Render chat list
function renderChatList(filter = '') {
    chatList.innerHTML = '';
    
    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    
    filteredContacts.forEach(contact => {
        const chatItem = document.createElement('div');
        chatItem.className = `chat-item ${currentChatId === contact.id ? 'active' : ''}`;
        chatItem.onclick = () => openChat(contact.id);
        
        chatItem.innerHTML = `
            <div class="avatar">${contact.avatar}</div>
            <div class="chat-item-info">
                <div class="chat-item-header">
                    <span class="chat-item-name">${contact.name}</span>
                    <span class="chat-item-time">${contact.time}</span>
                </div>
                <div class="chat-item-preview">${contact.lastMessage}</div>
            </div>
            ${contact.unread > 0 ? `<span class="unread-badge">${contact.unread}</span>` : ''}
        `;
        
        chatList.appendChild(chatItem);
    });
}

// Open chat
function openChat(chatId) {
    currentChatId = chatId;
    const contact = contacts.find(c => c.id === chatId);
    
    currentChatName.textContent = contact.name;
    contact.unread = 0;
    
    renderMessages();
    renderChatList();
}

// Render messages
function renderMessages() {
    messagesContainer.innerHTML = '';
    
    if (!currentChatId) {
        messagesContainer.innerHTML = `
            <div class="welcome-message">
                <h2>👋 Welcome to Chat App</h2>
                <p>Select a chat from the sidebar or start a new conversation</p>
            </div>
        `;
        return;
    }
    
    const chatMessages = messages[currentChatId] || [];
    const contact = contacts.find(c => c.id === currentChatId);
    
    chatMessages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.sent ? 'sent' : 'received'}`;
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${message.sent ? 'JD' : contact.avatar}</div>
            <div class="message-content">
                <div class="message-bubble">${message.text}</div>
                <div class="message-time">${message.time}</div>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
    });
    
    scrollToBottom();
}

// Send message
function sendMessage() {
    const text = messageInput.value.trim();
    
    if (!text || !currentChatId) return;
    
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    const newMessage = {
        id: Date.now(),
        text: text,
        sent: true,
        time: time
    };
    
    messages[currentChatId].push(newMessage);
    
    // Update last message in contact list
    const contact = contacts.find(c => c.id === currentChatId);
    contact.lastMessage = text;
    contact.time = 'Just now';
    
    messageInput.value = '';
    renderMessages();
    renderChatList();
    
    // Simulate response for AI Assistant
    if (currentChatId === 1) {
        simulateTyping();
        setTimeout(() => {
            const responses = [
                "That's interesting! Tell me more.",
                "I understand. Let me help you with that.",
                "Great question! Here's what I think...",
                "I can definitely assist with that.",
                "That sounds like a good idea!"
            ];
            
            const response = {
                id: Date.now(),
                text: responses[Math.floor(Math.random() * responses.length)],
                sent: false,
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            };
            
            messages[currentChatId].push(response);
            contact.lastMessage = response.text;
            typingIndicator.textContent = '';
            renderMessages();
            renderChatList();
        }, 2000);
    }
}

// Simulate typing indicator
function simulateTyping() {
    typingIndicator.textContent = 'typing...';
}

// Scroll to bottom
function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Event listeners
sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

searchInput.addEventListener('input', (e) => {
    renderChatList(e.target.value);
});

newChatBtn.addEventListener('click', () => {
    alert('New chat feature coming soon!');
});

// Initialize
renderChatList();
