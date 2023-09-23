import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useContext, useState} from 'react';
import {AuthContext} from '../components/context/AuthProvider';
import {base} from '../styles/base';
import {Avatar, TextInput} from 'react-native-paper';
import { HealthService } from "../services/health.service";
import { AuthService } from "../services/auth.service";
import { AxiosResponse } from "axios";
import { TokenService } from "../services/token.service";


/**
 * @returns JSX.Element
 */
function LoginScreen(): JSX.Element {
	const context = useContext(AuthContext);
	const [email, setEmail] = useState<string>('pierre@agro-league.com');
	const [password, setPassword] = useState<string>('user');

	const handleChange = (type: string, value: string) => {
		switch (type) {
			case 'email':
				setEmail(value);
				break;
			case 'password':
				setPassword(value);
				break;
		}
	};

	const onSubmit = async (): Promise<void> => {
		await AuthService.login(email, password)
			.then(async (res: AxiosResponse) => {
				await TokenService.saveToken(res.data.token);
				context.updateUser(res.data.user);
			})
			.catch((e) => {
				console.log("Error while signing in", e);
			})
	}


	return (
		<View style={[base.container, base.centered]}>
			<View style={[base.centered, {flex: 2}]}>
				<Avatar.Image
					size={128}
					source={require('./../../assets/logo.png')}
					style={base.clear}
				/>
			</View>
			<View style={[{flex: 3}, base.fullWidth]}>
				<View style={[styles.inputView]}>
					<TextInput
						style={base.fullWidth}
						label={'Email'}
						value={email}
						autoCapitalize='none'
						textContentType={'emailAddress'}
						onChangeText={e => setEmail(e)}
					/>
				</View>
				<View style={styles.inputView}>
					<TextInput
						style={base.fullWidth}
						label={'Password'}
						value={password}
						secureTextEntry
						autoCapitalize='none'
						onChangeText={e => setPassword(e)}
					/>
				</View>
				<TouchableOpacity style={[base.centered, styles.loginBtn]} onPress={() => onSubmit()}>
					<Text style={styles.loginText}>Login</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	inputView: {
		height: '10%',
		alignItems: 'center',
		margin: 20,
	},
	loginBtn: {
		borderRadius: 25,
		height: '10%',
		backgroundColor: '#eb3c24',
		margin: 20,
	},
	loginText: {
		fontSize: 16,
		fontWeight: '700',
		color: 'white'
	},
});

export default LoginScreen;
