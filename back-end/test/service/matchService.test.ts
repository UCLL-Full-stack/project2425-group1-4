import matchService from '../service/match.service';
import matchDb from '../repository/match.db';

jest.mock('../repository/match.db');

describe('matchService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllMatches', () => {
        it('should return all matches', async () => {
            const mockMatches = [
                { id: 1, date: new Date(), teams: [], location: {}, goals: [] },
                { id: 2, date: new Date(), teams: [], location: {}, goals: [] },
            ];

            (matchDb.getAllMatches as jest.Mock).mockResolvedValue(mockMatches);

            const result = await matchService.getAllMatches();

            expect(matchDb.getAllMatches).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockMatches);
        });
    });

    describe('getMatchById', () => {
        it('should return a match by id', async () => {
            const mockMatch = {
                id: 1,
                date: new Date(),
                teams: [],
                location: {},
                goals: [],
            };

            (matchDb.getMatchById as jest.Mock).mockResolvedValue(mockMatch);

            const result = await matchService.getMatchById('1');

            expect(matchDb.getMatchById).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockMatch);
        });

        it('should throw an error if the match does not exist', async () => {
            (matchDb.getMatchById as jest.Mock).mockResolvedValue(null);

            await expect(matchService.getMatchById('1')).rejects.toThrow(
                'Match with id: 1 does not exist.'
            );
            expect(matchDb.getMatchById).toHaveBeenCalledWith(1);
        });
    });

    describe('getLatestMatches', () => {
        it('should return the latest matches with default limit', async () => {
            const mockMatches = [
                { id: 1, date: new Date(), teams: [], location: {}, goals: [] },
            ];

            (matchDb.getLatestMatches as jest.Mock).mockResolvedValue(mockMatches);

            const result = await matchService.getLatestMatches({});

            expect(matchDb.getLatestMatches).toHaveBeenCalledWith({ teamId: undefined, limit: 5 });
            expect(result).toEqual(mockMatches);
        });

        it('should return the latest matches with specified limit', async () => {
            const mockMatches = [
                { id: 1, date: new Date(), teams: [], location: {}, goals: [] },
            ];

            (matchDb.getLatestMatches as jest.Mock).mockResolvedValue(mockMatches);

            const result = await matchService.getLatestMatches({ limit: 10 });

            expect(matchDb.getLatestMatches).toHaveBeenCalledWith({ teamId: undefined, limit: 10 });
            expect(result).toEqual(mockMatches);
        });

        it('should throw an error if limit is non-positive', async () => {
            await expect(matchService.getLatestMatches({ limit: 0 })).rejects.toThrow(
                'Limit must be a positive number'
            );

            expect(matchDb.getLatestMatches).not.toHaveBeenCalled();
        });

        it('should return latest matches filtered by teamId', async () => {
            const mockMatches = [
                { id: 1, date: new Date(), teams: [], location: {}, goals: [] },
            ];

            (matchDb.getLatestMatches as jest.Mock).mockResolvedValue(mockMatches);

            const result = await matchService.getLatestMatches({ teamId: 1 });

            expect(matchDb.getLatestMatches).toHaveBeenCalledWith({ teamId: 1, limit: 5 });
            expect(result).toEqual(mockMatches);
        });

        it('should throw a generic error if matchDb.getLatestMatches fails', async () => {
            (matchDb.getLatestMatches as jest.Mock).mockRejectedValue(new Error('DB error'));

            await expect(matchService.getLatestMatches({})).rejects.toThrow('Failed to fetch latest matches.');
        });
    });
});
