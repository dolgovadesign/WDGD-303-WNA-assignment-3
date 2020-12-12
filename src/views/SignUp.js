import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ActivityContext, AuthenticationContext } from '../contexts';
import { Avatar, Button, Form, FormTextInput, Separator } from '../components';

export default function SignUp() {
    const [profile, setProfile] = useState();
    const { busy } = useContext(ActivityContext);
    const { signUp } = useContext(AuthenticationContext);

    return (
        <View style={styles.container}>
            <Form style={styles.form}>
                <Avatar 
                    editable={true}
                    onChanged={image => setProfile({ ...profile, imageUrl: image?.uri })} />
                <Separator />
                <FormTextInput
                    placeholder="Name"
                    onChangeText={name => setProfile({ ...profile, name })} />
                <FormTextInput
                    placeholder="Email"
                    onChangeText={email => setProfile({ ...profile, email })} />
                <FormTextInput
                    placeholder="Password"
                    secureText={true}
                    onChangeText={password => setProfile({ ...profile, password })} />
                <FormTextInput
                    placeholder="Confirm Password"
                    secureText={true}
                    onChangeText={passwordConfirmation => setProfile({ ...profile, passwordConfirmation })} />
                <View style={styles.buttonContainer}>
                    <Button
                        title="SIGN UP"
                        disabled={busy}
                        onPress={() => signUp(profile)} />
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
