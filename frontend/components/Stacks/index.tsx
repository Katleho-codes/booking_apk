import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from '../../screens/Home';
import PromptsScreen from '../../screens/PromptsScreen';
import BookingForm from '../../screens/BookingForm';
import ImeiScanner from '../../screens/Scanners/ImeiScanner';
import BackupTerms from '../../screens/BackupTerms';
import Terms from '../../screens/Terms';


const Stack = createNativeStackNavigator();
const TopTabs = createMaterialTopTabNavigator();


export default function Stacks() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Prompts"
                component={PromptsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BookingForm"
                component={BookingForm}
                options={{ headerShown: false }}
            />


        </Stack.Navigator>
    )
}