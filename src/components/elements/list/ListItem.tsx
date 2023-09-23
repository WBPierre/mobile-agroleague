import DateFormater from "../utils/DateFormater";
import { List } from "react-native-paper";
import { IConversation } from "../../../@types/IConversation";
import StatusFormater from "../utils/StatusFormater";
import { useNavigation } from "@react-navigation/native";
import { base } from "../../../styles/base";

interface ListItemProps extends IConversation{
    navigate: any;
}

/**
 * @param item
 * @returns JSX.Element
 */
const ListItem = (item: ListItemProps):JSX.Element => {
    const navigation = useNavigation();

    return (
        <List.Item
            style={base.listItem}
            onPress={item.navigate}
            title={`Conversation ${item.id} (${StatusFormater(item.status)})`}
            description={DateFormater(item.created_at)}
            left={props => <List.Icon {...props} icon={"inbox"}/>}
            right={props => <List.Icon {...props} icon={"arrow-right-bold"}/>}
        />
    )
}
export default ListItem;
