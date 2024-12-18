import Header from '@components/header';
import GoalService from '@services/GoalService';
import MatchService from '@services/MatchService';
import { Team } from '@types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import useSWR from 'swr';
import TeamService from '@services/TeamService';

const TeamPage = () => {
    const router = useRouter();
    const { teamId } = router.query;
    const [team, setTeam] = useState<Team | null>(null);
    const { t } = useTranslation();

    const fetchTeam = async (teamId: number) => {
        const [teamResponse] = await Promise.all([TeamService.getTeamById(teamId)]);
        const [team] = await Promise.all([teamResponse.json()]);
        setTeam(team);
    };

    useEffect(() => {
        if (teamId) {
            fetchTeam(Number(teamId));
        }
    }, [teamId]);

    return (
        <>
            <Head>
                <title>{t('app.title')} - Team</title>
                <meta name="description" content="Team Details" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
                <h1 className="text-2xl font-bold text-gray-800">Team Details</h1>

                {team ? (
                    <div className="flex flex-col lg:flex-row max-w-6xl w-full gap-8 mt-6">
                        {/* Left Column - Team Info */}
                        <div className="flex flex-col lg:w-2/3 gap-6">
                            {/* Team Name */}
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold text-gray-800">Team Name</h2>
                                <p className="text-gray-600">{team.name}</p>
                            </div>

                            {/* Team Description */}
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold text-gray-800">Description</h2>
                                <p className="text-gray-600">{team.description}</p>
                            </div>

                            {/* Coach Info */}
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold text-gray-800">Coach</h2>
                                <p className="text-gray-600">
                                    {team.coach?.firstName} {team.coach?.lastName}
                                </p>
                                <p className="text-gray-500">{team.coach?.description || ''}</p>
                            </div>
                        </div>

                        {/* Right Column - Players */}
                        <div className="lg:w-1/3">
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    Players
                                </h2>
                                {team.players && team.players.length > 0 ? (
                                    <ul className="space-y-2">
                                        {team.players.map((player) => (
                                            <li
                                                key={player.id}
                                                className="text-gray-700 hover:text-gray-900"
                                            >
                                                {player.firstName} {player.lastName}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No players available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-600 mt-8">Loading team details...</p>
                )}
            </div>
        </>
    );
};

export default TeamPage;

export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};
