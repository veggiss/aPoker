import React, { FC, useEffect } from 'react';
import useGameState, { SOCKET_EVENT } from './hooks/useGameState';
import { io } from 'socket.io-client';

export const Socket = io();

const App: FC = () => {
    const { gameState } = useGameState();

    useEffect(() => {
        console.table(gameState);
    });

    const draw = () => Socket.emit(SOCKET_EVENT.drawCards);

    return <button onClick={draw}>Draw</button>;
};
export default App;
