// pages/players.tsx
import PlayerGrid from '@components/playerGrid/playerGrid';
import React from 'react';

const PlayersPage: React.FC = () => {
    return (
        <div>
            <PlayerGrid players={[]} />
        </div>
    );
};

export default PlayersPage;
