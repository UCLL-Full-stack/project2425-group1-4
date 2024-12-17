import Header from '@components/header';
import { Match } from '@types';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MatchGrid from '@components/match/matchGrid';
import MatchService from '@services/MatchService';

const MatchesPage: React.FC = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const { t } = useTranslation();

    const fetchMatches = async () => {
        const [matches] = await Promise.all([(await MatchService.getAllMatches()).json()]);
        setMatches(matches);
    };

    useEffect(() => {
        fetchMatches();
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
                <MatchGrid matches={matches} />
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

export default MatchesPage;
