import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { ActivityContext, AuthenticationContext } from '../../contexts';
import { load } from '../../services/journal-service';
import { getShortDate, getLongDate } from '../../services/date-time-service';
import { Button } from '../../components';
import JournalEntry from './JournalEntry';

export default function History() {
    const [date, setDate] = useState(new Date());
    const [entry, setEntry] = useState();
    const [viewing, setViewing] = useState(false);
    const { setBusy } = useContext(ActivityContext);
    const { user } = useContext(AuthenticationContext);

    const onView = async () => {
        await loadEntry(date);
        setViewing(true);
    };

    const loadEntry = async () => {
        const day = getShortDate(date);

        console.log(`Loading ${day} Journal Entry for user ${user.uid}`);

        setBusy(true);

        let entry;

        try {
            entry = await load(user.uid, day);
        } catch (error) {
            alert(error.message);
        }

        if (entry) {
            console.log(`Journal Entry for user ${user.uid} on ${day} was found`);
        } else {
            console.log(`Journal Entry for user ${user.uid} on ${day} was not found`);
        }

        setEntry(entry);

        setBusy(false);
    };

    if (viewing) {
        if (entry) {
            return (
                <JournalEntry 
                    data={entry} 
                    editable={false}
                    onReturn={() => setViewing(false)} />
            );
        }

        return (
            <View style={styles.container}>
                <Text style={styles.noentry}>No data for {getLongDate(date)}</Text>
                <Button title="Back" onPress={() => setViewing(false)} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>Select journal entry date:</Text>
            <DateTimePicker
                style={styles.calendar}
                value={date}
                mode="date"
                display="calendar"
                onChange={(_, selectedDate) => setDate(selectedDate || date)} />
            <Button 
                title="VIEW" 
                onPress={onView} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    calendar: {
        width: '80%',
        height: 100,
        marginBottom: 10
    },
    noentry: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    }
});