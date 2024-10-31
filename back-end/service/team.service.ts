import teamDb from "../domain/data-access/user.db";

const getAllTeams() = async (): Promise<Team[]> => {
  return await teamDb.getAllTeams();
}


const getTeamsByName = async (name: string): Promise<Team[]> => {
    const teams = await teamDb.getTeamsByName(name);

    if (teams.length === 0 && !accept_null) {
        throw new Error("No teams found");
    }

    return teams;
}


const getTeamById = async (id: string): Promise<Team> => {
    const team = await teamDb.getTeamById(id);

    if (!team && !accept_null) {
        throw new Error("Team not found");
    }

    return team;
}

export default {getAllTeams, getTeamsByName, getTeamById};