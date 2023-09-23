import { IMessage } from "./IMessage";

export interface IConversation {
    id: number;
    user_id: number;
    status: string;
    created_at: Date;
    updated_at: Date;
    messages: IMessage[];
}

