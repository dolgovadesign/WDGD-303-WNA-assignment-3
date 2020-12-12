import { Alert } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

const collection = (uid) => {
    return firebase.firestore()
        .collection('profiles')
        .doc(uid)
        .collection('journal_entries');
};

export const load = async (uid, date) => {
    try {
        const entries = await collection(uid).where('createdOn', '==', date).get();
        
        if (entries.empty) {
            return null;
        }

        return entries.docs[0].data();
    } catch (error) {
        Alert.alert('Loading Journal Entry Failed', error.message);
    }
};

export const save = async (uid, entry) => {
    try {
        await collection(uid).doc(entry.createdOn).set(entry);
    } catch (error) {
        Alert.alert('Saving Journal Entry Failed', error.message);
    }
}