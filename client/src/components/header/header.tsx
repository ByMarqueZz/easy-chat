import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './header_style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomHeader = (props:any) => {
    function handleLogout() {
        AsyncStorage.removeItem('user');
        props.loadUserFromStorage()
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
            <Text>Hola</Text>
            
        </View>
    );
};


export default CustomHeader;
