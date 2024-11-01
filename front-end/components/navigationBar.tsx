// components/NavBar.tsx
import Link from 'next/link';
import React from 'react';

const NavBar: React.FC = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between">
                <Link href="/" className="text-lg font-bold">
                    GoalPro
                </Link>
                <div className="flex space-x-4">
                    <Link href="/players">Players</Link>
                    <Link href="/teams">Teams</Link>
                    <Link href="/matches">Matches</Link>
                    <Link href="/profile">[Firstname]</Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
