import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Separator() {
    return (
        <View style={styles.separator} />
    );
}

const styles = StyleSheet.create({
    separator: {
        borderWidth: 0.5,
        borderColor: 'lightgray',
        marginTop: 10,
        marginBottom: 10
    }
});
