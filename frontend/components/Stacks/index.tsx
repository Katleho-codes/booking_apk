import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react';
import CustomerDetails from "../../screens/BookingForm/CustomerDetails";
import DeviceInspection from "../../screens/BookingForm/DeviceInspection";
import Home from '../../screens/Home';
import PromptsScreen from '../../screens/PromptsScreen';
import SearchCustomer from "../../screens/SearchCustomer";



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
                name="CustomerDetails"
                component={CustomerDetails}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DeviceInspection"
                component={DeviceInspection}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SearchCustomer"
                component={SearchCustomer}
                options={{ headerShown: false }}
            />



        </Stack.Navigator>
    )
}