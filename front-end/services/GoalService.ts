const getGoalsWithDetails = async (matchId: number) => {
    const token = JSON.parse(localStorage.getItem('loggedInUser') || '{}')?.token;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals/match/${matchId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            console.log('response: ' + response.status);
            throw new Error(`Fetch failed with status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

const GoalService = {
    getGoalsWithDetails,
};

export default GoalService;
