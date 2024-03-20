const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cookieParser = require('cookie-parser');

const app = express();
const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');


const PORT = 3001;

app.use(express.json());
app.use(cookieParser());

// Use the routes
app.use('/api', userRoutes);
app.use('/api', messageRoutes);

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
