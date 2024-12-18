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

    // Determine which team is the current team
    const isTeam1 = match?.teams[0]?.team.id === teamId;

    // Set colors for the current team's score
    const getScoreColor = (score: number, otherScore: number, isCurrentTeam: boolean) => {
        if (score === otherScore) return ''; // Equal score: no color
        if (isCurrentTeam) return score > otherScore ? 'text-green-500' : 'text-red-500';
        return '';
    };

    const team1Color = getScoreColor(team1Score, team2Score, isTeam1);
    const team2Color = getScoreColor(team2Score, team1Score, !isTeam1);

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
