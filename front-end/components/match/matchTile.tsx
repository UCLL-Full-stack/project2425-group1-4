import { Match } from '@types';
import router from 'next/router';
import React from 'react';

type MatchTileProps = {
    match: Match;
    teamId: number;
};

const MatchTile: React.FC<MatchTileProps> = ({ match, teamId }) => {
    // Determine the team scores
    const team1Score = match?.teams[0]?.goals.length || 0;
    const team2Score = match?.teams[1]?.goals.length || 0;

    // Determine score colors
    const team1Color =
        team1Score > team2Score
            ? 'text-green-500'
            : team1Score < team2Score
            ? 'text-red-500'
            : 'text-red-500';
    const team2Color =
        team2Score > team1Score
            ? 'text-green-500'
            : team2Score < team1Score
            ? 'text-red-500'
            : 'text-red-500';

    return (
        <div
            className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-md cursor-pointer"
            onClick={() => router.push(`/matches/${match.id}`)}
        >
            <div className="flex items-center justify-between mb-2">
                {/* Team names */}
                <h3 className="text-md font-semibold text-gray-800 truncate w-2/5">
                    {match?.teams[0]?.team.name}
                </h3>
                {/* Score */}
                <div className="text-3xl font-bold text-gray-900 mx-4">
                    <span className={team1Color}>{team1Score}</span>
                    <span className="mx-3">-</span>
                    <span className={team2Color}>{team2Score}</span>
                </div>
                <h3 className="text-md font-semibold text-gray-800 truncate w-2/5 text-right">
                    {match?.teams[1]?.team.name}
                </h3>
            </div>

            {/* Date */}
            <p className="text-xs text-gray-600 text-center">
                {new Date(match?.date).toLocaleDateString()}
            </p>
        </div>
    );
};

export default MatchTile;
