import { useEffect, useState } from 'react';
import { Socket } from '../App';

export const SOCKET_EVENT = {
    joinTable: 'join-table',
    connection: 'connection',
    disconnect: 'disconnect',
    gameState: 'game-state',
    drawCards: 'draw-cards',
};

type GameState = {
    roomId: string;
    dealer: {
        cards: string[];
        round: number;
        roundEnded: boolean;
    };
};

const useGameState = () => {
    const [gameState, setGameState] = useState<GameState>(null);

    useEffect(() => {
        Socket.emit(SOCKET_EVENT.joinTable);

        Socket.on(SOCKET_EVENT.gameState, (state: GameState) => {
            setGameState(state);
        });
    }, []);

    return { gameState };
};

export default useGameState;
