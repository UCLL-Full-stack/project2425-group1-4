import database from './database';

const getGoalsByIds = async (goalIds: number[]) => {
    return await database.goal.findMany({
        where: {
            id: { in: goalIds },
        },
    });
};

const getGoalsWithDetails = async (matchId: number) => {
    try {
        const goals = await database.goal.findMany({
            where: { matchId },
            include: {
                player: { select: { firstName: true, lastName: true } },
                team: { select: { id: true, name: true } },
            },
        });
        return goals;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

export default {
    getGoalsByIds,
    getGoalsWithDetails,
};
