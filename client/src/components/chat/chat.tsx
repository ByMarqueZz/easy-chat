import React, { useState } from 'react';
import { TextInput, View, Text, Alert, Image, TouchableOpacity } from 'react-native';
import ChatProps from '../../interfaces/chatProps';
import style from './chat_style';

export default function Chat(props: ChatProps) {
    const [inputText, setInputText] = useState<string>('');
    const [messages, setMessages] = useState<string[]>([]);
    const handleInputChange = (text: string) => {
        setInputText(text);
    }
    const handleButtonPress = () => {
        if (inputText === '') {
            return;
        }
        messages.push(inputText);
        setInputText('');
    }
    return (
        <View style={props.style}>
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
            <View style={style.inputView}>
                <TextInput
                    style={style.input}
                    placeholder="Escribe aquí..."
                    onChangeText={handleInputChange}
                    value={inputText}
                    onSubmitEditing={handleButtonPress}
                    returnKeyType="done"
                />
                <TouchableOpacity style={style.buttonView} onPress={handleButtonPress}>
                    <Image
                        style={style.button}
                        source={require('../../assets/enviar.png')}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}