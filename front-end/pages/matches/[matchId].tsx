import GoalService from '@services/GoalService';
import MatchService from '@services/MatchService';
import { useRouter } from 'next/router';
import useSWR from 'swr';

type GoalWithDetails = {
    id: number;
    time: number;
    player: { firstName: string; lastName: string } | null;
    team: { id: number; name: string } | null;
};

const MatchPage = () => {
    const router = useRouter();
    const { matchId } = router.query;

    const fetchMatch = async () => {
        const response = await MatchService.getMatchById(matchId as string);
        if (!response.ok) throw new Error('Failed to fetch match data');
        console.log(`fetchMatch response: `+  response);
        return await response.json();
    };

    const fetchGoals = async (): Promise<GoalWithDetails[]> => {
        const response = await GoalService.getGoalsWithDetails(Number(matchId));
        console.log(`fetchGoals response: `+  response);

        if (!response.ok) throw new Error('Failed to fetch goals');
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    };

    const {
        data: match,
        error: matchError,
        isLoading: matchLoading,
    } = useSWR(matchId ? `match/${matchId}` : null, fetchMatch);

    const {
        data: goals,
        error: goalsError,
        isLoading: goalsLoading,
    } = useSWR<GoalWithDetails[]>(matchId ? `goals/${matchId}` : null, fetchGoals);

    if (matchError || goalsError)
        return <p className="text-red-600">Error: {matchError?.message || goalsError?.message}</p>;
    if (matchLoading || goalsLoading || !match || !goals) return <p>Loading...</p>;

    const teamScores = {
        teamAScore: goals.filter((goal) => goal.team?.id === match.teams[0]?.id).length,
        teamBScore: goals.filter((goal) => goal.team?.id === match.teams[1]?.id).length,
    };

    return (
        <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800">Match Details</h1>

            <div className="flex flex-col lg:flex-row max-w-6xl w-full gap-8 mt-6">
                <div className="flex flex-col lg:w-2/3 gap-6">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Match ID</h2>
                        <p className="text-gray-600">{match.id}</p>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Teams</h2>
                        <p className="text-gray-600">
                            {match.teams[0]?.name} vs {match.teams[1]?.name}
                        </p>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Score</h2>
                        <p className="text-gray-600">
                            {teamScores.teamAScore} - {teamScores.teamBScore}
                        </p>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Location</h2>
                        <p className="text-gray-600">{match.location.city}</p>
                    </div>
                </div>

                <div className="lg:w-1/3">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Date & Time</h2>
                        <p className="text-gray-600">{new Date(match.date).toLocaleString()}</p>
                    </div>
                    <ul>
                        {goals.map((goal) => (
                            <li key={goal.id}>
                                {goal.time}' - {goal.player?.firstName || 'Unknown'}{' '}
                                {goal.player?.lastName || ''} ({goal.team?.name || 'Unknown Team'})
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MatchPage;
