import React from 'react';
import { Text } from 'react-native';
import { styles } from './style';
import { TSectionHeaderTitle } from './types';

export default function SectionHeaderTitle({ title }: TSectionHeaderTitle) {
    return (
        <Text style={styles.sectionTitle}>{title}</Text>
    )
}