import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './header_style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../../redux/store';

const CustomHeader = (props: any) => {
    function handleLogout() {
        AsyncStorage.removeItem('user');
        props.loadUserFromStorage()
    }

    function createNewRoom() {
        fetch(store.getState().url + '/room/newRoom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'New Room',
                profile_picture: 'https://media.istockphoto.com/id/1300972574/es/foto/líder-de-equipo-masculino-millennial-organiza-taller-virtual-con-empleados-en-línea.jpg?s=612x612&w=0&k=20&c=SWvvszsskWnHXCWq_g6S85iAPYt9rulJP2RPmcn4o0A=',
            }),
        })
            .then((response) => response.json())
            .then((data) => {
            })
            .catch((error) => {
                console.error('Error:', error);
            });
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
            <TouchableOpacity onPress={createNewRoom}>
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
