import {
    Goal as GoalPrisma,
    Location as LocationPrisma,
    Match as MatchPrisma,
} from '@prisma/client';
import { Goal } from './goal';
import { Location } from './location';

export class Match {
    private id: number;
    private date: Date;
    private goals: Goal[];
    private location: Location;
    private teams: { id: number; name: string; description: string }[];

    constructor(match: {
        id: number;
        date: Date;
        goals?: Goal[];
        location: Location;
        teams?: { id: number; name: string; description: string }[];
    }) {
        this.validate(match);

        this.id = match.id;
        this.date = match.date;
        this.goals = match.goals || [];
        this.location = match.location;
        this.teams = match.teams || [];
    }

    // Needs to be properly implemented
    validate(match: { id: number; date: Date; location: Location }): void {
        if (!match.id) {
            throw new Error('Match id is required');
        }
        if (!match.date) {
            throw new Error('Match date is required');
        }
        if (!match.location) {
            throw new Error('Match location is required');
        }
    }

    // Getters
    getId(): number {
        return this.id;
    }

    getDate(): Date {
        return this.date;
    }

    getGoals(): Goal[] {
        return this.goals;
    }

    getLocation(): Location {
        return this.location;
    }

    getTeams(): { id: number; name: string; description: string }[] {
        return this.teams;
    }

    getTeamScores(): { teamAScore: number; teamBScore: number } {
        const teamAScore = this.goals.filter((goal) => goal.getTeamId() === this.teams[0]?.id).length;
        const teamBScore = this.goals.filter((goal) => goal.getTeamId() === this.teams[1]?.id).length;

        return {
            teamAScore,
            teamBScore,
        };
    }

    // Setters
    setId(id: number): void {
        this.id = id;
    }

    setDate(date: Date): void {
        this.date = date;
    }

    setGoals(goals: Goal[]): void {
        this.goals = goals;
    }

    setLocation(location: Location): void {
        this.location = location;
    }

    setTeams(teams: { id: number; name: string; description: string }[]) {
        this.teams = teams;
    }

    static from({
        id,
        date,
        location,
        goals,
        teams,
    }: MatchPrisma & {
        location: LocationPrisma;
        goals: GoalPrisma[];
        teams: {
            team: { id: number; name: string; description: string };
        }[];
    }): Match {
        return new Match({
            id,
            date,
            location: Location.from(location),
            goals: goals.map((goal) => Goal.from(goal)), // Updated Goal class handles teamId
            teams: teams.map((matchTeam) => ({
                id: matchTeam.team.id,
                name: matchTeam.team.name,
                description: matchTeam.team.description,
            })),
        });
    }
}
