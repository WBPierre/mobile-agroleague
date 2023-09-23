import { Button, TextInput } from "react-native-paper";
import { FC, useContext, useEffect, useState } from "react";
import { IUser } from "../../@types/User";
import { AuthContext } from "../context/AuthProvider";
import { base } from "../../styles/base";
import { UserService } from "../../services/user.service";
import ToastSuccess from "../elements/toasts/ToastSuccess";
import ToastError from "../elements/toasts/ToastError";

interface ProfileUserFormProps {
    allowEdition: boolean;
    setAllowEdition: (e: boolean) => void;
}

/**
 * @param props
 * @returns JSX.Element
 */
const ProfileUserForm: FC<ProfileUserFormProps> = (props):JSX.Element => {
    const context = useContext(AuthContext);
    const [data, setData] = useState<IUser>({
        id: 0,
        firstname: "",
        lastname: "",
        email: ""
    });

    useEffect(() => {
        if(context.user !== null){
            setData({...context.user});
        }
    }, [context.user]);

    const handleChange = (name:string, value: string): void => {
        setData({
            ...data,
            [name]: value
        })
    }

    const onSubmit = async () => {
        await UserService.update({ ...data, id: context?.user?.id }).then((res) => {
            context.updateUser(res.data);
            ToastSuccess({message: "Profile updated"})
        }).catch((e) => {
            console.log("Error while changing user profile", e);
            ToastError({message: e});
        }).finally(() => {
            props.setAllowEdition(false);
        })
    }

    return(
        <>
            <TextInput
                label={"Firstname"}
                value={data.firstname}
                onChangeText={(e) => handleChange('firstname', e)}
                disabled={!props.allowEdition}
                style={base.input}
            />
            <TextInput
                label={"Lastname"}
                value={data.lastname}
                onChangeText={(e) => handleChange('lastname', e)}
                disabled={!props.allowEdition}
                style={base.input}
            />
            <TextInput
                label={"Email"}
                value={data.email}
                onChangeText={(e) => handleChange('email', e)}
                disabled={!props.allowEdition}
                style={base.input}
            />
            {props.allowEdition ?
                <>
                    <Button mode={"contained"} style={base.input} onPress={onSubmit}>Save</Button>
                    <Button mode={"outlined"} style={base.input} onPress={() => props.setAllowEdition(!props.allowEdition)}>Cancel</Button>
                </>
                :
                <Button mode={"contained"} style={base.input} onPress={() => props.setAllowEdition(!props.allowEdition)}>Change my profile</Button>
            }

        </>
    )
}

export default ProfileUserForm;
