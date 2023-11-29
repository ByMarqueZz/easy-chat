import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, ImageBackground, Keyboard, Platform, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import style from './chat_style';
import InputChat from '../inputChat/inputChat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { socket } from '../socket/socket';
import store from '../../redux/store';

export default function Chat({ route }) {
    const [messages, setMessages] = useState<string[] | any>([]);
    const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

    useEffect(() => {
        const keyboardDidShowListener = (event) => {
          setKeyboardHeight(event.endCoordinates.height);
        };
      
        const keyboardDidHideListener = () => {
          setKeyboardHeight(0);
        };
      
        Keyboard.addListener('keyboardDidShow', keyboardDidShowListener);
        Keyboard.addListener('keyboardDidHide', keyboardDidHideListener);
      
        return () => {
          Keyboard.removeAllListeners('keyboardDidShow');
          Keyboard.removeAllListeners('keyboardDidHide');
        };
      }, []);
      

    useEffect(() => {
        getMessages()
        socket.on('takeMessage', (data) => {
            const parsedData = JSON.parse(data);
            if (route.params.room.id != parsedData.room.id) return
            saveMessage(parsedData)
        });
    }, [])

    function getMessages() {
        fetch(store.getState().url + '/room/getMessages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'idRoom': route.params.room.id
            })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.messages) {
                    setterMessages(data)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    async function setterMessages(data) {
        const userJson = await AsyncStorage.getItem('user');
        const storedUser = userJson ? JSON.parse(userJson) : null;
        const formattedMessages = data.messages.map((message) => {
            if (message.user.username == storedUser.username) {
                return (
                    <View key={message.id} style={style.ownMessage}>
                        <Text style={{ color: message.color, fontWeight: 'bold' }}>{message.user.username}: </Text>
                        <Text style={style.messageBack}>{message.text}</Text>
                    </View>
                )
            } else {
                return (
                    <View key={message.id} style={style.otherMessage}>
                        <Text style={{ color: message.color }}>{message.user.username}: </Text>
                        <Text style={style.messageBack}>{message.text}</Text>
                    </View>
                );
            }
        });
        setMessages((prevMessages) => [...prevMessages, ...formattedMessages]);
    }

    async function saveMessage(parsedData) {
        const userJson = await AsyncStorage.getItem('user');
        const storedUser = userJson ? JSON.parse(userJson) : null;
        if (storedUser.username == parsedData.username) {
            setMessages((prevMessages) => [...prevMessages, <View style={style.ownMessage}><Text style={{ color: parsedData.color, fontWeight: 'bold' }}>{parsedData.username}: </Text><Text style={style.messageBack}>{parsedData.inputText}</Text></View>]);
        } else {
            setMessages((prevMessages) => [...prevMessages, <View style={style.otherMessage}><Text style={{ color: parsedData.color }}>{parsedData.username}: </Text><Text style={style.messageBack}>{parsedData.inputText}</Text></View>]);
        }
    }

    async function sendMessage(inputText: string) {
        const userJson = await AsyncStorage.getItem('user');
        const storedUser = userJson ? JSON.parse(userJson) : null;
        if (storedUser) {
            socket.emit('sendMessage', { 'inputText': inputText, 'room': route.params.room, 'username': storedUser.username, 'user': storedUser });
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
                                        <View style={style.chat_view} key={index}>{message}</View>
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