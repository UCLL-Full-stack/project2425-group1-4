import Header from '@components/header/header';
import TeamGrid from '@components/teamGrid/teamGrid';
import { Team } from '@types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

// Utility fetch with session handling
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const loggedInUserString = localStorage.getItem('loggedInUser');
    const loggedInUser = loggedInUserString ? JSON.parse(loggedInUserString) : null;
    const token = loggedInUser?.token;

    const headers = {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        // Clear token and redirect user to login
        localStorage.removeItem('loggedInUser');
        window.location.href = '/login';
        return;
    }

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch');
    }

    return await response.json();
};

const TeamsPage: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [sessionExpired, setSessionExpired] = useState<boolean>(false);
    const { t } = useTranslation();

    const fetchTeams = async () => {
        try {
            const teamsData = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/teams`);
            setTeams(teamsData);
        } catch (error: any) {
            if (error.message === 'Session expired') {
                setSessionExpired(true);
                localStorage.removeItem('jwt_token');
            } else {
                console.error(error.message);
            }
        }
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
