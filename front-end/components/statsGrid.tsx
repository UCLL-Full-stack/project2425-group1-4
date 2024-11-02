import React from 'react';

const StatsGrid: React.FC = () => (
    <div className="w-2/3 flex flex-col gap-6 mt-6">
        <div className="flex gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md text-center w-1/2 border border-gray-200">
                <p className="font-semibold text-gray-800">[stat]</p>
                <p className="text-gray-500">More info</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center w-1/2 border border-gray-200">
                <p className="font-semibold text-gray-800">[stat]</p>
                <p className="text-gray-500">More info</p>
            </div>
        </div>

        {/* Recent Matches */}
        <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-4 rounded-lg shadow-md text-center border border-gray-200">
                <p className="font-semibold text-gray-800">[Team 1] - [Team 2]</p>
                <p className="text-gray-500">Score: [score]</p>
                <p className="text-gray-500">Date: [date]</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center border border-gray-200">
                <p className="font-semibold text-gray-800">[Team 1] - [Team 2]</p>
                <p className="text-gray-500">Score: [score]</p>
                <p className="text-gray-500">Date: [date]</p>
            </div>
        </div>
    </div>
);

export default StatsGrid;
