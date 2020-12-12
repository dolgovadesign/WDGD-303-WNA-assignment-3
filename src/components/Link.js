import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Link({ title, onPress, disabled, style, textStyle }) {
    return (
        <TouchableOpacity 
            style={[styles.link, disabled && styles.linkDisabled, style]} 
            disabled={disabled} 
            onPress={onPress}>
            <Text 
                style={[styles.text, disabled && styles.textDisabled, textStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    link: {
        minHeight: 35,
        paddingRight: 5,
        paddingLeft: 5,
        justifyContent: 'center'
    },
    linkDisabled: {
    },
    text: {
        color: 'deepskyblue',
        fontSize: 14,
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    textDisabled: {
        color: 'gray'
    }
});
