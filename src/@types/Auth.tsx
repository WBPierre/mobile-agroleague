import { IUser } from "./user";

export type AuthContextType = {
	user: IUser | null;
	updateUser: (user: any) => void;
	isSignedIn: boolean;
};
