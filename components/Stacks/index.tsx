import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from '../../screens/Home';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// const HomeScreen = () => {
//     return (
//         <Tab.Navigator>
//             <Tab.Screen name="Home" component={Home} />
//         </Tab.Navigator>
//     )
// }

export default function Stacks() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}