import PlayerGrid from '@components/playerGrid/playerGrid';
import UserService from '@services/UserService';
import { User } from '@types';
import React, { useEffect, useState } from 'react';

const PlayersPage: React.FC = () => {
    const [players, setPlayers] = useState<User[]>([]);

    const fetchPlayers = async () => {
        const [playersResponse] = await Promise.all([UserService.getAllPlayers()]);
        const [players] = await Promise.all([playersResponse.json()]);
        setPlayers(players);
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    return (
        <div>
            <PlayerGrid players={players} />
        </div>
    );
};

export default PlayersPage;
