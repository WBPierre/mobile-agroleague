export interface IUser {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password?: string;
    status?: string;
    role?: string;
}
