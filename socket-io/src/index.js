const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

connectedClients = {};

app.use(express.json());
// app.use((req, res, next) => {
//     req.io = io;
//     req.connectedClients = connectedClients;

//     next();
// });

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/push', function(req, res) {
    return res.json(Object.keys(connectedClients));
});

app.get('/push/:id', function (req, res) {
    const { id } = req.params;
    const { message } = req.query;

    const socket = connectedClients[id];
    console.log(`Connected: ${socket}, send message: ${message}`);
    if (socket) {
        socket.emit('chat message', message);
        return res.status(201).send();
    }
    return res.status(404).send();
});

io.on('connection', function (socket) {
    connectedClients[socket.id] = socket;
    console.log(`User connected: ${socket.id}`);

    socket.on('disconnect', function () {
        delete connectedClients[socket.id];
        console.log(`User disconnected: ${socket.id}`);
    });

    socket.on('chat message', function ({ message }) {
        console.log('message: ' + message);
        io.emit('chat message', message);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});