import { Alert } from 'react-native';
import * as mime from 'react-native-mime-types';
import firebase from 'firebase';
import 'firebase/storage';

const uriToBlob = async (uri) => {
    if (!uri) {
        Alert.alert('Image Conversion Failed', 'No uri for image provided');
        return;
    }

    try {
        const response = await fetch(uri);
        return await response.blob();
    } catch (error) {
        Alert.alert('Image Conversion Failed', `Conversion of ${uri} to blob failed: ${error.message}`);
    }
};

export const uploadImage = async (imageUri, location) => {
    if (!imageUri) {
        Alert.alert('Image Upload Failed', `No image provided to upload`);
        return;
    }

    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const path = `${location}${(location[location - 1] !== '/' ? '/' : '')}${filename}`;

    let imageUrl = null;

    try {
        const blob = await uriToBlob(imageUri);
        const snapshot = await firebase.storage().ref().child(path).put(blob, { contentType: mime.lookup(filename) });
        blob.close();

        imageUrl = await snapshot.ref.getDownloadURL();
    } catch (error) {
        Alert.alert('Image Upload Failed', error.message);
    }

    return imageUrl;
};

export const deleteImage = async (imageUri) => {
    if (!imageUri) {
        Alert.alert('Image Deletion Failed', `No image provided for deletion`);
        return;
    }

    try {
        await firebase.storage().refFromURL(imageUri).delete();
    } catch (error) {
        Alert.alert('Image Deletion Failed', error.message);
    }
};