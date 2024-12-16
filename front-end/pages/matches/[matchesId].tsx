import MatchService from '@services/MatchService';
import { Match } from '@types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const MatchPage = () => {
    const router = useRouter();
    const { matchId } = router.query;

    const [match, setMatch] = useState<Match | null>(null);

    const getMatchById = async (matchId: string) => {
        try {
            const matchResponse = await MatchService.getMatchById(matchId);
            const matchData = await matchResponse.json();
            setMatch(matchData);
        } catch (error) {
            console.error('Error fetching match data:', error);
        }
    };

    useEffect(() => {
        if (matchId) {
            getMatchById(matchId as string);
        }
    }, [matchId]);

    if (!match) return <p>Loading...</p>;

    return (
        <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800">Match Details</h1>

            <div className="flex flex-col lg:flex-row max-w-6xl w-full gap-8 mt-6">
                {/* Match Info */}
                <div className="flex flex-col lg:w-2/3 gap-6">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Match ID</h2>
                        <p className="text-gray-600">{match.id}</p>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Teams</h2>
                        <p className="text-gray-600">
                            {match.teamA} vs {match.teamB}
                        </p>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Score</h2>
                        <p className="text-gray-600">
                            {match.teamAScore} - {match.teamBScore}
                        </p>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Status</h2>
                        <p className="text-gray-600">{match.status}</p>
                    </div>
                </div>

                {/* Additional Match Info */}
                <div className="lg:w-1/3">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Date & Time</h2>
                        <p className="text-gray-600">{new Date(match.date).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchPage;
