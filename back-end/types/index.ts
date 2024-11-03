import { Team, User, Goal, Match, Location } from '@prisma/client';

type Role = 'Player' | 'Coach' | 'Captain' | 'Admin';

type PublicUser = {
    id?: number;
    firstName?: string;
    lastName?: string;
    birthDate?: Date;
    email?: string;
    username?: string;
    description?: string;
    role?: string;
    coachOfTeam?: number;
    captainOfTeam?: number;
    playerOfTeam?: number;
    goals?: Goal[];
};

type UserInput = {
    id?: number;
    firstName: string;
    lastName: string;
    password: string;
    birthDate: Date;
    email: string;
    username: string;
    description: string;
    role: string;
    coachOfTeam?: number;
    captainOfTeam?: number;
    playerOfTeam?: number;
    goals?: Goal[];
};

type TeamInput = {
    id?: number;
    name: string;
    description: string;
    coachId: number;
    captainId: number;
    players: number[];
    matches: number[];
};

type GoalInput = {
    id?: number;
    matchId: number;
    playerId: number;
    time: Date;
    description: string;
};

type MatchInput = {
    id?: number;
    homeTeam: number;
    awayTeam: number;
    date: Date;
    location: number;
    goals: number[];
};

type LocationInput = {
    id?: number;
    name: string;
    city: string;
    country: string;
};

export type { Role, UserInput, TeamInput, GoalInput, MatchInput, LocationInput, PublicUser };
