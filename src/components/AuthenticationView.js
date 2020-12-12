import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';
import 'firebase/auth';

import { ActivityContext, AuthenticationContext, ThemeContext } from '../contexts';
import { updateProfile, validateCredentials, validateProfile } from '../services';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';

export default function AuthenticationView({ children }) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();
    const { setBusy } = useContext(ActivityContext);
    const { theme } = useContext(ThemeContext);

    const signIn = async (email, password) => {
        console.log(`Signing in with ${email}`);
        
        if (!validateCredentials(email, password)) {
            console.log(`Failed credential validation`);
            return;
        }

        setBusy(true);
    
        let credential;
    
        try {
            credential = await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            Alert.alert('Sign-In Failed', error.message);
        }
    
        if (credential) {
            console.log(`Signed in user ${credential.user.uid}`);

            setUser(credential.user);
        }

        setBusy(false);
    };

    const signOut = async () => {
        console.log(`Signing out user ${user.uid}`);

        setBusy(true);

        try {
            await firebase.auth().signOut();
        } catch (error) {
            Alert.alert('Sign-Out Failed', error.message);
        }

        console.log(`Signed out user ${user.uid}`);

        setBusy(false);
        setUser(null);
    };

    const signUp = async ({ email, password, passwordConfirmation, name, imageUrl }) => {
        console.log(`Signing up user ${email}`);
        
        if (!validateProfile(email, password, passwordConfirmation, name)) {
            console.log(`Failed profile validation`);
            return;
        }
        
        setBusy(true);
    
        let credential;
    
        try {
            credential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            await updateProfile(credential.user.uid, name, imageUrl, theme);
        } catch (error) {
            Alert.alert('Sign-Up Failed', error.message);
        }
    
        setBusy(false);
    
        if (credential) {
            console.log(`Signed up user ${credential.user.uid}`);
            setUser(credential.user);
        }
    };

    const restoreUser = async () => {
        setLoading(true);

        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
            unsubscribe();
        });
    };

    useEffect(() => {
        restoreUser();

        return function cleanup() {
        }
    }, 
    []);

    const Stack = createStackNavigator();

    if (loading) {
        return null;
    }

    return (
        <AuthenticationContext.Provider value={{ user, signIn, signOut, signUp }}>
            { user 
                ? children 
                : (
                    <Stack.Navigator>
                        <Stack.Screen 
                            name="Sign In" 
                            component={SignIn} 
                            options={{ headerShown: false }} />
                        <Stack.Screen 
                            name="Sign Up" 
                            component={SignUp} />
                    </Stack.Navigator>)
            }
        </AuthenticationContext.Provider>
    );
}