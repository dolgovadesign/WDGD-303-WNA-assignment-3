import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, Animated, Easing, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import spinner from '../../assets/images/spinner.png';
import { themes } from '../../themes';
import { ThemeContext } from '../contexts';
import { Button } from '../components';

export default function Meditate() {
    const defaultSessionTime = { minutes: 10, seconds: 0 };
    const [time, setTime] = useState(defaultSessionTime);
    const [active, setActive] = useState(false);
    const { theme } = useContext(ThemeContext);
    const spinValue = useRef(new Animated.Value(0)).current;
    const spinAnimation = useRef(
        Animated.loop(
            Animated.timing(
                spinValue,
                {
                    toValue: 360,
                    duration: 5000,
                    easing: Easing.linear,
                    useNativeDriver: true
                }))).current;
    let timer;

    const display = (value) => value?.toString().padStart(2, '0');

    const startAnimation = () => {
        spinAnimation.start();
    };

    const stopAnimation = () => {
        clearInterval(timer);
        spinAnimation.stop();
        spinValue.setValue(0);
    };

    const startTimer = () => {
        setActive(true);
        startAnimation();
    };

    const stopTimer = () => {
        stopAnimation();
        setActive(false);
    }

    const resetTimer = () => {
        stopTimer();
        setTime(defaultSessionTime);
    };

    const toggleActive = () => {
        if (!active) {
            startTimer();
        } else {
            stopTimer();
        }
    };

    useEffect(() => {
        if (!active) {
            return;
        }

        timer = setInterval(() => {
            if (!active) {
                clearInterval(timer);
                return;
            }

            let { minutes, seconds } = { ...time };

            if (minutes === 0 && seconds === 0) {
                Alert.alert('Meditation Session Completed!');
                stopTimer();
                return;
            }
    
            if (seconds === 0) {
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }

            setTime({ minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    },
    [active, time]);

    useEffect(() => {
        return () => {
            spinAnimation.stop();
            spinValue.removeAllListeners();
        };
    },
    []);

    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
                { 
                    <Animated.View 
                        style={{ transform: [{ rotate: spinValue.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }] }}>
                        <Image
                            style={[styles.spinner]}
                            source={spinner} />
                    </Animated.View>
                }
                <View style={styles.timerContainer}>
                    <TouchableOpacity style={styles.timer(theme)} onPress={toggleActive}>
                        <Text style={styles.time(theme)}>{time.minutes}:{display(time.seconds)}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Button
                title="RESET"
                onPress={resetTimer} />
            
        </View>
    );
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    spinner: {
        width: 200,
        height: 200
    },
    timerContainer: {
        position: 'absolute'
    },
    timer: (theme) => ({
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: themes[theme].background,
        opacity: 0.8,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10
    }),
    time: (theme) => ({
        textAlign: 'center',
        width: 90,
        fontSize: 35,
        color: themes[theme].primary
    })
});