import {
    Goal as GoalPrisma,
    Location as LocationPrisma,
    Team as TeamPrisma,
    Match as MatchPrisma,
    User as UserPrisma,
} from '@prisma/client';
import { Location } from './location';
import { Team } from './team';

export class Match {
    private id: number;
    private date: Date;
    private location: Location;

    constructor(match: { id: number; date: Date; location: Location }) {
        this.validate(match);

        this.id = match.id;
        this.date = match.date;
        this.location = match.location;
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

    getLocation(): Location {
        return this.location;
    }

    // Setters
    setId(id: number): void {
        this.id = id;
    }

    setDate(date: Date): void {
        this.date = date;
    }

    setLocation(location: Location): void {
        this.location = location;
    }

    static from({
        id,
        date,
        location,
    }: MatchPrisma & {
        location: LocationPrisma;
    }): Match {
        return new Match({
            id,
            date,
            location: Location.from(location),
        });
    }

    // static from({
    //     id,
    //     date,
    //     location,
    //     goals,
    //     teams,
    // }: MatchPrisma & {
    //     location: LocationPrisma;
    //     goals: GoalPrisma[];
    //     teams: Team[];
    // }): Match {
    //     return new Match({
    //         id,
    //         date,
    //         location: Location.from(location),
    //         goals: goals.map((goal) => Goal.from(goal)),
    //         teams: teams.map((team) => Team.from(team)),
    //     });
    // }

    // static from({
    //     id,
    //     date,
    //     location,
    //     goals,
    //     teams,
    // }: MatchPrisma & {
    //     location: LocationPrisma;
    //     goals: GoalPrisma[];
    //     teams: (TeamPrisma & { players: UserPrisma[] })[];
    // }): Match {
    //     return new Match({
    //         id,
    //         date,
    //         location: Location.from(location),
    //         goals: goals.map((goal) => Goal.from(goal)),
    //         teams: teams.map((team) => Team.from(team)), // Use Team.from here
    //     });
    // }
}
