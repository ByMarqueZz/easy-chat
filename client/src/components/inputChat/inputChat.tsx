import React from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import style from './inputChat_style';

export default function InputChat(props:any) {
    const [isWriting, setIsWriting] = React.useState<boolean>(false);
    const [inputText, setInputText] = React.useState<string>('');
    const handleInputChange = (text: string) => {
        if(text != '') {
            setIsWriting(true);
        } else {
            setIsWriting(false);
        }
        setInputText(text);
    }
    const handleButtonPress = () => {
        if (inputText !== '') {
            props.sendMessage(inputText);
            setInputText('');
            setIsWriting(false);
        }
    }
    return (
        <View style={style.inputView}>
                <TextInput
                    style={style.input}
                    placeholder="Escribe aquí..."
                    onChangeText={handleInputChange}
                    value={inputText}
                    onSubmitEditing={handleButtonPress}
                    returnKeyType="done"
                />
                {
                    !isWriting ?
                        <TouchableOpacity style={style.buttonView}>
                            <Image
                                style={style.button}
                                source={require('../../assets/voz.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={style.buttonView} onPress={handleButtonPress}>
                        <Image
                            style={style.button}
                            source={require('../../assets/enviar.png')}
                            resizeMode="contain"
                        />
                        </TouchableOpacity>
                }
            </View>
    );
}