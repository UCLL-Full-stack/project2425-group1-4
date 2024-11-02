import { Goal as GoalPrisma } from '@prisma/client';

export class Goal {
    private id: number;
    private time: number;

    constructor(goal: { id: number; time: number }) {
        this.validate(goal);

        this.id = goal.id;
        this.time = goal.time;
    }

    // Needs to properly be implemented
    validate(goal: { id: number; time: number }) {
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
    }

    // Getters
    getId() {
        return this.id;
    }

    getTime() {
        return this.time;
    }

    // Setters
    setId(id: number) {
        this.id = id;
    }

    setTime(time: number) {
        this.time = time;
    }

    // Prisma Goal to Goal
    static from({ id, time }: Goal) {
        return new Goal({ id, time });
    }

    equals(goal: Goal) {
        return this.id === goal.id && this.time === goal.time;
    }
}
