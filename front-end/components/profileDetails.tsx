import React from 'react';

type ProfileDetailsProps = {
    description: string;
    team: number | null;
};

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ description, team }) => (
    <div className="w-2/3 flex flex-col gap-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Description</h2>
            <p className="text-gray-600">{description || 'This user has no description yet.'}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Team</h2>
            <p className="text-gray-600">{team ? `${team}` : 'No team assigned'}</p>
        </div>
    </div>
);

export default ProfileDetails;
