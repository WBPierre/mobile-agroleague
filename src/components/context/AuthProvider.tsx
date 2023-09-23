import {createContext, useState} from "react";
import { AuthContextType } from "../../@types/auth";
import { IUser } from "../../@types/user";

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

/**
 * @param props
 * @returns JSX.Element
 */
export const AuthProvider = (props: any): JSX.Element => {

    const [user, setUser] = useState<IUser | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const updateUser = (user: IUser | null): void => {
        if(user){
            setIsAuth(true);
            setUser(user);
        }else{
            setIsAuth(false);
            setUser(null);
        }
    }

    const contextValue: AuthContextType = {
        user: user,
        updateUser,
        isSignedIn:isAuth,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}
