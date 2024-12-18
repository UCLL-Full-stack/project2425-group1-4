import { Match } from '@types';
import Link from 'next/link';
import React, { useState } from 'react';

type Props = {
    matches: Array<Match>;
};

const MatchGrid: React.FC<Props> = ({ matches }: Props) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter matches
    const filteredMatches = matches.filter((match) =>
        `${match.id}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {matches && (
                <section className="p-6">
                    <div className="mb-6 flex items-center">
                        <input
                            type="text"
                            placeholder="Search for matches..."
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredMatches.length > 0 ? (
                            filteredMatches.map((match) => (
                                <Link
                                    href={`matches/${match.id}`}
                                    key={match.id}
                                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
                                >
                                    {/* Team Names */}
                                    <div className="flex justify-between w-full text-gray-800 font-semibold text-lg">
                                        <span className="flex-1 text-right pr-4">
                                            {match.teams[0].team.name}
                                        </span>
                                        <span className="text-gray-500 font-normal text-base">
                                            vs
                                        </span>
                                        <span className="flex-1 text-left pl-4">
                                            {match.teams[1].team.name}
                                        </span>
                                    </div>

                                    {/* Score */}
                                    <div className="text-gray-700 font-bold text-xl mt-2">
                                        {match.teams[0].goals.length} -{' '}
                                        {match.teams[1].goals.length}
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-center col-span-full text-gray-500">
                                No matches found.
                            </p>
                        )}
                    </div>
                </section>
            )}
        </>
    );
};

export default MatchGrid;
