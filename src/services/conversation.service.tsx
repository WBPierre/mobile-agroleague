import { ApiService } from "./api.service";

class conversationService extends ApiService {
    constructor() {
        super('/conversations');
    }

    sendMessage(body: any) {
        return this.post(body);
    }

    update(id: number, body: any) {
        return this.put(
            `/${id}`,
            body
        );
    }
}

export const ConversationService = new  conversationService();
