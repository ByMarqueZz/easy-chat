import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, ImageBackground, Keyboard, Platform, Alert } from 'react-native';
import ChatProps from '../../interfaces/chatProps';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import style from './chat_style';
import InputChat from '../inputChat/inputChat';
import { socket } from '../socket/socket';
import store from '../../redux/store';

export default function Chat(props: ChatProps) {
    const [messages, setMessages] = useState<string[]>([]);
    const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

    useEffect(() => {
        socket.on('takeMessage', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

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

    function sendMessage(inputText: string) {
        socket.emit('sendMessage', inputText);
    }

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={style.scrollView}
            extraScrollHeight={keyboardHeight} // Asegura que la vista adicional tiene suficiente espacio
            enableOnAndroid={true}
            enableAutomaticScroll={Platform.OS === 'ios'}
            keyboardOpeningTime={0}
        >
            <View style={props.style}>
                <ImageBackground source={require('../../assets/background-chat.png')} resizeMode="cover" style={style.background}>
                    <ScrollView style={style.scrollView}>
                        <View style={style.chat}>
                            <Text>Este es el chat</Text>
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