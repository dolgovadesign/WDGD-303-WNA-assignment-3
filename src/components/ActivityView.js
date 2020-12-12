import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { ActivityContext } from '../contexts/ActivityContext';

export default function ActivityView({ children }) {
    const [busy, setBusy] = useState(false);

    return (
        <ActivityContext.Provider value={{ busy, setBusy }}>
            { children }
            { busy && <ActivityIndicator size="large" color="lightgray" style={styles.indicator} /> }
        </ActivityContext.Provider>
    );
}

const styles = StyleSheet.create({
    indicator: {
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        opacity: 0.7, 
        backgroundColor: 'black'
    }
});
