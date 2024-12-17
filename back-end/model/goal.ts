import { Goal as GoalPrisma } from '@prisma/client';

export class Goal {
    private id: number;
    private time: number;
    private teamId: number;

    constructor(goal: { id: number; time: number; teamId: number }) {
        this.validate(goal);

        this.id = goal.id;
        this.time = goal.time;
        this.teamId = goal.teamId;
    }

    // Needs to properly be implemented
    validate(goal: { id: number; time: number; teamId: number }) {
        if (!goal.id) {
            throw new Error('Goal id is required');
        }

        if (!goal.time) {
            throw new Error('Goal time is required');
        }
        if (goal.time < 0) {
            throw new Error('Goal time must be greater than 0');
        }
        if (goal.time > 90) {
            throw new Error('Goal time must be under 90');
        }
        if (!goal.teamId) throw new Error('Team ID is required');
    }

    // Getters
    getId() {
        return this.id;
    }

    getTime() {
        return this.time;
    }

    getTeamId(): number {
        return this.teamId;
    }

    // Setters
    setId(id: number) {
        this.id = id;
    }

    setTime(time: number) {
        this.time = time;
    }

    setTeamId(teamId: number) {
        this.teamId = teamId;
    }

    // Prisma Goal to Goal
    static from({ id, time, teamId }: GoalPrisma) {
        return new Goal({ id, time, teamId });
    }

    equals(goal: Goal) {
        return this.id === goal.id && this.time === goal.time && this.teamId === goal.teamId;
    }
}
