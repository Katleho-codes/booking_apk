import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    LayoutAnimation,
    Platform,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    UIManager,
    View
} from 'react-native';
import { styles } from './style';


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
