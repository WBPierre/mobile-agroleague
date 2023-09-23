import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { IConversation } from "../@types/IConversation";
import { AuthContext } from "../components/context/AuthProvider";
import { ConversationService } from "../services/conversation.service";
import { AxiosResponse } from "axios";
import { base } from "../styles/base";
import {List} from 'react-native-paper';
import ListItem from "../components/elements/list/ListItem";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigatorProps } from "react-native-screens/lib/typescript/native-stack/types";


/**
 * @returns JSX.Element
 */
function HomeScreen(): JSX.Element {
	const context = useContext(AuthContext);
	const navigation = useNavigation<NativeStackNavigatorProps>();
	const [conversations, setConversations] = useState<IConversation[]>([]);

	useEffect(() => {

		const unsubscribe = navigation.addListener('focus', () => {
			fetchConversations();
		});

		return unsubscribe;

	}, [navigation]);

	const fetchConversations = async () => {
		await ConversationService.get()
			.then((res) => {
				setConversations(res.data);
			})
			.catch((e) => {
				console.log('Error while fetching conversations');
			});
	}

	return (
		<SafeAreaView
			style={base.container}>
			<View style={base.innerContainer}>
				<Text style={base.sectionTitle}>My conversations</Text>
				<ScrollView style={[base.fullHeight, base.section]}>
					{context?.user?.role !== 'admin' &&
						<List.Item
							style={base.listItem}
							onPress={() => navigation.navigate('Conversation')}
							title={`New conversation`}
							description={"Press to start a new conversation"}
							right={props => <List.Icon {...props} icon={"arrow-right-bold"}/>}
						/>
					}
					{conversations.map((item, idx) => (
						<ListItem
							key={idx}
							navigate={() => navigation.navigate('Conversation', {itemId: item.id})}
							id={item.id}
							user_id={item.user_id}
							status={item.status}
							created_at={item.created_at}
							updated_at={item.updated_at}
							messages={item.messages}/>
					))}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
})

export default HomeScreen;
