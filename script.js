const socket = io('http://localhost:3001'); // Ensure this is correct
const messageContainer = document.getElementById("message-container");
const messageform = document.getElementById("send-container");
const messageInput = document.getElementById('message-input');

const name = prompt("What is your name?");
appendMessage("You joined");
socket.emit('new-user', name);

socket.on('Qt-message', data => {
    console.log('Received message:', data); // Debug log
    appendMessage(`${data.name}: ${data.message}`); // Use template literals correctly
});

socket.on('user-connected', name => {
    appendMessage(`${name} connected`);
});

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`);
});

messageform.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value; // Corrected to get value
    console.log('Sending message:', message); // Debug log
    appendMessage(`You: ${message}`);
    socket.emit('send-Qt-message', message);
    messageInput.value = ''; // Clear input after sending
});

function appendMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}

