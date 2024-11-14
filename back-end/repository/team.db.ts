import { Team } from '../model/team';
import database from './database';

const getAllTeams = async (): Promise<Team[]> => {
    try {
        const teamsPrisma = await database.team.findMany({
            include: {
                captain: true,
                coach: true,
                players: true,
            },
        });
        return teamsPrisma.map((teamPrisma) => Team.from(teamPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error, See server log for details.');
    }
};

const getTeamById = async (id: number): Promise<Team | null> => {
    try {
        const teamPrisma = await database.team.findUnique({
            where: {
                id: id,
            },
            include: {
                captain: true,
                coach: true,
                players: true,
            },
        });
        return teamPrisma ? Team.from(teamPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error, See server log for details.');
    }
};

const addTeam = async (team: Team): Promise<Team> => {
    try {
        const teamPrisma = await database.team.create({
            data: {
                name: team.getName(),
                // Conditionally add captain and coach only if they are defined
                captain: team.getCaptain()
                    ? { connect: { id: team.getCaptain()?.getId() } }
                    : undefined,
                coach: team.getCoach() ? { connect: { id: team.getCoach()?.getId() } } : undefined,
                players: {
                    connect: team.getPlayers().map((player) => ({ id: player.getId() })),
                },
                description: team.getDescription(),
            },
            include: {
                captain: true,
                coach: true,
                players: true,
            },
        });
        return Team.from(teamPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateTeam = async (team: Team): Promise<Team> => {
    try {
        const updateData: any = {
            name: team.getName(),
            players: {
                set: team.getPlayers().map((player) => ({ id: player.getId() })),
            },
            description: team.getDescription(),
        };

        // Had weird issues with captain and coach possibly being null
        if (team.getCaptain()) {
            updateData.captain = { connect: { id: team.getCaptain()?.getId() } };
        } else {
            updateData.captain = { disconnect: true };
        }

        if (team.getCoach()) {
            updateData.coach = { connect: { id: team.getCoach()?.getId() } };
        } else {
            updateData.coach = { disconnect: true };
        }

        const teamPrisma = await database.team.update({
            where: {
                id: team.getId(),
            },
            data: updateData,
            include: {
                captain: true,
                coach: true,
                players: true,
            },
        });

        return Team.from(teamPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getTeamByName = async (name: string): Promise<Team | null> => {
    try {
        const teamPrisma = await database.team.findFirst({
            where: {
                name: name,
            },
            include: {
                captain: true,
                coach: true,
                players: true,
            },
        });
        return teamPrisma ? Team.from(teamPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const removeTeam = async (id: number): Promise<void> => {
    try {
        await database.team.delete({
            where: {
                id: id,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error, See server log for details.');
    }
};

export default { getAllTeams, getTeamById, addTeam, updateTeam, getTeamByName, removeTeam };
