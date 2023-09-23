import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useRef, useState } from "react";
import { IConversation } from "../@types/IConversation";
import { AuthContext } from "../components/context/AuthProvider";
import { ConversationService } from "../services/conversation.service";
import { base } from "../styles/base";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateFormater from "../components/elements/utils/DateFormater";
import { Button, TextInput } from "react-native-paper";
import Message from "../components/layout/Conversation/Message";
import toastError from "../components/elements/toasts/ToastError";
import ToastInfo from "../components/elements/toasts/ToastInfo";
import ToastError from "../components/elements/toasts/ToastError";


/**
 * @returns JSX.Element
 */
function ConversationScreen(): JSX.Element {
    const navigation = useNavigation();
    const route = useRoute();

    const scrollViewRef = useRef();
    const context = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<string>("");
    const [conversation, setConversation] = useState<IConversation>({} as IConversation);
    const [itemId, setItemId] = useState<number | null>(null);

    useEffect(() => {
        // @ts-ignore
        if(route.params?.itemId){
            // @ts-ignore
            setItemId(route.params.itemId)
        }
    }, [route.params]);

    useEffect(() => {
        if (itemId) {
            fetchConversation();
        }
    }, [itemId]);

    const fetchConversation = async () => {
        if(itemId){
            await ConversationService.getOne(itemId)
                .then((res) => {
                    setConversation(res.data);
                    setLoading(false);
                })
                .catch((e) => {
                    console.log("Error while fetching conversation");
                    ToastError(e)
                });
        }
    };

    const archiveConversation = async () => {
        if(itemId){
            await ConversationService.update(itemId, {status: "archived"})
                .then(() => {
                    fetchConversation();
                })
                .catch((e) => {
                    console.log("Error while fetching conversation");
                    ToastError(e)
                });
        }
    }

    const sendMessage = async () => {
        if(message.length === 0) {
            ToastInfo({message: "Message cannot be empty"});
            return;
        }
        await ConversationService.sendMessage({id: itemId ? itemId : null, message})
            .then((res) => {
                setItemId(res.data.topic_id);
                fetchConversation();
                setMessage('');
            })
            .catch((e) => {
                toastError(e);
            })
    }


    return (
		<SafeAreaView style={base.container}>
			<View style={base.innerContainer}>
				<Text style={base.sectionTitle}>
					{itemId ? `My conversation ${itemId}` : 'New conversation'}
				</Text>
				<Text style={base.sectionDescription}>
					{itemId &&
						`Started on ${DateFormater(conversation.created_at)}`}
				</Text>
				<View style={styles.buttonBar}>
					<Button
						mode={'outlined'}
						onPress={() => navigation.goBack()}>
						Back to the list
					</Button>
					{itemId && (
						<Button
							mode={'contained'}
							onPress={() => fetchConversation()}>
							Refresh
						</Button>
					)}
				</View>
				{context?.user?.role === 'admin' && conversation.status !== 'archived' && (
					<Button
						mode={'outlined'}
						onPress={() => archiveConversation()}>
						Archive conversation
					</Button>
				)}

				<ScrollView
					style={[base.fullHeight, base.section]}
					ref={scrollViewRef}
					onContentSizeChange={() =>
						scrollViewRef.current.scrollToEnd({animated: true})
					}>
					{!loading &&
						conversation.messages.map((item, idx) => (
							<Message
								key={idx}
								id={item.id}
								user_id={item.user_id}
								user={item.user}
								status={item.status}
								text={item.text}
								created_at={item.created_at}
								updated_at={item.updated_at}
							/>
						))}
				</ScrollView>

				{conversation.status !== 'archived' && (
					<View>
						<TextInput
							multiline
							label={'Your message'}
							value={message}
							onChangeText={e => setMessage(e)}
							right={
								<TextInput.Icon
									icon={'send'}
									onPress={() => sendMessage()}
								/>
							}
						/>
					</View>
				)}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
    buttonBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: "5%"
    },
    button: {
        marginHorizontal: 5
    }
});

export default ConversationScreen;
