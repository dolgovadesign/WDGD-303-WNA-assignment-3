import React, { useContext } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { themes } from '../../themes';
import { ThemeContext } from '../contexts';

export default function IconButton({source, disabled, type = 'image', onPress, style}) {
    const { theme } = useContext(ThemeContext);

    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={() => {
                if (!disabled) {
                    onPress();
                }
            }}>
            {
                type === 'image' &&
                <Image 
                    style={styles.image}
                    source={source} />
            }
            {
                type == 'icon' &&
                <MaterialIcons
                    size={32}
                    color={themes[theme].primary}
                    name={source} />
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        minHeight: 35,
        paddingRight: 5,
        paddingLeft: 5,
        justifyContent: 'center',
        margin: 5
    },
    image: {
        width: 32,
        height: 32
    },
});
