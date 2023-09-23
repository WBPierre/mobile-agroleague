import EncryptedStorage from "react-native-encrypted-storage";

class tokenService {
    async saveToken(token: string): Promise<void> {
        try {
            await EncryptedStorage.setItem(
                "user_session",
                JSON.stringify({
                    token
                })
            )
        } catch (e) {
            console.log("Error while storing token", e);
        }
    }

    async removeToken(): Promise<void> {
        try{
            await EncryptedStorage.removeItem(
                "user_session"
            )
        } catch (e) {
            console.log("Error while removing token", e);
        }
    }

    async getToken(): Promise<any> {
        try{
            return await EncryptedStorage.getItem(
                "user_session"
            )
        } catch (e) {
            console.log("Error while fetching token", e);
        }
    }
}

export const TokenService = new  tokenService();
