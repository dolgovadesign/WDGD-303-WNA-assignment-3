import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import firebase from 'firebase';

import ActivityView from './src/components/ActivityView';
import AuthenticationView from './src/components/AuthenticationView';
import ThemeView from './src/components/ThemeView';
import Home from './src/views/Home';

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyABdIB9nMDdDu8DXm20-FDwtPs2TKmO_NM",
        authDomain: "gratitude-journal-6a791.firebaseapp.com",
        projectId: "gratitude-journal-6a791",
        storageBucket: "gratitude-journal-6a791.appspot.com",
        messagingSenderId: "930558232387",
        appId: "1:930558232387:web:b05bdf6e2378acc83611f6"
    });
}

export default function App() {
    return (
        <ThemeView>
            <NavigationContainer>
                <ActivityView>
                    <AuthenticationView>
                        <Home />
                    </AuthenticationView>
                </ActivityView>
            </NavigationContainer>
        </ThemeView>
    );
}
