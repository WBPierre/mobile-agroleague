import { ApiService } from "./api.service";
import { AxiosResponse } from "axios";

class userService extends ApiService {
    constructor() {
        super('/users');
    }

    update(body: any) {
        return this.put( "/", body);
    }

    updatePassword(body: any) {
        return this.put("/password", body);
    }


}

export const UserService = new  userService();
