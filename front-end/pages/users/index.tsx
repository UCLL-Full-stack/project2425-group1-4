import Header from '@components/header/header';
import UserGrid from '@components/users/userGrid';
import UserService from '@services/UserService';
import { User } from '@types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

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

const UsersPage: React.FC = () => {
    const { t } = useTranslation();
    const router = useRouter();

    // Fetch users using SWR
    const fetchUsers = async (): Promise<User[] | null> => {
        try {
            const response = await UserService.getAllUsers();
            const users = await response.json();
            return users;
        } catch (error) {
            console.error('Error fetching users:', error);
            return null;
        }
    };

    const {
        data: users,
        isLoading,
        error,
    } = useSWR('fetchUsers', fetchUsers, {
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
                    <UserGrid Users={users || []} />
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

export default UsersPage;
