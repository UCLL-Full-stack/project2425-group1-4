import Header from '@components/header';
import GoalService from '@services/GoalService';
import MatchService from '@services/MatchService';
import { Match } from '@types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import useSWR from 'swr';

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

                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2 text-gray-800">Teams</h2>
                            <p className="text-gray-600">
                                {match?.teams[0].team.name} vs {match?.teams[1].team.name}
                            </p>
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
                        {/* <ul>
                            {match?.goals.map((goal) => (
                            <li key={goal.id}>
                                {goal.time}' - {goal.player?.firstName || 'Unknown'}{' '}
                                {goal.player?.lastName || ''} ({goal.team?.name || 'Unknown Team'})
                            </li>
                        ))}
                        </ul> */}
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
