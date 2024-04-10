import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Image, Alert, Text, Button, TextInput, TouchableWithoutFeedback,Keyboard } from 'react-native';
import styles from './header_style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../../redux/store';

const CustomHeader = (props: any) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [profile_picture, setProfilePicture] = useState<string | null>('')
    function handleLogout() {
        AsyncStorage.removeItem('user');
        props.loadUserFromStorage()
    }

    function handleNewRoom() {
        if (name.length <= 0) {
            Alert.alert(
                "Error",
                "Debes rellenar el nombre",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            return
        }
        setIsVisible(!isVisible)
        if (profile_picture.length == 0 || profile_picture.length >= 256) {
            setProfilePicture(null)
        }
        fetch(store.getState().url + '/room/newRoom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                profile_picture: profile_picture,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setName('')
                setProfilePicture('')
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    if (isVisible) {
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setIsVisible(!isVisible);
                    }}>
                    <TouchableWithoutFeedback onPress={() => {
                        setIsVisible(!isVisible)
                    }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Añadir una nueva sala</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nombre"
                                    onChangeText={(text: string) => {
                                        setName(text)
                                    }}
                                    value={name}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="URL de la foto de perfil"
                                    onChangeText={(text) => {
                                        setProfilePicture(text)
                                    }}
                                    value={profile_picture}
                                />
                                <Button
                                    onPress={handleNewRoom}
                                    title='Crear sala' />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>

        )
    }
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={handleLogout}>
                <Image
                    style={styles.button}
                    source={require('../../assets/logout.png')}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                setIsVisible(!isVisible)
            }}>
                <Image
                    style={styles.button}
                    source={require('../../assets/circulo-plus.png')}
                    resizeMode="contain"
                />
            </TouchableOpacity>

        </View>
    );
};


export default CustomHeader;
