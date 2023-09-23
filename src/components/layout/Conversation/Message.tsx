import { IMessage } from "../../../@types/IMessage";
import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import DateFormater from "../../elements/utils/DateFormater";


/**
 * @param item
 * @returns JSX.Element
 */
const Message = (item: IMessage) => {
    const context = useContext(AuthContext);

    return (
        <View>
            <View style={[styles.message, item.user_id === context?.user?.id ? styles.sent : styles.received]}>
                <Text style={[styles.text, item.user_id === context?.user?.id ? styles.textSent : styles.textReceived]}>{item.text}</Text>
                <Text style={styles.messageDate}>{DateFormater(item.created_at)}</Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    message: {
        color: 'black',
        marginBottom: '5%'
    },
    sent:{
        alignItems: "flex-end"
    },
    received:{
        alignItems: "flex-start",
    },
    text: {
        padding: 10,
        width: '70%',
        borderRadius: 10,
        fontSize: 16,
    },
    textSent: {
        backgroundColor: "rgb(147, 197, 253)",

    },
    textReceived: {
        backgroundColor: "rgb(209, 213, 219)",
    },
    messageDate: {
        fontSize: 12,
        color: "rgb(75, 85, 99)"
    }
})

export default Message;
