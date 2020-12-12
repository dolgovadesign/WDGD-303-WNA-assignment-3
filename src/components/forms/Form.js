import React from 'react';
import { View } from 'react-native';

export default function Form({ children, style }) {
    return (
        <View style={style}>{ children }</View>
    );
}

