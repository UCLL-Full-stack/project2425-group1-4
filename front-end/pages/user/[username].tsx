import Header from '@components/header/header';
import TeamService from '@services/TeamService';
import UserService from '@services/UserService';
import { Team, User } from '@types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import StatsGrid from '../../components/statsGrid';

const UserPage = () => {
    const router = useRouter();
    const { username } = router.query;
    const { t } = useTranslation();

    const [user, setUser] = useState<User | null>(null);
    const [editedUser, setEditedUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [teams, setTeams] = useState<Team[]>([]);

    const getUserById = async (username: string) => {
        const [userResponse] = await Promise.all([UserService.getUserByUsername(username)]);
        const [user] = await Promise.all([userResponse.json()]);
        setUser(user);
    };

    const fetchTeams = async () => {
        const response = await TeamService.getAllTeams(); // Add this service method
        const teamsData = await response.json();
        setTeams(teamsData);
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    useEffect(() => {
        if (username) {
            getUserById(username as string);
        }
    }, [username]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setEditedUser(user);
        } else {
            setEditedUser(null);
        }
    };

    const handleSave = async () => {
        try {
            if (editedUser && JSON.stringify(user) !== JSON.stringify(editedUser)) {
                const response = await UserService.updateUser(editedUser);
                if (response.ok) {
                    const updatedUser = await response.json();
                    setUser(updatedUser);
                    setIsEditing(false);
                    setEditedUser(null);
                } else {
                    const { message } = await response.json();
                    alert(message || 'Failed to update user. Please try again.');
                }
            } else {
                setIsEditing(false);
                setEditedUser(null);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating the profile. Please try again later.');
        }
    };

    if (!user)
        return (
            <>
                <Head>
                    <title>{t('app.title')}</title>
                    <meta name="description" content={t('app.title')} />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header />
                <p>Loading...</p>
            </>
        );

    return (
        <>
            <Head>
                <title>{t('app.title')}</title>
                <meta name="description" content={t('app.title')} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
                    <div className="max-w-4xl mb-6">
                        <h1 className="text-4xl font-bold text-gray-900">
                            {user.lastName} {user.firstName}
                        </h1>
                    </div>

                    <div className="flex flex-col lg:flex-row max-w-6xl w-full gap-8">
                        <div className="flex justify-center lg:w-1/3">
                            <div className="w-64 h-64 bg-gray-300 rounded-lg shadow-md" />
                        </div>

                        <div className="flex flex-col lg:w-2/3 gap-6">
                            {/* Description Field */}
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                                    Description
                                </h2>
                                {isEditing ? (
                                    <textarea
                                        className="w-full p-2 border rounded-lg"
                                        value={editedUser?.description || ''}
                                        onChange={(e) =>
                                            setEditedUser({
                                                ...editedUser,
                                                description: e.target.value,
                                            } as User)
                                        }
                                        placeholder="Enter description"
                                    />
                                ) : (
                                    <p className="text-gray-600">
                                        {user.description || 'No description provided.'}
                                    </p>
                                )}
                            </div>

                            {/* Team Field with Dropdown */}
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-2 text-gray-800">Team</h2>
                                {isEditing ? (
                                    <select
                                        className="w-full p-2 border rounded-lg"
                                        value={editedUser?.playerOfTeam?.id || ''}
                                        onChange={(e) => {
                                            const selectedTeam = teams.find(
                                                (team) => team.id === parseInt(e.target.value)
                                            );
                                            setEditedUser({
                                                ...editedUser,
                                                playerOfTeam: selectedTeam || null, // Set the whole team object
                                            } as User);
                                        }}
                                    >
                                        <option value="">Select a team</option>
                                        {teams.map((team) => (
                                            <option key={team.id} value={team.id}>
                                                {team.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p className="text-gray-600">
                                        {user.playerOfTeam?.name || 'No team assigned.'}
                                    </p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-2 text-gray-800">Email</h2>
                                {isEditing ? (
                                    <input
                                        className="w-full p-2 border rounded-lg"
                                        value={editedUser?.email || ''}
                                        onChange={(e) =>
                                            setEditedUser({
                                                ...editedUser,
                                                email: e.target.value,
                                            } as User)
                                        }
                                        placeholder="Enter email"
                                    />
                                ) : (
                                    <p className="text-gray-600">{user.email}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="w-full max-w-6xl mt-8">
                        <StatsGrid user={user} />
                    </div>

                    {/* Edit and Save Button */}
                    <div className="mt-6">
                        {isEditing ? (
                            <div className="flex gap-4">
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleEditToggle}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleEditToggle}
                                className="p-2 hover:bg-gray-200 rounded-full"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15.232 5.232l3.536 3.536M9 11l3.536-3.536a1.5 1.5 0 012.121 0l3.536 3.536a1.5 1.5 0 010 2.121L11 21H6v-5L15.232 5.232z"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default UserPage;

export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};
