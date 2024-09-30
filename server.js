const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the public directory
app.use(express.static(__dirname)); // Serve files in the current directory (index.html, etc.)

const PORT = process.env.PORT || 3001;

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Handle incoming messages
    socket.on('send-Qt-message', (message) => {
        io.emit('Qt-message', { name: socket.id, message }); // Emit the message to all clients
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});



