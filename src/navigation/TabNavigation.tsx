import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ConversationNavigation from "./ConversationNavigation";
import { TabParamList } from "../@types/NavigatorParamList";

const Tab = createBottomTabNavigator<TabParamList>();

/**
 * @returns JSX.Element
 */
export const TabNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName={"Home"}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    // You can return any component that you like here!
                    // @ts-ignore
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}>
            <Tab.Screen name="Home" component={ConversationNavigation} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>

    )
}
