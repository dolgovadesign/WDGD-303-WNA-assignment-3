import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ActivityContext, AuthenticationContext } from '../contexts';
import { Button, Form, FormTextInput, Separator } from '../components';

export default function SignIn({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { busy } = useContext(ActivityContext);
    const { signIn } = useContext(AuthenticationContext);

    return (
        <View style={styles.container}>
            <Form style={styles.form}>
                <FormTextInput
                    placeholder="Email"
                    onChangeText={x => setEmail(x)} />
                <FormTextInput
                    placeholder="Password"
                    secureText={true}
                    onChangeText={x => setPassword(x)} />
                <View style={styles.buttonContainer}>
                    <Button
                        title="SIGN IN"
                        disabled={busy}
                        onPress={() => signIn(email, password)} />
                    <Button
                        title="SIGN UP"
                        disabled={busy}
                        onPress={() => navigation.navigate('Sign Up')} />
                </View>
            </Form>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        width: '80%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10
    }
});
