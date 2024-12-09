import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@components/header';
import Head from 'next/head';

const HomePage: React.FC = () => {
    const { t } = useTranslation();

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
                    {/* Left Side - Placeholder Image */}
                    <div className="flex-1 bg-gray-300 h-80"></div>

                    {/* Right Side - Placeholder Text */}
                    <div className="flex-1 space-y-4">
                        <div className="bg-gray-300 h-8 w-3/4"></div>
                        <div className="bg-gray-300 h-4 w-full"></div>
                        <div className="bg-gray-300 h-4 w-full"></div>
                        <div className="bg-gray-300 h-4 w-5/6"></div>
                        <div className="bg-gray-300 h-10 w-2/3"></div>
                    </div>
                </div>

                {/* Match Cards Section */}
                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="border rounded p-4 bg-white shadow-md">
                            <div className="text-gray-700 font-semibold">[Team 1] - [Team 2]</div>
                            <div className="text-gray-500 font-bold">[Score]</div>
                            <div className="text-gray-500 text-sm">[Date]</div>
                        </div>
                    ))}
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
