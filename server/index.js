const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const { Game } = require('./game');
const io = new Server(server);

const PORT = process.env.PORT || 8080;
const DIST_DIR = path.join(__dirname, '..', 'build');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const SOCKET_EVENT = {
    joinTable: 'join-table',
    connection: 'connection',
    disconnect: 'disconnect',
    gameState: 'game-state',
    drawCards: 'draw-cards',
};

const games = {};

app.use(express.json());
app.use(express.static('build'));

const emitGameState = (game) => io.in(game.roomId).emit(SOCKET_EVENT.gameState, game.gameState);
const pushGame = (game) => (games[game.roomId] = game);

app.all('*', (req, res) => {
    res.sendFile(HTML_FILE, (err) => {
        if (err) res.status(500).send(err);
    });
});

io.on(SOCKET_EVENT.connection, (socket) => {
    socket.on(SOCKET_EVENT.joinTable, () => {
        const clientId = socket.client.id;
        let game = games[clientId];

        if (!game) {
            game = new Game(clientId);

            pushGame(game);
        }

        socket.join(game.roomId);
        emitGameState(game);
    });

    socket.on(SOCKET_EVENT.disconnect, () => {
        const clientId = socket.client.id;
        const game = games[clientId];

        if (game) delete games[clientId];
    });

    socket.on(SOCKET_EVENT.drawCards, () => {
        const clientId = socket.client.id;
        const game = games[clientId];

        if (game) {
            game.update();

            emitGameState(game);
        }
    });
});

server.listen(PORT, () => console.log(`The app server is running on port: ${PORT}`));
