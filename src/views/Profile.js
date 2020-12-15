import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { ActivityContext, AuthenticationContext, ThemeContext } from '../contexts';
import { getProfile, updateProfile, validateName } from '../services';
import { Avatar, Button, Form, FormTextInput, Separator } from '../components';
import { themes } from '../../themes';

export default function Profile() {
    const [initialized, setInitialized] = useState(false);
    const [profile, setProfile] = useState();
    const { busy, setBusy } = useContext(ActivityContext);
    const { user } = useContext(AuthenticationContext);
    const { theme, setTheme } = useContext(ThemeContext);

    const loadProfile = async () => {
        setBusy(true);

        let profile;

        try {
            profile = await getProfile(user.uid);
        } catch (error) {
            Alert.alert('Profile Loading Failed', error.message);
        }

        setBusy(false);
    
        if (profile) {
            setProfile(profile);
        } else {
            console.log(`Profile does not exist`);
        }
    };

    const saveProfile = async () => {
        if (!validateName(profile?.name)) {
            return;
        }

        setBusy(true);

        const { name, imageUrl } = profile;

        try {
            const updatedProfile = await updateProfile(user.uid, name, imageUrl, theme);
            setProfile(updatedProfile);
        } catch (error) {
            Alert.alert('Profile Saving Failed', error.message);
        }

        Alert.alert('Profile Saved Successfully');
        
        setBusy(false);
    };

    useEffect(() => {
        setInitialized(false);

        const load = async () => {
            await loadProfile();
            setInitialized(true);
        };
        
        load();
    },
    []);

    if (!initialized) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Form style={styles.form}>
                <Avatar
                    uri={profile.imageUrl}
                    editable={true}
                    onChanged={image => setProfile({ ...profile, imageUrl: image?.uri })} />
                <Separator />
                <FormTextInput
                    placeholder="Name"
                    value={profile?.name}
                    onChangeText={name => setProfile({ ...profile, name })} />
            </Form>
            <View style={styles.themeContainer}>
                <Text style={styles.themeTitle}>Pick A Theme</Text>
                <Picker
                    selectedValue={theme}
                    onValueChange={(value, _) => setTheme(value)}>
                    {
                        Object.keys(themes).map((value, index) => 
                            <Picker.Item 
                                key={index} 
                                label={value} 
                                value={value} />)
                    }
                </Picker>
            </View>
            <Button
                title="Save"
                disabled={busy}
                onPress={saveProfile} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    form: {
        width: '80%'
    },
    themeContainer: {
        marginTop: 10,
        marginBottom: 10,
        minWidth: 200
    },
    themeTitle: {
        alignSelf: 'center',
        fontSize: 16
    }
});
