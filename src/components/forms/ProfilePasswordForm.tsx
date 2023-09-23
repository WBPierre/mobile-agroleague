import {Button, TextInput} from 'react-native-paper';
import { FC, useContext, useEffect, useState } from "react";
import {IUser} from '../../@types/User';
import {AuthContext} from '../context/AuthProvider';
import {base} from '../../styles/base';
import {View} from 'react-native';
import { UserService } from "../../services/user.service";
import Toast from "react-native-toast-message";
import ToastSuccess from "../elements/toasts/ToastSuccess";
import ToastError from "../elements/toasts/ToastError";

interface PasswordData {
	password: string;
	passwordConfirmation: string;
}

interface ProfilePasswordFormProps {
    allowEdition: boolean;
    setAllowEdition: (e: boolean) => void;
}


/**
 * @param props
 * @returns JSX.Element
 */
const ProfilePasswordForm:FC<ProfilePasswordFormProps> = (props): JSX.Element => {
	const context = useContext(AuthContext);
	const [data, setData] = useState<PasswordData>({
		password: '',
		passwordConfirmation: '',
	});

	const handleChange = (name: string, value: string): void => {
		setData({
			...data,
			[name]: value,
		});
	};

	const onSubmit = async () => {
		if (
			data.password &&
			data.password.length > 0 &&
			data.passwordConfirmation &&
			data.password === data.passwordConfirmation
		) {
            await UserService.updatePassword(data)
				.then(() => {
					ToastSuccess({message: "Password updated"})
				})
				.catch(e => {
					console.log('Error while changing password', e);
					ToastError({message: e});
				})
				.finally(() => {
					props.setAllowEdition(false);
				});
		}
	};

	return (
		<View>
			{props.allowEdition && (
				<>
					<TextInput
						label={'Password'}
						value={data.password}
						onChangeText={e => handleChange('password', e)}
						disabled={!props.allowEdition}
						secureTextEntry
						style={base.input}
					/>
					<TextInput
						label={'Confirmation'}
						value={data.passwordConfirmation}
						onChangeText={e =>
							handleChange('passwordConfirmation', e)
						}
						disabled={!props.allowEdition}
						secureTextEntry
						style={base.input}
					/>
				</>
			)}
            {props.allowEdition ?
                <>
                    <Button mode={"contained"} style={base.input} onPress={onSubmit}>Save</Button>
                    <Button mode={"outlined"} style={base.input} onPress={() => props.setAllowEdition(!props.allowEdition)}>Cancel</Button>
                </>
                :
                <Button mode={"contained"} style={base.input} onPress={() => props.setAllowEdition(!props.allowEdition)}>Change my password</Button>
            }
		</View>
	);
};

export default ProfilePasswordForm;
