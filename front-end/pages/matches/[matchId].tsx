import Header from '@components/header/header';
import GoalService from '@services/GoalService';
import MatchService from '@services/MatchService';
import { Match, UserStorage } from '@types';
import { TrashIcon } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const MatchPage = () => {
    const router = useRouter();
    const { matchId } = router.query;
    const { t } = useTranslation();
    const [loggedInUser, setLoggedInUser] = useState<UserStorage | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            setLoggedInUser(JSON.parse(storedUser));
        }
    }, []);


    const fetchMatch = async (matchId: number) => {
        const response = await MatchService.getMatchById(matchId);
        if (!response.ok) {
            const errorMessage =
                response.status === 401 ? t('permissions.unauthorized') : response.statusText;
            throw new Error(errorMessage);
        }
        return response.json();
    };

    const {
        data: match,
        isLoading,
        error,
        mutate,
    } = useSWR<Match>(matchId ? `fetchMatch-${matchId}` : null, () => fetchMatch(Number(matchId)), {
        refreshInterval: 10000,
    });

    const deleteGoal = async (goalId: number) => {
        try {
            await GoalService.deleteGoalById(goalId);
            mutate(); // Refresh the match data after deletion
        } catch (err) {
            console.error('Failed to delete goal:', err);
            alert(t('errors.deleteGoalFailed'));
        }
    };

    const getTeamColor = (teamIndex: number) => {
        if (!match) return 'bg-gray-100'; // Default color

        const team1Goals = match.teams[0]?.goals.length || 0;
        const team2Goals = match.teams[1]?.goals.length || 0;

        if (teamIndex === 0 && team1Goals > team2Goals) return 'bg-green-200';
        if (teamIndex === 1 && team2Goals > team1Goals) return 'bg-green-200';

        return 'bg-gray-100'; // Default color
    };

    return (
        <>
            <Head>
                <title>{t('app.title')}</title>
                <meta name="description" content={t('app.title')} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
                <h1 className="text-2xl font-bold text-gray-800">Match Details</h1>

                <div className="flex flex-col lg:flex-row max-w-6xl w-full gap-8 mt-6">
                    <div className="flex flex-col lg:w-2/3 gap-6">
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2 text-gray-800">Match ID</h2>
                            <p className="text-gray-600">{match?.id}</p>
                        </div>

                        <div className="flex gap-4">
                            {match?.teams.map((teamData, index) => (
                                <a
                                    key={index}
                                    href={`/teams/${teamData.team.id}`}
                                    className={`flex-1 rounded-lg shadow-md p-4 hover:bg-green-300 transition duration-200 ${getTeamColor(
                                        index
                                    )}`}
                                >
                                    <div className="text-center">
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {teamData.team.name}
                                        </h3>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2 text-gray-800">Score</h2>
                            <p className="text-gray-600">
                                {match?.teams[0].goals.length} - {match?.teams[1].goals.length}
                            </p>
                        </div>

                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2 text-gray-800">Location</h2>
                            <p className="text-gray-600">{match?.location.city}</p>
                        </div>
                    </div>

                    <div className="lg:w-1/3">
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2 text-gray-800">
                                Date & Time
                            </h2>
                            <p className="text-gray-600">
                                {new Date(match?.date ?? '').toLocaleString()}
                            </p>
                        </div>
                        <ul className="p-5">
                            {match?.goals.map((goal) => (
                                <li key={goal.id} className="flex items-center justify-between ">
                                    <Link
                                        href={`/users/${goal.player.username}`}
                                        className="hover:font-bold text-blue-600 hover:underline"
                                    >
                                        {goal.time}' - {goal.player?.firstName || 'Unknown'}{' '}
                                        {goal.player?.lastName || ''}(
                                        {goal.team?.name || 'Unknown Team'})
                                    </Link>
                                    {loggedInUser?.role === 'ADMIN' && (
                                        <button
                                            onClick={() => deleteGoal(goal.id)}
                                            className="text-red-600 hover:underline flex items-center"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MatchPage;

export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};
