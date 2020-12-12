import React from 'react';
import { StyleSheet } from 'react-native';

import Picture from './Picture';
import placeholder from '../../assets/images/avatar-placeholder.png';

export default function Avatar({ uri, editable, onChanged, style }) {
    return (
        <Picture 
            style={[styles.avatar, style]}
            placeholder={placeholder}
            uri={uri}
            editType="link"
            editable={editable}
            onChanged={onChanged} />
    );
}

const styles = StyleSheet.create({
    avatar: {
        borderRadius: 50
    }
});
