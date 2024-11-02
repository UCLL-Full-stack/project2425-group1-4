import React from 'react';

const HomePage: React.FC = () => {
    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex space-x-8">
                {/* Left Side - Placeholder Image */}
                <div className="flex-1 bg-gray-300 h-80"></div>

                {/* Right Side - Placeholder Text */}
                <div className="flex-1 space-y-4">
                    <div className="bg-gray-300 h-8 w-3/4"></div>
                    <div className="bg-gray-300 h-4 w-full"></div>
                    <div className="bg-gray-300 h-4 w-full"></div>
                    <div className="bg-gray-300 h-4 w-5/6"></div>
                    <div className="bg-gray-300 h-10 w-2/3"></div>
                </div>
            </div>

            {/* Match Cards Section */}
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="border rounded p-4 bg-white shadow-md">
                        <div className="text-gray-700 font-semibold">[Team 1] - [Team 2]</div>
                        <div className="text-gray-500 font-bold">[Score]</div>
                        <div className="text-gray-500 text-sm">[Date]</div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default HomePage;
