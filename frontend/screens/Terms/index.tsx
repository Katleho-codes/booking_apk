import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BackupTerms from '../BackupTerms';
import Policy from '../Policy';
import { Colors } from '../../utils/colors';



const TopTabs = createMaterialTopTabNavigator();
export default function Terms() {
    return (

        <TopTabs.Navigator id="termsAndCondtitonsTopTabs" screenOptions={{
            tabBarLabelStyle: { fontSize: 12, fontFamily: "Inter_500Medium", color: `${Colors.black}` },

        }} >
            <TopTabs.Screen name="BackupTerms" component={BackupTerms} options={{
                title: "Backup terms"
            }} />
            <TopTabs.Screen name="Policy" component={Policy} />
        </TopTabs.Navigator>

    )
}