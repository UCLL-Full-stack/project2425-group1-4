import matchDb from '../repository/match.db';
import { Match } from '../model/match';

const getAllMatches = async (): Promise<Match[]> => {
    return await matchDb.getAllMatches();
};

export default {
    getAllMatches,
};
