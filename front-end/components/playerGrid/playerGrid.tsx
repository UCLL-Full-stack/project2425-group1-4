import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

type Player = {
    id: number;
    name: string;
    team: string;
};

const playerData: Player[] = [
    { id: 1, name: 'John Doe', team: 'Team A' },
    { id: 2, name: 'Jane Smith', team: 'Team B' },
    { id: 3, name: 'Alex Johnson', team: 'Team C' },
    { id: 4, name: 'Chris Lee', team: 'Team D' },
    { id: 5, name: 'Taylor Brown', team: 'Team E' },
    { id: 6, name: 'Morgan White', team: 'Team F' },
    { id: 7, name: 'Jordan Black', team: 'Team G' },
    { id: 8, name: 'Casey Green', team: 'Team H' },
];

const PlayerGrid: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPlayers = playerData.filter((player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                {/* Navbar */}
                <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
                    <div className="text-xl font-bold">GoalPro</div>
                    <ul className="flex space-x-6">
                        <li>
                            <Link to="/players" className="hover:text-gray-300">
                                Players
                            </Link>
                        </li>
                        <li>
                            <Link to="/teams" className="hover:text-gray-300">
                                Teams
                            </Link>
                        </li>
                        <li>
                            <Link to="/matches" className="hover:text-gray-300">
                                Matches
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className="hover:text-gray-300">
                                [Firstname]
                            </Link>
                        </li>
                    </ul>
                </nav>

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
                                        {player.name}
                                    </p>
                                    <p className="text-gray-600">{player.team}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center col-span-full text-gray-500">
                                No players found.
                            </p>
                        )}
                    </div>
                </section>
            </div>
        </Router>
    );
};

export default PlayerGrid;
