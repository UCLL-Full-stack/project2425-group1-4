import Header from '@components/header/header';
import UnauthorizedAccessModal from '@components/modals/UnauthorizedAccessModal';
import UserGrid from '@components/users/userGrid';
import UserService from '@services/UserService';
import { User } from '@types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const UsersPage: React.FC = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [showModal, setShowModal] = useState(false);

    // Validate user role
    useEffect(() => {
        const validateUserRole = () => {
            if (typeof window !== 'undefined') {
                try {
                    const loggedInUserString = localStorage.getItem('loggedInUser');

                    if (!loggedInUserString) {
                        throw new Error('Log in first, please');
                    }

                    const loggedInUser = JSON.parse(loggedInUserString);
                    const token = loggedInUser?.token;

                    if (!token) {
                        throw new Error('No authorization token found. Log in first, please');
                    }

                    if (loggedInUser?.role === 'ADMIN') {
                        setIsAdmin(true);
                    } else {
                        setShowModal(true);
                        setTimeout(() => router.push('/'), 3000);
                    }
                } catch (error) {
                    console.error('Error validating user role:', error);
                    setShowModal(true);
                    setTimeout(() => router.push('/'), 3000);
                }
            }
        };

        validateUserRole();
    }, [router]);

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
                {showModal && <UnauthorizedAccessModal onClose={() => router.push('/')} />}
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
