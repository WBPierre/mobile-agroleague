import React, { useContext } from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ConversationScreen from '../screens/ConversationScreen';
import { AuthContext } from "../components/context/AuthProvider";
import { ConversationParamList } from "../@types/NavigatorParamList";

const Stack = createNativeStackNavigator<ConversationParamList>();

/**
 * @returns JSX.Element
 */
function AppNavigator(): JSX.Element {
    const context = useContext(AuthContext);

    return (
        <Stack.Navigator
            initialRouteName="ConversationList"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="ConversationList" component={HomeScreen} />
            <Stack.Screen name="Conversation" component={ConversationScreen} />
        </Stack.Navigator>
    );
}

export default AppNavigator;
