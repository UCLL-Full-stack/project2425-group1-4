import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function OverviewDropdown({ t, loggedInUser }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                type="button"
                className="px-2 text-white text-xl hover:bg-slate-600 rounded-lg inline-flex items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                {t('header.nav.overview')}
                <ChevronDown
                    className={`ml-2 h-5 w-5 text-white transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>
            {isOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Link
                            className="block px-2 py-1 text-black text-xl hover:bg-gray-200 "
                            href="/players"
                        >
                            {t('header.nav.players')}
                        </Link>
                        <Link
                            className="block px-2 py-1 text-black text-xl hover:bg-gray-200 "
                            href="/teams"
                        >
                            {t('header.nav.teams')}
                        </Link>
                        <Link
                            className="block px-2 py-1 text-black text-xl hover:bg-gray-200 "
                            href="/matches"
                        >
                            {t('header.nav.matches')}
                        </Link>

                        {loggedInUser?.role === 'ADMIN' && (
                            <>
                                <Link
                                    className="px-2 text-white text-xl hover:bg-slate-600 rounded-lg"
                                    href="/users"
                                >
                                    {t('header.nav.users')}
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
