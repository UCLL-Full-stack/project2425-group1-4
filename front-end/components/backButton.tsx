import { useRouter } from 'next/router';
import React from 'react';

const BackButton: React.FC = () => {
    const router = useRouter();

    const handleBack = () => {
        if (router.pathname !== '/') {
            router.back(); // Navigate to the previous page
        } else {
            router.push('/'); // If on the home page, ensure it redirects to home
        }
    };

    return (
        <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
        >
            Back
        </button>
    );
};

export default BackButton;
