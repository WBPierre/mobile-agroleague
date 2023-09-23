import { ApiService } from "./api.service";
class authService extends ApiService {
    constructor() {
        super('/auth');
    }

    async login(email: string, password: string){
        return this.post({
            email: email,
            password: password
        });
    }
}

export const AuthService = new  authService();
