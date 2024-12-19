import goalService from '../../service/goal.service';
import goalDb from '../../repository/goal.db';

let mockGoalDbDeleteGoalById: jest.Mock;
mockGoalDbDeleteGoalById = jest.fn();
goalService.deleteGoal = mockGoalDbDeleteGoalById;

let mockGoals = [
    {
        id: 1,
        time: 45,
        matchId: 2,
        teamId: 1,
        playerId: 3,
    },
    {
        id: 2,
        time: 60,
        matchId: 2,
        teamId: 2,
        playerId: 4,
    },
];


