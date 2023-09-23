/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
	SafeAreaView,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppNavigator from './src/navigation/AppNavigator';
import { PaperProvider } from "react-native-paper";
import { AuthProvider } from "./src/components/context/AuthProvider";
import Toast from "react-native-toast-message";

type SectionProps = PropsWithChildren<{
	title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
	const isDarkMode = useColorScheme() === 'dark';
	return (
		<View style={styles.sectionContainer}>
			<Text
				style={[
					styles.sectionTitle,
					{
						color: isDarkMode ? Colors.white : Colors.black,
					},
				]}>
				{title}
			</Text>
			<Text
				style={[
					styles.sectionDescription,
					{
						color: isDarkMode ? Colors.light : Colors.dark,
					},
				]}>
				{children}
			</Text>
		</View>
	);
}

function App(): JSX.Element {
	return (
		<>
			<AuthProvider>
				<PaperProvider>
					<AppNavigator />
				</PaperProvider>
			</AuthProvider>
			<Toast />
		</>
	);
}

const styles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
	},
	highlight: {
		fontWeight: '700',
	},
});

export default App;
