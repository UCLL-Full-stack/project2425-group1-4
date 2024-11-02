import { Team, User, Goal, Match, Location } from '@prisma/client';

export interface UserDTO {
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
}
