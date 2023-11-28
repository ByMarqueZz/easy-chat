import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/pages/home/home';


export default function App() {
    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={HomeScreen} />
                <Stack.Screen name="Chat" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="GO TO Details"
                onPress={() => navigation.navigate('Chat')}
            />
        </View>
    );
}