import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { ActivityContext, AuthenticationContext } from '../../contexts';
import { load, save } from '../../services/journal-service';
import { getShortDate } from '../../services';
import { Button, Quote } from '../../components';
import JournalEntry from './JournalEntry';

export default function Today() {
    const today = getShortDate(new Date());
    const [initialized, setInitialized] = useState(false);
    const [editing, setEditing] = useState(false);
    const [entry, setEntry] = useState();
    const { setBusy } = useContext(ActivityContext);
    const { user } = useContext(AuthenticationContext);

    const loadEntry = async () => {
        console.log(`Loading today's (${today}) Journal Entry for user ${user.uid}`);

        setBusy(true);

        let entry;

        try {
            entry = await load(user.uid, today);
        } catch (error) {
            alert(error.message);
        }

        if (entry) {
            console.log(`Today's Journal Entry for user ${user.uid} was found`);
            setEntry(entry);
        } else {
            console.log(`Today's Journal Entry for user ${user.uid} was not found`);
        }

        setBusy(false);
    };

    const saveEntry = async (entry) => {
        if (!entry) {
            alert('Cannot save an uninitialized Journal Entry!');
            return;
        }

        console.log(`Saving journal entry`, entry);

        setBusy(true);

        try {
            await save(user.uid, entry);
            setEntry(entry);
            Alert.alert(`Journal Entry saved!`);
        } catch (error) {
            Alert.alert(`Journal Entry Save Failed`, error.message);
        }

        setBusy(false);
    };

    const onSave = (entry) => {
        saveEntry(entry);
        setEditing(false);
    };

    useEffect(() => {
        setInitialized(false);

        const initialize = async () => {
            await loadEntry();
            setInitialized(true);
        }

        initialize();
    },
    []);

    if (!initialized) {
        return null;
    }

    if (!entry || editing) {
        return <JournalEntry 
                    data={entry}
                    editable={true}
                    onSave={entry => onSave(entry)}
                    onCancel={() => setEditing(false)} />
    }

    return (
        <View style={styles.container}>
            <Quote style={styles.quote} />
            <Button
                style={styles.button}
                title="TODAY'S ENTRY"
                onPress={() => setEditing(true)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    quote: {
        marginBottom: 50
    },
    button: {
        alignSelf: 'center'
    }
});