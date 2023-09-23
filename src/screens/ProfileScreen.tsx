import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { base } from "../styles/base";
import { TokenService } from "../services/token.service";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/context/AuthProvider";
import { HealthService } from "../services/health.service";
import { AuthService } from "../services/auth.service";
import { Button, TextInput } from "react-native-paper";
import { IUser } from "../@types/User";
import { UserService } from "../services/user.service";
import ProfileUserForm from "../components/forms/ProfileUserForm";
import ProfilePasswordForm from "../components/forms/ProfilePasswordForm";


/**
 * @returns JSX.Element
 */
function ProfileScreen(): JSX.Element {
	const context = useContext(AuthContext);
	const [allowEdition, setAllowEdition] = useState<boolean>(false);
	const [allowPasswordEdition, setAllowPasswordEdition] = useState<boolean>(false);

	const logout = async () => {
		await TokenService.removeToken()
			.then(() => {
				// @ts-ignore
				context.updateUser(null);
			})
	}

	return (
		<SafeAreaView
			style={base.container}>
			<View style={base.innerContainer}>
				<Text style={base.sectionTitle}>My profile</Text>
				<ScrollView style={[base.fullHeight, base.section]}>
					{!allowPasswordEdition && <ProfileUserForm allowEdition={allowEdition} setAllowEdition={setAllowEdition}/>}
					{!allowEdition && <ProfilePasswordForm allowEdition={allowPasswordEdition} setAllowEdition={setAllowPasswordEdition}/>}
					{!allowEdition && !allowPasswordEdition && <Button mode={"outlined"} style={base.input} onPress={logout}>Logout</Button>}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({

});


export default ProfileScreen;
