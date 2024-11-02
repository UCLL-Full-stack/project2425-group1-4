export type Goal = {
    id: number;
    time: number;
};

export type Location = {
    id: number;
    country: string;
    city: string;
    streetName: string;
    zipCode: number;
    number: number;
};

export type Match = {
    id: number;
    date: Date;
};

export type Team = {
    id: number;
    name: string;
    captain: User;
    coach: User;
    players: User[];
    description: string;
};

export type User = {
    id: number;
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
