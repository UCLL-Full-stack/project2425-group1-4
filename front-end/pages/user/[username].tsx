import UserService from '@services/UserService';
import { User } from '@types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProfileHeader from '../../components/profileHeader';
import StatsGrid from '../../components/statsGrid';
import Head from 'next/head';
import Header from '@components/header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const UserPage = () => {
    const router = useRouter();
    const { username } = router.query;
    const { t } = useTranslation();

    const [user, setUser] = useState<User | null>(null);
    const [editedUser, setEditedUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const getUserById = async (username: string) => {
        const [userResponse] = await Promise.all([UserService.getUserByUsername(username)]);
        const [user] = await Promise.all([userResponse.json()]);
        setUser(user);
    };

    useEffect(() => {
        if (username) {
            getUserById(username as string);
        }
    }, [username]);

    const handleEditToggle = () => {
        if (isEditing) {
            // Reset editedUser to null when exiting edit mode without saving
            setEditedUser(null);
        } else {
            // Initialize editedUser with current user data when entering edit mode
            setEditedUser(user);
        }
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        try {
            if (editedUser) {
                // Determine if there are changes in any field
                const hasFieldChanges = JSON.stringify(user) !== JSON.stringify(editedUser);

                // Trigger update only if there are field changes
                if (hasFieldChanges) {
                    const updatedUserResponse = await UserService.updateUser(editedUser);
                    if (updatedUserResponse.ok) {
                        setUser(await updatedUserResponse.json());
                        setIsEditing(false);
                        setEditedUser(null);
                    } else {
                        const { message } = await updatedUserResponse.json();
                        alert(message || 'Failed to update user. Please try again.');
                    }
                } else {
                    // Close edit mode if no changes
                    setIsEditing(false);
                    setEditedUser(null);
                }
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating the profile. Please try again later.');
        }
    };

    if (!user) return <p>Loading...</p>;

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
                <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
                    <div className="max-w-4xl mb-6">
                        <h1 className="text-4xl font-bold text-gray-900">
                            {user.lastName} {user.firstName}
                        </h1>
                    </div>

                    {/* Profile Content */}
                    <div className="flex flex-col lg:flex-row max-w-6xl w-full gap-8">
                        {/* Profile Image */}
                        <div className="flex justify-center lg:w-1/3">
                            <div className="w-64 h-64 bg-gray-300 rounded-lg shadow-md" />
                        </div>

                        {/* Profile Details */}
                        <div className="flex flex-col lg:w-2/3 gap-6">
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
                                        {user.description || 'This user has no description yet.'}
                                    </p>
                                )}
                            </div>

                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-2 text-gray-800">Team</h2>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        min={1}
                                        className="w-full p-2 border rounded-lg"
                                        value={editedUser?.playerOfTeam || ''}
                                        onChange={(e) =>
                                            setEditedUser({
                                                ...editedUser,
                                                playerOfTeam: Number(e.target.value),
                                            } as User)
                                        }
                                        placeholder="Enter team ID"
                                    />
                                ) : (
                                    <p className="text-gray-600">{user.playerOfTeam}</p>
                                )}
                            </div>
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
                            {isEditing && (
                                <>
                                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                        <h2 className="text-xl font-semibold mb-2 text-gray-800">
                                            Password
                                        </h2>
                                        {isEditing ? (
                                            <input
                                                className="w-full p-2 border rounded-lg"
                                                onChange={(e) =>
                                                    setEditedUser({
                                                        ...editedUser,
                                                        password: e.target.value,
                                                    } as User)
                                                }
                                                placeholder="Enter Password"
                                            />
                                        ) : (
                                            <p className="text-gray-600">{user.email}</p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="w-full max-w-6xl mt-8">
                        <StatsGrid />
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
