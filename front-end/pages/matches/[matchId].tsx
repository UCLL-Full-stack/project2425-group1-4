import Header from '@components/header/header';
import MatchService from '@services/MatchService';
import { Match } from '@types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const MatchPage = () => {
    const router = useRouter();
    const { matchId } = router.query;
    const [match, setMatch] = useState<Match | null>(null);
    const { t } = useTranslation();

    const fetchMatch = async (matchId: number) => {
        const [matchResponse] = await Promise.all([MatchService.getMatchById(matchId)]);
        const [match] = await Promise.all([matchResponse.json()]);
        setMatch(match);
    };

    useEffect(() => {
        if (matchId) {
            fetchMatch(Number(matchId));
        }
    }, [matchId]);

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
                                <li key={goal.id} className="hover:font-bold">
                                    {goal.time}' -{' '}
                                    <a
                                        href={`/user/${goal.player.username}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {goal.player?.firstName || 'Unknown'}{' '}
                                        {goal.player?.lastName || ''}
                                    </a>{' '}
                                    ({goal.team?.name || 'Unknown Team'})
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
