import UserService from '@services/UserService';
import { User } from '@types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProfileHeader from '../../components/profileHeader';
import StatsGrid from '../../components/statsGrid';

const UserPage = () => {
    const router = useRouter();
    const { userId } = router.query;

    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const getUserById = async (userId: string) => {
        const [userResponse] = await Promise.all([UserService.getUserById(userId)]);

        const [user] = await Promise.all([userResponse.json()]);
        setUser(user);
    };

    useEffect(() => {
        if (userId) {
            getUserById(userId as string);
        }
    }, [userId]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        try {
            // const updatedUser = await userResponse.json();
            // setUser(updatedUser);

            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile or team:', error);
            alert(error);
        }
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
            <ProfileHeader firstName={user.firstName} lastName={user.lastName} />

            {/* Profile Content */}
            <div className="flex flex-col lg:flex-row max-w-6xl w-full gap-8">
                {/* Profile Image */}
                <div className="flex justify-center lg:w-1/3">
                    <div className="w-64 h-64 bg-gray-300 rounded-lg shadow-md" />
                </div>

                {/* Profile Details */}
                <div className="flex flex-col lg:w-2/3 gap-6">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Description</h2>
                        {isEditing ? (
                            <textarea
                                className="w-full p-2 border rounded-lg"
                                value={user.description}
                                onChange={() => {}}
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
                        <p className="text-gray-600">
                            {isEditing ? (
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-lg"
                                    value={user.playerOfTeam}
                                    onChange={() => {}}
                                    placeholder="Enter team ID"
                                />
                            ) : (
                                user.playerOfTeam
                            )}
                        </p>
                    </div>
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
                            onClick={() => {
                                handleSave();
                            }}
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
    );
};

export default UserPage;
