import { Match } from '../model/match';
import database from './database';

const getAllMatches = async (): Promise<Match[]> => {
    try {
        const matchesPrisma = await database.match.findMany({
            include: {
                location: true,
                goals: true,
            },
        });
        return matchesPrisma.map((matchPrisma) => Match.from(matchPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error, See server log for details.');
    }
};

const getMatchById = async (id: string): Promise<Match | null> => {
    try {
        const matchPrisma = await database.match.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                location: true,
                goals: true,
            },
        });
        return matchPrisma ? Match.from(matchPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error, See server log for details.');
    }
};

export default { getAllMatches, getMatchById };
