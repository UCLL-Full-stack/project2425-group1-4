import Header from '@components/header';
import TeamService from '@services/TeamService';
import { Team } from '@types';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import TeamGrid from '@components/teamGrid/teamGrid';

const TeamsPage: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const { t } = useTranslation();

    const fetchTeams = async () => {
        const [teams] = await Promise.all([TeamService.getAllTeams()]);
        setTeams(teams);
    };

    useEffect(() => {
        fetchTeams();
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
            <div>
                <TeamGrid teams={teams} />
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
