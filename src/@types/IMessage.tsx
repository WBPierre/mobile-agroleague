import { IUser } from "./User";

export type IMessage = {
    id: number;
    user_id: number;
    user: IUser;
    status: string;
    text: string;
    created_at: Date;
    updated_at: Date;
}
