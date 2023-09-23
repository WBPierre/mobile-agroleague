import { ApiService } from "./api.service";
class healthService extends ApiService {
    constructor() {
        super('/health');
    }

    async getStatus(){
        return this.get()
    }
}

export const HealthService = new  healthService();
