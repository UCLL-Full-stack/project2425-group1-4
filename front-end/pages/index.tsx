import Header from '@components/header/header';
import MatchTile from '@components/match/matchTile';
import MatchService from '@services/MatchService';
import { Match } from '@types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

const HomePage: React.FC = () => {
    const { t } = useTranslation();
    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {
        const fetchLatestMatches = async () => {
            try {
                const response = await MatchService.getLatestMatches(10);
                const matchesData = await response.json();
                setMatches(matchesData);
            } catch (error) {
                console.error('Failed to fetch matches:', error);
            }
        };

        fetchLatestMatches();
    }, []);

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
                    <div className="flex-1 bg-gray-300">
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">{t('home.username')}</th>
                                    <th className="px-4 py-2">{t('home.password')}</th>
                                    <th className="px-4 py-2">{t('home.role')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-4 py-2">user@example.com</td>
                                    <td className="border px-4 py-2">abcdefghij</td>
                                    <td className="border px-4 py-2">User</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">
                                        zinedine.zidane@example.com
                                    </td>
                                    <td className="border px-4 py-2">abcdefghij</td>
                                    <td className="border px-4 py-2">Coach</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">lionel.messi@example.com</td>
                                    <td className="border px-4 py-2">abcdefghij</td>
                                    <td className="border px-4 py-2">Player</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">admin@ucll.be</td>
                                    <td className="border px-4 py-2">secure12345</td>
                                    <td className="border px-4 py-2">Admin</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Right Side - Placeholder Text */}
                    <div className="flex-1 space-y-4">
                        <div className="bg-gray-300 h-8 w-3/4"></div>
                        <div className="bg-gray-300 h-4 w-full"></div>
                        <div className="bg-gray-300 h-4 w-full"></div>
                        <div className="bg-gray-300 h-4 w-5/6"></div>
                        <div className="bg-gray-300 h-10 w-2/3"></div>
                    </div>
                </div>

                {/* Match Tiles Section */}
                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                    {matches.length > 0 ? (
                        matches.map((match) => (
                            <MatchTile key={match.id} match={match} teamId={0} />
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">
                            {t('home.noMatches')}
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
