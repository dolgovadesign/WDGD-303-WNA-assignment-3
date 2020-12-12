import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { themes } from '../../themes';
import { ThemeContext } from '../contexts';

export default function Button({ title, onPress, disabled, style, textStyle }) {
    const { theme } = useContext(ThemeContext);

    return (
        <TouchableOpacity 
            style={[styles.button(theme, disabled), style]} 
            disabled={disabled} 
            onPress={onPress}>
            <Text 
                style={[styles.text(theme, disabled), textStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: (theme, disabled) => ({
        minWidth: 100,
        minHeight: 35,
        paddingRight: 5,
        paddingLeft: 5,
        backgroundColor: disabled ? 'lightgray' : themes[theme].background,
        borderColor: disabled ? null : themes[theme].primary,
        borderWidth: disabled ? 0 : 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignSelf: 'center'
    }),
    text: (theme, disabled) => ({
        color: disabled ? 'gray' : themes[theme].primary,
        fontSize: 16,
        textAlign: 'center'
    })
});
