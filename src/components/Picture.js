import React, { useContext, useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import Button from './Button';
import Link from './Link';
import { ActivityContext } from '../contexts/ActivityContext';

export default function Picture({ uri, placeholder, editable, editTitle, clearTitle, editType, onChanged, style }) {
    const [initialized, setInitialized] = useState(false);
    const [image, setImage] = useState(uri ? { uri } : null);
    const { busy, setBusy } = useContext(ActivityContext);

    const selectImage = async () => {
        try {
            setBusy(true);

            if (!(await ImagePicker.requestCameraRollPermissionsAsync())) {
                Alert.alert('Camera Roll Access Failed', 'Camera Roll permission is required');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });

            if (!result.cancelled) {
                const selectedImage = { uri: result.uri };
                
                setImage(selectedImage);
                onChanged?.(selectedImage);
            }

            setBusy(false);
        } catch (error) {
            Alert.alert('Image Selection Failed', error.message);
        }
    }

    const clearImage = () => {
        setImage(null);
        onChanged?.(null);
    };

    return (
        <View style={styles.container(!image || initialized)}>
            <Image
                style={[styles.image, style]}
                defaultSource={placeholder}
                source={image}
                onLoadEnd={() => setInitialized(true)} />
            { 
                image && 
                !initialized &&
                <ActivityIndicator 
                    style={styles.indicator} 
                    size="small" 
                    color="black" />
            }
            {
                editable &&
                editType === 'button' &&
                <View style={styles.actionContainer}>
                    <Button 
                        style={styles.action}
                        title={editTitle ?? "Edit"}
                        disabled={busy}
                        onPress={selectImage} />
                    {
                        image && 
                        <Button 
                            style={styles.action}
                            title={clearTitle ?? "Clear"}
                            disabled={busy}
                            onPress={clearImage} />
                    }
                </View>
            }
            {
                editable &&
                editType == 'link' &&
                <View style={styles.actionContainer}>
                    <Link
                        style={styles.action}
                        title={editTitle ?? "Edit"}
                        disabled={busy}
                        onPress={selectImage} />
                    {
                        image && 
                        <Link 
                            style={styles.action}
                            title={clearTitle ?? "Clear"}
                            disabled={busy}
                            onPress={clearImage} />
                    }
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: (initialized) => ({
        alignItems: 'center',
        justifyContent: 'center',
        opacity: initialized ? 1 : 0.5
    }),
    image: {
        width: 64,
        height: 64
    },
    indicator: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    action: {
        marginTop: 5,
        marginBottom: 5
    }
});
