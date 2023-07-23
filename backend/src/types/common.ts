import { Roles } from "./apiResponses.js";

export interface Champion {
    id: number;
    name: string;
    icon: string;
    loses: number;
    wins: number;
    role: Roles;
}[]