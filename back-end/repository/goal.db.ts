import database from './database';
import { Goal } from '../model/goal';

const getGoalsByIds = async (goalIds: number[]) => {
    return await database.goal.findMany({
        where: {
            id: { in: goalIds },
        },
    });
};

export default {
    getGoalsByIds,
};
