import {
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    UIManager,
    Platform,
    LayoutAnimation,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Dimensions } from 'react-native';


export default function Accordion({
    title,
    details,
}: {
    title: string;
    details: React.ReactNode | any;
}) {
    const [accordionOpen, setAccordionOpen] = useState(false);

    if (
        Platform.OS === 'android' &&
        UIManager.setLayoutAnimationEnabledExperimental
    ) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    function toggleAccordion() {
        LayoutAnimation.configureNext({
            duration: 300,
            create: { type: 'easeIn', property: 'opacity' },
            update: { type: 'linear', springDamping: 0.3, duration: 250 },
        });
        setAccordionOpen(!accordionOpen);
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={toggleAccordion}>
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                    <AntDesign name={accordionOpen ? 'caretup' : 'caretdown'} size={16} />
                </View>
            </TouchableWithoutFeedback>

            {accordionOpen && (
                <View style={[styles.content]}>

                    {details}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    details: {
        fontFamily: "Inter_400Regular",
        opacity: 0.65,
        borderWidth: 1,
    },
    title: {
        fontFamily: "Inter_400Regular",
        textTransform: 'capitalize',
    },
    content: {
        marginTop: 8,
    },
    container: {
        width: "100%",
        // margin: 10,
        padding: 15,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 6,

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});