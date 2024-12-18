import Header from '@components/header/header';
import PlayerGrid from '@components/playerGrid/playerGrid';
import UserService from '@services/UserService';
import { User } from '@types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

const PlayersPage: React.FC = () => {
    const [players, setPlayers] = useState<User[]>([]);
    const { t } = useTranslation();

    const fetchPlayers = async () => {
        const [playersResponse] = await Promise.all([UserService.getAllPlayers()]);
        const [players] = await Promise.all([playersResponse.json()]);
        setPlayers(players);
    };

    useEffect(() => {
        fetchPlayers();
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
                <PlayerGrid players={players} />
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

export default PlayersPage;
