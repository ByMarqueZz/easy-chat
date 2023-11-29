import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from './login_style';
import store from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login(props: any) {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleUserInputChange = (text: string) => {
        setUsername(text);
    }

    const handlePasswordInputChange = (text: string) => {
        setPassword(text);
    }

    const onPressLearnMore = () => {
        fetch(store.getState().url + '/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            username: username,
            password: password,
         }),
    })
        .then((response) => response.json())
        .then((data) => {
            if(data.user) {
                AsyncStorage.setItem('user', JSON.stringify(data.user));
                props.loadUserFromStorage();
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    return (
        <View style={styles.container}>
            <View style={styles.container_login}>
                <TextInput
                    style={styles.input}
                    placeholder="Usuario"
                    onChangeText={handleUserInputChange}
                    value={username}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    onChangeText={handlePasswordInputChange}
                    value={password}
                />
                <Button
                    onPress={onPressLearnMore}
                    title="Iniciar sesión"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        </View>
    )
}