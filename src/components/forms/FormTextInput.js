import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default function FormTextInput({ defaultValue, value, placeholder, editable = true, secureText, multiline, onChangeText, style }) {
    return (
        <TextInput
            style={[styles.formInput, style]}
            placeholder={editable ? placeholder : undefined}
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            clearButtonMode={editable ? "unless-editing" : "never"}
            textContentType="oneTimeCode"
            editable={editable}
            multiline={multiline}
            secureTextEntry={secureText}
            defaultValue={defaultValue}
            value={value}
            onChangeText={onChangeText} />
    );
}

const styles = StyleSheet.create({
    formInput: {
        minHeight: 35,
        borderColor: 'lightgray',
        borderWidth: 1,
        paddingLeft: 5,
        marginBottom: 5
    }
});
