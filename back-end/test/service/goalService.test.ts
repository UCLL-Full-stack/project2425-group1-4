import goalService from '../service/goal.service';
import goalDb from '../repository/goal.db';

jest.mock('../repository/goal.db');

describe('goalService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('validateGoalIds', () => {
        it('should not throw an error if all goal IDs exist', async () => {
            goalDb.getGoalsByIds.mockResolvedValue([{ id: 1 }, { id: 2 }]);

            await expect(goalService.validateGoalIds([1, 2])).resolves.not.toThrow();
        });

        it('should throw an error if any goal IDs do not exist', async () => {
            goalDb.getGoalsByIds.mockResolvedValue([{ id: 1 }]);

            await expect(goalService.validateGoalIds([1, 2])).rejects.toThrow(
                'One or more goal IDs do not exist.'
            );
        });
    });

    describe('getGoalsWithDetails', () => {
        it('should return goals if they exist for the given match ID', async () => {
            const goals = [
                { id: 1, time: 15, matchId: 1 },
                { id: 2, time: 45, matchId: 1 },
            ];
            goalDb.getGoalsWithDetails.mockResolvedValue(goals);

            const result = await goalService.getGoalsWithDetails(1);
            expect(result).toEqual(goals);
        });

        it('should throw an error if no goals are found for the given match ID', async () => {
            goalDb.getGoalsWithDetails.mockResolvedValue([]);

            await expect(goalService.getGoalsWithDetails(1)).rejects.toThrow(
                'No goals were found for given ID.'
            );
        });
    });

    describe('deleteGoal', () => {
        it('should delete the goal if the goal ID exists', async () => {
            goalDb.getGoalsByIds.mockResolvedValue([{ id: 1 }]);
            goalDb.deleteGoal.mockResolvedValue({ id: 1, time: 15 });

            const result = await goalService.deleteGoal(1);
            expect(result).toEqual({ id: 1, time: 15 });
            expect(goalDb.deleteGoal).toHaveBeenCalledWith(1);
        });

        it('should throw an error if the goal ID is invalid', async () => {
            await expect(goalService.deleteGoal(NaN)).rejects.toThrow('Invalid goal ID');
        });

        it('should throw an error if the goal is not found', async () => {
            goalDb.getGoalsByIds.mockResolvedValue([]);

            await expect(goalService.deleteGoal(1)).rejects.toThrow('Goal not found');
        });
    });
});
