import Header from '@components/header/header';
import TeamGrid from '@components/teamGrid/teamGrid';
import TeamService from '@services/TeamService';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import React from 'react';
import useSWR from 'swr';

const TeamsPage: React.FC = () => {
    const { t } = useTranslation();

    const fetchTeams = async () => {
        try {
            const response = await TeamService.getAllTeams();
            const teams = await response.json();
            return teams;
        } catch (error) {
            console.error('Error fetching teams:', error);
            return null;
        }
    };

    const {
        data: teams,
        isLoading,
        error,
    } = useSWR('fetchTeams', fetchTeams, {
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
            <div>
                {isLoading ? (
                    <p>Loading users...</p>
                ) : error ? (
                    <p className="text-red-500">Error fetching users: {error.message}</p>
                ) : (
                    <TeamGrid teams={teams} />
                )}
            </div>
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

export default TeamsPage;
