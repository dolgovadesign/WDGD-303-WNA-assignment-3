import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import { ThemeContext } from '../../contexts';
import { themes } from '../../../themes';
import Today from './Today';
import History from './History';

export default function Journal() {
    const { theme } = useContext(ThemeContext);

    const Tabs = createBottomTabNavigator();

    return (
        <Tabs.Navigator
            tabBarOptions={{ 
                showLabel: true, 
                labelPosition: 'beside-icon',
                activeBackgroundColor: themes[theme].background, 
                inactiveBackgroundColor: themes[theme].background 
            }}
            screenOptions={({route}) => ({
                tabBarIcon: ({ focused }) => {
                    const color = focused ? themes[theme].secondary : themes[theme].primary;

                    switch (route.name) {
                        case 'Today':
                            return <MaterialIcons 
                                        name="today" 
                                        size={24} 
                                        color={color} />

                        case 'History':
                            return <MaterialIcons 
                                        name="history" 
                                        size={24} 
                                        color={color} />
                    }
                }
            })}>
            <Tabs.Screen 
                name="Today" 
                component={Today} />
            <Tabs.Screen 
                name="History" 
                component={History} />
        </Tabs.Navigator>
    );
}
