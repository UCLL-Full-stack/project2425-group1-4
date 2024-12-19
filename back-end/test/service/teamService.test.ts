import teamService from '../service/team.service';
import teamDb from '../repository/team.db';
import userDb from '../repository/user.db';
import { Team } from '../model/team';
import { User } from '../model/user';

jest.mock('../repository/team.db');
jest.mock('../repository/user.db');

describe('teamService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllTeams', () => {
        it('should return all teams', async () => {
            const mockTeams = [new Team({ id: 1, name: 'Team A' }), new Team({ id: 2, name: 'Team B' })];
            teamDb.getAllTeams.mockResolvedValue(mockTeams);

            const result = await teamService.getAllTeams();

            expect(result).toEqual(mockTeams);
            expect(teamDb.getAllTeams).toHaveBeenCalledTimes(1);
        });
    });

    describe('getTeamsByName', () => {
        it('should return teams matching the name', async () => {
            const mockTeams = [new Team({ id: 1, name: 'Team A' })];
            teamDb.getTeamsByName.mockResolvedValue(mockTeams);

            const result = await teamService.getTeamsByName('Team A');

            expect(result).toEqual(mockTeams);
            expect(teamDb.getTeamsByName).toHaveBeenCalledWith('Team A');
        });

        it('should throw an error if no teams are found', async () => {
            teamDb.getTeamsByName.mockResolvedValue(null);

            await expect(teamService.getTeamsByName('Nonexistent')).rejects.toThrow('Could not find any teams with that name');
            expect(teamDb.getTeamsByName).toHaveBeenCalledWith('Nonexistent');
        });
    });

    describe('getTeamById', () => {
        it('should return the team by ID', async () => {
            const mockTeam = new Team({ id: 1, name: 'Team A' });
            teamDb.getTeamById.mockResolvedValue(mockTeam);

            const result = await teamService.getTeamById(1);

            expect(result).toEqual(mockTeam);
            expect(teamDb.getTeamById).toHaveBeenCalledWith(1);
        });

        it('should throw an error if ID is invalid', async () => {
            await expect(teamService.getTeamById('abc')).rejects.toThrow('Invalid Team ID. It must be a number.');
        });

        it('should throw an error if team is not found', async () => {
            teamDb.getTeamById.mockResolvedValue(null);

            await expect(teamService.getTeamById(99)).rejects.toThrow('Team with ID 99 not found.');
        });
    });

    describe('getTeamNameById', () => {
        it('should return the team name by ID', async () => {
            const mockTeam = new Team({ id: 1, name: 'Team A' });
            teamDb.getTeamById.mockResolvedValue(mockTeam);

            const result = await teamService.getTeamNameById(1);

            expect(result).toEqual('Team A');
            expect(teamDb.getTeamById).toHaveBeenCalledWith(1);
        });

        it('should return null if the team is not found', async () => {
            teamDb.getTeamById.mockResolvedValue(null);

            const result = await teamService.getTeamNameById(99);

            expect(result).toBeNull();
        });
    });

    describe('updateTeam', () => {
        it('should update the team', async () => {
            const mockTeam = new Team({ id: 1, name: 'Team A' });
            teamDb.getTeamById.mockResolvedValue(mockTeam);
            teamDb.updateTeam.mockResolvedValue(mockTeam);

            const result = await teamService.updateTeam(mockTeam);

            expect(result).toEqual(mockTeam);
            expect(teamDb.updateTeam).toHaveBeenCalledWith(mockTeam);
        });

        it('should throw an error if the team is not found', async () => {
            teamDb.getTeamById.mockResolvedValue(null);

            const mockTeam = new Team({ id: 1, name: 'Team A' });
            await expect(teamService.updateTeam(mockTeam)).rejects.toThrow('Team not found');
        });
    });

    describe('addPlayerToTeam', () => {
        it('should add a player to the team', async () => {
            const mockTeam = new Team({ id: 1, name: 'Team A', players: [] });
            const mockPlayer = new User({ id: 1, firstName: 'John', lastName: 'Doe' });

            teamDb.getTeamById.mockResolvedValue(mockTeam);
            userDb.getUserById.mockResolvedValue(mockPlayer);

            const result = await teamService.addPlayerToTeam(1, 1);

            expect(result).toBe(true);
            expect(teamDb.updateTeam).toHaveBeenCalledWith(mockTeam);
        });

        it('should return false if the team or player is not found', async () => {
            teamDb.getTeamById.mockResolvedValue(null);

            const result = await teamService.addPlayerToTeam(1, 1);

            expect(result).toBe(false);
        });
    });

    describe('removePlayerFromTeam', () => {
        it('should remove a player from the team', async () => {
            const mockTeam = new Team({ id: 1, name: 'Team A', players: [new User({ id: 1 })] });
            const mockPlayer = new User({ id: 1 });

            teamDb.getTeamById.mockResolvedValue(mockTeam);
            userDb.getUserById.mockResolvedValue(mockPlayer);

            const result = await teamService.removePlayerFromTeam(1, 1);

            expect(result).toBeTruthy();
            expect(teamDb.updateTeam).toHaveBeenCalledWith(mockTeam);
        });

        it('should return false if the team or player is not found', async () => {
            teamDb.getTeamById.mockResolvedValue(null);

            const result = await teamService.removePlayerFromTeam(1, 1);

            expect(result).toBe(false);
        });
    });
});
