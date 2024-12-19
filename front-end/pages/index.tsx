import Header from '@components/header/header';
import MatchTile from '@components/match/matchTile';
import MatchService from '@services/MatchService';
import { Match } from '@types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import useSWR from 'swr';

const HomePage: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<UserStorage | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            setLoggedInUser(JSON.parse(storedUser));
        }
    }, []);

    const fetchLatestMatches = async () => {
        const response = await MatchService.getLatestMatches(10);

        if (!response.ok) {
            const errorMessage =
                response.status === 401 ? t('permissions.unauthorized') : response.statusText;
            throw new Error(errorMessage);
        }

        const matches = await response.json();
        return matches;
    };

    const {
        data: matches,
        isLoading,
        error,
    } = useSWR('fetchLatestMatches', fetchLatestMatches, {
        refreshInterval: 10000,
    });

    return (
        <>
            <Head>
                <title>{t('app.title')}</title>
                <meta name="description" content={t('app.title')} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />

            <main className="container mx-auto px-4 py-8">
                <div className="flex space-x-8">
                    {/* Left Side - Placeholder Table */}
                    <div className="flex-1 bg-gray-300"></div>

                    {/* Right Side - Welcome Message */}
                    <div className="flex-1 space-y-4 bg-gray-50 p-4 rounded shadow">
                        <h2 className="text-lg font-bold">Welcome to GoalPro!</h2>
                        <p className="text-gray-600">
                            We're thrilled to have you here! GoalPro is your ultimate companion for
                            all things football. Dive into the latest matches, track your favorite
                            teams, and stay updated with real-time scores and highlights. Whether
                            you're a casual fan or a die-hard enthusiast, GoalPro has something for
                            everyone.
                        </p>
                        <p className="text-gray-600">
                            Explore our platform to find detailed statistics, player profiles, and
                            upcoming fixtures. Join our vibrant community and celebrate the
                            beautiful game with fans from around the world. Your journey into the
                            world of football excellence starts now!
                        </p>
                    </div>
                </div>

                {/* Match Tiles Section */}
                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                    {loggedInUser ? (
                        matches?.map((match: Match) => (
                            <MatchTile key={match.id} match={match} teamId={0} />
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">
                            {t('home.needLogin')}
                        </p>
                    )}
                </div>
            </main>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default HomePage;
