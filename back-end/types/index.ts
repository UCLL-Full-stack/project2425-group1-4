type Role = 'USER' | 'PLAYER' | 'COACH' | 'ADMIN';

type UserInput = {
    id?: number;
    firstName: string;
    lastName: string;
    password: string;
    birthDate: Date;
    email: string;
    username: string;
    description?: string;
    role: string;
    coachOfTeam?: number;
    playerOfTeam?: number;
    goals?: GoalInput[];
};

type TeamInput = {
    id?: number;
    name: string;
    description: string;
    coachId: number;
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

type AuthenticationResponse = {
    token: string;
    username: string;
    fullname: string;
    role: string;
};
export type {
    Role,
    UserInput,
    TeamInput,
    GoalInput,
    MatchInput,
    LocationInput,
    AuthenticationResponse,
};
