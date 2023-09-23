import React, { useContext } from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import {TabNavigation} from './TabNavigation';
import { AuthContext } from "../components/context/AuthProvider";
import { NavigatorParamList } from "../@types/NavigatorParamList";

const Stack = createNativeStackNavigator<NavigatorParamList>();


/**
 * @returns JSX.Element
 */
function AppNavigator(): JSX.Element {
    const context = useContext(AuthContext);

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Login"
				screenOptions={{headerShown: false}}>
				{!context.isSignedIn ? (
                    <Stack.Screen name="Login" component={LoginScreen} />
				) : (
                    <Stack.Screen name="TabNavigation" component={TabNavigation} />
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default AppNavigator;
