import { User } from '@types';
import React from 'react';

type Props = {
    user: User;
};

const StatsGrid: React.FC<Props> = ({ user }: Props) => {
    return (
        <div className="w-2/3 flex flex-col gap-6 mt-6">
            <div className="flex gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md text-center w-1/2 border border-gray-200">
                    <p className="font-semibold text-gray-800">Total Goals</p>
                    <p className="text-gray-500">{user.goals?.length}</p>
                </div>
            </div>
        </div>
    );
};

export default StatsGrid;
