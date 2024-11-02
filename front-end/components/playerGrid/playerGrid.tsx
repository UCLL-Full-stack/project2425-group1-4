import { User } from '@types';
import React, { useState } from 'react';

type Props = {
    players: Array<User>;
};

const PlayerGrid: React.FC<Props> = ({ players }: Props) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter players
    const filteredPlayers = players.filter((player) =>
        `${player.firstName} ${player.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {players && (
                <section className="p-6">
                    <div className="mb-6 flex items-center">
                        <input
                            type="text"
                            placeholder="Search for players..."
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredPlayers.length > 0 ? (
                            filteredPlayers.map((player) => (
                                <div
                                    key={player.id}
                                    className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
                                >
                                    <p className="font-semibold text-lg text-gray-800">
                                        {player.firstName} {player.lastName}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center col-span-full text-gray-500">
                                No players found.
                            </p>
                        )}
                    </div>
                </section>
            )}
        </>
    );
};

export default PlayerGrid;