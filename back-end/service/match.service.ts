import matchDb from '../repository/match.db';
import { Match } from '../model/match';

const getAllMatches = async (): Promise<Match[]> => {
    return await matchDb.getAllMatches();
};

const getMatchById = async (id: string): Promise<Match> => {
    const match = await matchDb.getMatchById(id);
    if (!match) {
        throw new Error(`Match with id: ${id} does not exist.`);
    }
    return match;
};

export default {
    getAllMatches,
    getMatchById,
};
