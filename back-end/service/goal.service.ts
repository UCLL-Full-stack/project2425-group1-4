import { getgid } from 'process';
import goalDb from '../repository/goal.db';

const validateGoalIds = async (goalIds: number[]): Promise<void> => {
    const goals = await goalDb.getGoalsByIds(goalIds);

    if (goals.length !== goalIds.length) {
        throw new Error('One or more goal IDs do not exist.');
    }
};

const getGoalsWithDetails = async (matchId: number) => {
    return await goalDb.getGoalsWithDetails(matchId)
};

export default {
    validateGoalIds,
    getGoalsWithDetails,
};