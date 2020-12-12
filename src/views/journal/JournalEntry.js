import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { Button, Form, FormTextInput } from '../../components';
import { getShortDate, getLongDate } from '../../services/date-time-service';

export default function JournalEntry({ data, editable, onSave, onCancel, onReturn }) {
    const [entry, setEntry] = useState(data ?? { createdOn: getShortDate(new Date()), gratitudes: Array(5).fill('') });
    const isNew = !data;
    const historical = entry.createdOn !== getShortDate(new Date());

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {
                    historical 
                        ? `On ${getLongDate(new Date(entry.createdOn))} I was grateful for ...`
                        : 'Today I am grateful for ...'
                }
            </Text>
            <Form style={styles.form}>
                {
                    entry.gratitudes.map((gratitude, index) => {
                        return (
                            <View style={styles.gratitudeContainer} key={index}>
                                <Text style={styles.gratitudeIndex}>{index + 1}.</Text>
                                <FormTextInput
                                    style={styles.gratitudeInput(editable)}
                                    editable={editable}
                                    value={gratitude}
                                    onChangeText={text => {
                                        const gratitudes = [...entry.gratitudes];
                                        gratitudes[index] = text;
                                        setEntry({ ...entry, gratitudes });
                                    }} />
                            </View>
                        )
                    })
                }
                <FormTextInput 
                    style={styles.summary(!entry.summary?.length, editable)}
                    placeholder="Write a short summary of today"
                    multiline={true}
                    value={entry.summary}
                    editable={editable}
                    onChangeText={text => setEntry({ ...entry, summary: text })} />
                {
                    editable ?
                        (
                            <View style={styles.buttonContainer}>
                                <Button
                                    title="SAVE"
                                    onPress={() => onSave(entry)} />
                                {
                                    !isNew &&
                                    <Button 
                                        title="CANCEL" 
                                        onPress={onCancel} />
                                }
                            </View>
                        ) :
                        <Button 
                            title="BACK"
                            onPress={onReturn} />
                }
            </Form>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: Platform.OS === 'ios' ? 'Bradley Hand' : 'serif',
        fontSize: 20,
        marginBottom: 10
    },
    form: {
        width: '80%',
        alignItems: 'center'
    },
    gratitudeContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row', 
        alignItems: 'center'
    },
    gratitudeIndex: {
        fontFamily: 'Bradley Hand',
        marginRight: 5
    },
    gratitudeInput: (editable) => ({
        width: '90%',
        borderWidth: 0, 
        borderBottomWidth: editable ? 1 : 0,
        marginLeft: 15
    }),
    summary: (empty, editable) => ({
        alignSelf: 'stretch',
        alignContent: 'flex-start',
        marginTop: empty && !editable ? 0 : 10,
        marginBottom: empty && !editable ? 0 : 10,
        height: empty && !editable ? 0 : 150,
        borderWidth: editable ? 1 : 0
    }),
    buttonContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-evenly'
    }
});
