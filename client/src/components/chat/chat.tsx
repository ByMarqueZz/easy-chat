import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, ImageBackground, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import ChatProps from '../../interfaces/chatProps';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import style from './chat_style';
import InputChat from '../inputChat/inputChat';

export default function Chat(props: ChatProps) {
    const [inputText, setInputText] = useState<string>('');
    const [messages,] = useState<string[]>([]);
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
                <InputChat setText={setInputText} inputText={inputText} messages={messages}></InputChat>
            </View>
        </KeyboardAwareScrollView>
    );
}