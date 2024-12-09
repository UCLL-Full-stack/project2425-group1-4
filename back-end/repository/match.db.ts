import { Match } from '../model/match';
import database from './database';

const getAllMatches = async (): Promise<Match[]> => {
    try {
        const matchesPrisma = await database.match.findMany();
        return matchesPrisma.map((matchPrisma) => Match.from(matchPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error, See server log for details.');
    }
};

export default { getAllMatches };
