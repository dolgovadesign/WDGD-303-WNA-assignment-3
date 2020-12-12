import { Alert } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

import { uploadImage, deleteImage } from './image-service';

const collection = () => {
    return firebase.firestore()
        .collection('profiles');
}

const updateImage = async (uid, uri) => {
    const profile = await getProfile(uid);

    if (!profile) {
        if (uri) {
            return await uploadImage(uri, `${uid}/images`);
        }

        return null;
    }

    if (profile.imageUrl === uri) {
        return profile.imageUrl;
    }

    if (profile.imageUrl) {
        await deleteImage(profile.imageUrl);
    }

    if (uri) {
        return await uploadImage(uri, `${uid}/images`);
    }
};

export const getProfile = async (uid) => {
    try {
        return (await collection().doc(uid).get()).data();
    } catch (error) {
        Alert.alert('Profile Retrieval Failed', error.message);
    }
};

export const updateProfile = async (uid, name, uri, theme) => {
    try {
        const imageUrl = await updateImage(uid, uri);
        const profile = { name, imageUrl: imageUrl ?? null, theme };

        await collection().doc(uid).set(profile);

        return profile;
    } catch (error) {
        Alert.alert('Profile Update Failed', error.message);
    }
};
