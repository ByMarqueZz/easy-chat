import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import UsersProps from '../../interfaces/usersProps';

export default function Users(props: UsersProps) {
    return (
        <View style={props.style}>
            <Text>Aquí se muestran la gente online</Text>
        </View>
    );
}