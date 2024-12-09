import { Match } from '@types';
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
                                <div
                                    key={match.id}
                                    className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
                                >
                                    <p className="font-semibold text-lg text-gray-800">
                                        {match.id}
                                    </p>
                                </div>
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
