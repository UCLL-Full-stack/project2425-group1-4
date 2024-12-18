import MatchService from '@services/MatchService';
import { Match } from '@types';
import React, { useEffect, useState } from 'react';

type LatestMatchesProps = {
    teamId: number;
};

const LatestMatches: React.FC<LatestMatchesProps> = ({ teamId }) => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLatestMatches = async () => {
        try {
            const response = await MatchService.getLatestMatchesByTeamId(teamId);
            const data = await response.json();
            setMatches(data);
        } catch (err) {
            console.error('Error fetching latest matches:', err);
            setError('Failed to load matches');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLatestMatches();
    }, [teamId]);

    if (loading) return <p className="text-gray-600">Loading latest matches...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest Matches</h2>
            {matches.length > 0 ? (
                <ul className="space-y-2">
                    {matches.map((match) => {
                        const team1 = match.teams[0];
                        const team2 = match.teams[1];
                        const team1Score = team1?.goals.length || 0;
                        const team2Score = team2?.goals.length || 0;

                        // Determine color for the current team
                        const currentTeam = team1.team.id === teamId ? team1 : team2;
                        const isCurrentTeamWinning =
                            team1.team.id === teamId
                                ? team1Score >= team2Score
                                : team2Score >= team1Score;

                        const currentTeamColor = isCurrentTeamWinning
                            ? 'text-green-500'
                            : 'text-red-500';

                        return (
                            <li
                                key={match.id}
                                className="flex justify-between p-2 border-b border-gray-200"
                            >
                                <span className="text-gray-700">
                                    <span
                                        className={team1.team.id === teamId ? currentTeamColor : ''}
                                    >
                                        {team1.team.name}
                                    </span>{' '}
                                    vs{' '}
                                    <span
                                        className={team2.team.id === teamId ? currentTeamColor : ''}
                                    >
                                        {team2.team.name}
                                    </span>
                                </span>
                                <span>
                                    <span
                                        className={team1.team.id === teamId ? currentTeamColor : ''}
                                    >
                                        {team1Score}
                                    </span>{' '}
                                    -{' '}
                                    <span
                                        className={team2.team.id === teamId ? currentTeamColor : ''}
                                    >
                                        {team2Score}
                                    </span>
                                </span>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className="text-gray-500">No recent matches available.</p>
            )}
        </div>
    );
};

export default LatestMatches;
