import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, ImageBackground, Keyboard, Platform, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import style from './chat_style';
import InputChat from '../inputChat/inputChat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { socket } from '../socket/socket';

export default function Chat({route}) {
    const [messages, setMessages] = useState<string[]>([]);
    const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            (event) => {
                setKeyboardHeight(event.endCoordinates.height);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardHeight(0);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        socket.on('takeMessage', (data) => {
            const parsedData = JSON.parse(data);
            if(route.params.room.id != parsedData.room.id) return
            setMessages((prevMessages) => [...prevMessages, parsedData.username + ": " + parsedData.inputText]);
        });
    }, [])

    async function sendMessage(inputText: string) {
        const userJson = await AsyncStorage.getItem('user');
        const storedUser = userJson ? JSON.parse(userJson) : null;
        if(storedUser) {
            socket.emit('sendMessage', {'inputText': inputText, 'room': route.params.room, 'username': storedUser.username});
        }
    }

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={style.scrollView}
            extraScrollHeight={keyboardHeight} // Asegura que la vista adicional tiene suficiente espacio
            enableOnAndroid={true}
            enableAutomaticScroll={Platform.OS === 'ios'}
            keyboardOpeningTime={0}
        >
            <View>
                <ImageBackground source={require('../../assets/background-chat.png')} resizeMode="cover" style={style.background}>
                    <ScrollView style={style.scrollView}>
                        <View style={style.chat}>
                            {
                                messages.map((message, index) => {
                                    return (
                                        <Text key={index}>{message}</Text>
                                    );
                                })
                            }
                        </View>
                    </ScrollView>
                </ImageBackground>
                <InputChat sendMessage={sendMessage}></InputChat>
            </View>
        </KeyboardAwareScrollView>
    );
}