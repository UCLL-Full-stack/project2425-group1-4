import Header from '@components/header';
import UserGrid from '@components/users/userGrid';
import { User } from '@types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import React from 'react';
import useSWR from 'swr';

const fetchUsers = async (): Promise<User[] | null> => {
    try {
        const token = localStorage.getItem('authToken');

        if (!token) {
            console.error('No authorization token found in memory or localStorage');
            return null;
        }

        const response = await fetch('/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('API Response:', error);
            return null;
        }

        // Parse and return the users
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};

const UsersPage: React.FC = () => {
    const { t } = useTranslation();
    const { data: users, isLoading, error } = useSWR('fetchUsers', fetchUsers);

    // Debugging Users
    console.log('Users in UsersPage:', users);

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
