import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation } from 'react-native';

interface AccordionProps {
    title: string;
    content: string | React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleAccordion = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={toggleAccordion}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.arrow}>{isExpanded ? '▼' : '▶'}</Text>
            </TouchableOpacity>
            {isExpanded && <View style={styles.content}>{content}</View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginVertical: 5,

        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    arrow: {
        fontSize: 16,
    },
    content: {
        padding: 10,
        backgroundColor: '#fff',
    },
});

export default Accordion;
