import React, { useContext, useEffect, useState } from 'react';
import { Alert, Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

import { themes } from '../../themes';
import { ActivityContext, AuthenticationContext, ThemeContext } from '../contexts';
import { Avatar, IconButton } from '../components';
import { getProfile } from '../services';
import Profile from './Profile';
import Journal from './journal/Journal';
import Meditate from './Meditate';

export default function Home() {
    const [initialized, setInitialized] = useState(false);
    const [profile, setProfile] = useState();
    const { setBusy } = useContext(ActivityContext);
    const { user, signOut } = useContext(AuthenticationContext);
    const { theme, setTheme } = useContext(ThemeContext);

    const load = async () => {
        setBusy(true);

        try {
            const currentProfile = await getProfile(user.uid);
            setTheme(currentProfile.theme);
            setProfile(currentProfile);
        } catch (error) {
            Alert.alert('Profile Loading Failed', error.message);
        }

        setInitialized(true);
        setBusy(false);
    };

    useEffect(() => {
        setInitialized(false);
        load();
    },
    []);

    if (!initialized) {
        return null;
    }

    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator 
            drawerContent={props => (
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                    <DrawerItem 
                        labelStyle={{ color: themes[theme].primary }}
                        label="Log Out" 
                        onPress={signOut} />
                </DrawerContentScrollView>
            )}
            drawerContentOptions={{
                activeBackgroundColor: themes[theme].secondary,
                labelStyle: {
                    color: themes[theme].primary
                }
            }}
            drawerStyle={{
                backgroundColor: themes[theme].background
            }}
            hideStatusBar={true}
            screenOptions={({ navigation }) => ({
                headerShown: true,
                headerTitleStyle: {
                    color: themes[theme].primary
                },
                headerStyle: {
                    backgroundColor: themes[theme].background
                },
                headerLeft: () => 
                    (
                        <IconButton
                            type="icon"
                            source="menu"
                            onPress={() => navigation.toggleDrawer()} />
                    )
            })}
            initialRouteName="Journal">
            <Drawer.Screen 
                name="Profile" 
                component={Profile}
                options={{
                    drawerIcon: () => <Avatar uri={profile.imageUrl} />,
                    drawerLabel: () => <Text style={{color: themes[theme].primary}}>{profile.name}</Text>
                }} />
            <Drawer.Screen 
                name="Journal" 
                component={Journal} />
            <Drawer.Screen 
                name="Meditate" 
                component={Meditate} />
        </Drawer.Navigator>
    );
}
