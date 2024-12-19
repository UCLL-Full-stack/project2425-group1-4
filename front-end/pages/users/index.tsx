import Header from '@components/header/header';
import UserGrid from '@components/users/userGrid';
import UserService from '@services/UserService';
import { User } from '@types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const UsersPage: React.FC = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const fetchUsers = async (): Promise<User[]> => {
        const response = await UserService.getAllUsers();
        if (!response.ok) {
            const errorMessage =
                response.status === 401 ? t('permissions.unauthorized') : '';
            throw new Error(errorMessage);
        }

        const users = await response.json();
        return users;
    };

    const {
        data: users,
        isLoading,
        error,
    } = useSWR<User[]>('fetchUsers', fetchUsers, {
        refreshInterval: 500,
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
                    <>
                        <p>Loading users...</p>
                    </>
                ) : error ? (
                    <>
                        <div className="flex items-center justify-center h-96">
                            <p className="text-red-700 font-semibold">
                                Error fetching users: {error.message}
                            </p>
                        </div>
                    </>
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
