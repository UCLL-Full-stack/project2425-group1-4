import { User } from '@types';
import React, { useState } from 'react';

type Props = {
    Users: Array<User>;
};

const UserGrid: React.FC<Props> = ({ Users }: Props) => {
    const [searchTerm, setSearchTerm] = useState('');

    console.log('Users passed to UserGrid:', Users);

    // Filter Users
    const filteredUsers = Array.isArray(Users)
        ? Users.filter(
              (User) =>
                  // Return all users if searchTerm is empty
                  searchTerm === '' ||
                  `${User.firstName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  `${User.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [];

    return (
        <>
            <section className="p-6">
                <div className="mb-6 flex items-center">
                    <input
                        type="text"
                        placeholder="Search for Users..."
                        aria-label="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((User) => (
                            <div
                                key={User.id}
                                className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
                            >
                                <p className="font-semibold text-lg text-gray-800">
                                    {User.firstName}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">No Users found.</p>
                    )}
                </div>
            </section>
        </>
    );
};

export default UserGrid;
