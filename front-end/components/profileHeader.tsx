import React from 'react';

type ProfileHeaderProps = {
    firstName: string;
    lastName: string;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ firstName, lastName }) => (
    <div className="max-w-4xl mb-6">
        <h1 className="text-4xl font-bold text-gray-900">
            {lastName} {firstName}
        </h1>
    </div>
);

export default ProfileHeader;
