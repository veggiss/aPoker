import React, { FC } from 'react';
import useGameState, { SOCKET_EVENT } from './hooks/useGameState';
import { io } from 'socket.io-client';
import { Box, Button, Typography } from '@mui/material';
import PlayingCard from './components/Card';

export const Socket = io();

const containerStyle = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
};

const itemStyle = { display: 'flex', alignItems: 'center', m: 3 };

const App: FC = () => {
    const { gameState } = useGameState();

    const cards = gameState?.dealer.cards || [];
    const result = gameState?.dealer.result;

    const draw = () => Socket.emit(SOCKET_EVENT.drawCards);

    return (
        <Box sx={containerStyle}>
            <Box sx={itemStyle} flexGrow={1}>
                {cards.map((value) => (
                    <PlayingCard key={value} value={value} />
                ))}
            </Box>

            <Box sx={itemStyle}>
                <Typography variant="h3">{result ? `You got ${result}!` : <>&nbsp;</>}</Typography>
            </Box>

            <Box sx={itemStyle}>
                <Button variant="contained" size="large" onClick={draw}>
                    Draw
                </Button>
            </Box>
        </Box>
    );
};
export default App;
