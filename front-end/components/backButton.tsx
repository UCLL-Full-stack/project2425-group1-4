import { Undo2 } from 'lucide-react';
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
        <button onClick={handleBack} className="text-white  shadow-md  focus:outline-none">
            <Undo2 />
        </button>
    );
};

export default BackButton;
