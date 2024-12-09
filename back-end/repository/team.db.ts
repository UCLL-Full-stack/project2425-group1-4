import { Team } from '../model/team';
import database from './database';

const getAllTeams = async (): Promise<Team[]> => {
    try {
        const teamsPrisma = await database.team.findMany({
            include: {
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
                coach: team.getCoach() ? { connect: { id: team.getCoach()?.getId() } } : undefined,
                players: {
                    connect: team.getPlayers().map((player) => ({ id: player.getId() })),
                },
                description: team.getDescription(),
            },
            include: {
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

const updateTeam = async (updateTeam: Team): Promise<Team> => {
    try {
        const updateData: any = {
            name: updateTeam.getName(),
            players: {
                set: updateTeam.getPlayers().map((player) => ({ id: player.getId() })),
            },
            description: updateTeam.getDescription(),
        };

        const teamPrisma = await database.team.update({
            where: {
                id: updateData.getId(),
            },
            data: updateData,
            include: {
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

const getTeamsByName = async (name: string): Promise<Team[]> => {
    try {
        const teamsPrisma = await database.team.findMany({
            where: {
                name: name,
            },
            include: {
                coach: true,
                players: true,
            },
        });
        return teamsPrisma.map((teamPrisma) => Team.from(teamPrisma));
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

export default { getAllTeams, getTeamById, addTeam, updateTeam, getTeamsByName, removeTeam };
