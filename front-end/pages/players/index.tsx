import PlayerGrid from '@components/playerGrid/playerGrid';
import { User } from '@types';
import React, { useEffect, useState } from 'react';

const PlayersPage: React.FC = () => {
    const [players, setPlayers] = useState<User[]>([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch('http://localhost:3000/users/players');
                const data = await response.json();
                setPlayers(data);
            } catch (error) {
                console.error('Failed to fetch players', error);
            }
        };

        fetchPlayers();
    }, []);

    return (
        <div>
            <PlayerGrid players={players} />
        </div>
    );
};

export default PlayersPage;
