import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { getRandomQuote } from '../services';

export default function Quote({ style }) {
    const [quote, setQuote] = useState();

    useEffect(() => {
        const load = async () => {
            try {
                setQuote(await getRandomQuote());
            } catch (error) {
                Alert.alert('Quote Loading Failed', error.message);
            }
        };

        load();
    }, 
    []);

    if (!quote) {
        return null;
    }

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.quote}>"{quote.text}"</Text>
            <Text style={styles.author}>-- {quote.author || 'Anonymous'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '80%',
        marginTop: 20,
        marginBottom: 20
    },
    quote: {
        fontStyle: 'italic',
        marginBottom: 5
    },
    author: {
        fontWeight: 'bold',
        alignSelf: 'flex-end'
    }
});
