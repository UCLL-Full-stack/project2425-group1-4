import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Language from './language/Language';
import { useTranslation } from 'next-i18next';
import { User } from '@types';

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            setLoggedInUser(JSON.parse(storedUser));
        }
    }, []);

    const handleClick = () => {
        localStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
    };

    return (
        <nav className="bg-slate-800 text-white p-4">
            <div className="container mx-auto flex justify-between">
                <Link href="/" className="text-lg font-bold">
                    {t('app.title')}
                </Link>
                <div className="flex space-x-4">
                    <Link
                        className="px-2 text-white text-xl hover:bg-slate-600 rounded-lg"
                        href="/"
                    >
                        {t('header.nav.home')}
                    </Link>
                    <Link
                        className="px-2 text-white text-xl hover:bg-slate-600 rounded-lg"
                        href="/players"
                    >
                        {t('header.nav.players')}
                    </Link>
                    <Link
                        className="px-2 text-white text-xl hover:bg-slate-600 rounded-lg"
                        href="/teams"
                    >
                        {t('header.nav.teams')}
                    </Link>
                    <Link
                        className="px-2 text-white text-xl hover:bg-slate-600 rounded-lg"
                        href="/matches"
                    >
                        {t('header.nav.matches')}
                    </Link>
                    {loggedInUser ? (
                        <>
                            <p className="text-white ms-5 mt-2 md:mt-0 pt-1 md:pt-0 grow">
                                {t('header.welcome')}, {loggedInUser.firstName}!
                            </p>
                            <button
                                onClick={handleClick}
                                className="px-2 text-white text-xl hover:bg-slate-600 rounded-lg"
                            >
                                {t('header.nav.logout')}
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="px-2 text-white text-xl hover:bg-slate-600 rounded-lg"
                            >
                                {t('header.nav.login')}
                            </Link>
                            <Link
                                href="/register"
                                className="px-2 text-white text-xl hover:bg-slate-600 rounded-lg"
                            >
                                {t('header.nav.register')}
                            </Link>
                        </>
                    )}
                    <Language />

                    {loggedInUser && loggedInUser.role === 'ADMIN' && (
                        <>
                            <Link
                                className="px-2 text-white text-xl hover:bg-slate-600 rounded-lg"
                                href="/users"
                            >
                                Admin Matches
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
