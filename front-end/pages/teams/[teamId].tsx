import Header from '@components/header';
import { Team, User } from '@types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import TeamService from '@services/TeamService';
import UserService from '@services/UserService';

const TeamPage = () => {
    const router = useRouter();
    const { teamId } = router.query;
    const [team, setTeam] = useState<Team | null>(null);
    const [editedTeam, setEditedTeam] = useState<Team | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const { t } = useTranslation();

    const fetchTeam = async (teamId: number) => {
        const teamResponse = await TeamService.getTeamById(teamId);
        const teamData = await teamResponse.json();
        setTeam(teamData);
    };

    const fetchUsersByRole = async (currentCoach: User | null) => {
        try {
            const response = await UserService.getUsersByRole('USER'); // Fetch users with 'USER' role
            const usersData = await response.json();

            // Add current coach to the list if not already included
            if (currentCoach && !usersData.some((user: User) => user.id === currentCoach.id)) {
                usersData.push(currentCoach);
            }

            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]); // Fallback to empty array
        }
    };

    useEffect(() => {
        if (teamId) {
            fetchTeam(Number(teamId));
        }
    }, [teamId]);

    useEffect(() => {
        if (team) {
            fetchUsersByRole(team.coach);
        }
    }, [team]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setEditedTeam(team);
        } else {
            setEditedTeam(null);
        }
    };

    const handleSave = async () => {
        try {
            if (editedTeam && JSON.stringify(team) !== JSON.stringify(editedTeam)) {
                const response = await TeamService.updateTeam(editedTeam);
                if (response.ok) {
                    const updatedTeam = await response.json();
                    setTeam(updatedTeam);
                    setIsEditing(false);
                    setEditedTeam(null);
                } else {
                    const { message } = await response.json();
                    alert(message || 'Failed to update team. Please try again.');
                }
            } else {
                setIsEditing(false);
                setEditedTeam(null);
            }
        } catch (error) {
            console.error('Error updating team:', error);
            alert('An error occurred while updating the team. Please try again later.');
        }
    };

    return (
        <>
            <Head>
                <title>{t('app.title')} - Team</title>
                <meta name="description" content="Team Details" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
                <h1 className="text-2xl font-bold text-gray-800">Team Details</h1>

                {team ? (
                    <div className="flex flex-col lg:flex-row max-w-6xl w-full gap-8 mt-6">
                        {/* Left Column - Team Info */}
                        <div className="flex flex-col lg:w-2/3 gap-6">
                            {/* Team Name */}
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold text-gray-800">Team Name</h2>
                                {isEditing ? (
                                    <input
                                        className="w-full p-2 border rounded-lg"
                                        value={editedTeam?.name || ''}
                                        onChange={(e) =>
                                            setEditedTeam({
                                                ...editedTeam,
                                                name: e.target.value,
                                            } as Team)
                                        }
                                    />
                                ) : (
                                    <p className="text-gray-600">{team.name}</p>
                                )}
                            </div>

                            {/* Team Description */}
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold text-gray-800">Description</h2>
                                {isEditing ? (
                                    <textarea
                                        className="w-full p-2 border rounded-lg"
                                        value={editedTeam?.description || ''}
                                        onChange={(e) =>
                                            setEditedTeam({
                                                ...editedTeam,
                                                description: e.target.value,
                                            } as Team)
                                        }
                                        placeholder="Enter team description"
                                    />
                                ) : (
                                    <p className="text-gray-600">{team.description}</p>
                                )}
                            </div>

                            {/* Coach Info */}
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold text-gray-800">Coach</h2>
                                {isEditing ? (
                                    <select
                                        className="w-full p-2 border rounded-lg"
                                        value={editedTeam?.coach?.id || ''}
                                        onChange={(e) => {
                                            const selectedCoach = users.find(
                                                (user) => user.id === parseInt(e.target.value)
                                            );
                                            setEditedTeam({
                                                ...editedTeam,
                                                coach: selectedCoach || null, // Set the selected user as coach
                                            } as Team);
                                        }}
                                    >
                                        <option value="">Select a coach</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.firstName} {user.lastName}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <>
                                        <p className="text-gray-600">
                                            {team.coach?.firstName} {team.coach?.lastName}
                                        </p>
                                        <p className="text-gray-500">
                                            {team.coach?.description || ''}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Players */}
                        <div className="lg:w-1/3">
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    Players
                                </h2>
                                {team.players && team.players.length > 0 ? (
                                    <ul className="space-y-2">
                                        {team.players.map((player) => (
                                            <li
                                                key={player.id}
                                                className="text-gray-700 hover:text-gray-900"
                                            >
                                                {player.firstName} {player.lastName}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No players available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-600 mt-8">Loading team details...</p>
                )}

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
        </>
    );
};

export default TeamPage;

export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};
