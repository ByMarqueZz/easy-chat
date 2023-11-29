import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import Home from '../pages/home/home';
import CustomHeader from '../components/header/header';
import Header_Login from '../pages/login/components/header_login';
import Chat from '../components/chat/chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../pages/login/login';
import Header_Chat from '../components/chat/components/header_chat/header_chat';
import { RouteProp } from '@react-navigation/native';
const Stack = createStackNavigator();

export default function AppNavigation() {
    const [user, setUser] = React.useState(null);
    async function loadUserFromStorage() {
        try {
            const userJson = await AsyncStorage.getItem('user');
            const storedUser = userJson ? JSON.parse(userJson) : null;
            setUser(storedUser);
        } catch (error) {
            console.error('Error al cargar el usuario desde AsyncStorage', error);
        }
    }
    useEffect(() => {
        loadUserFromStorage();
    }, []);
    if (!user) {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerTitle: () => <Header_Login />,
                    headerStyle: {
                        backgroundColor: '#ffffff',
                    },
                }}>
                    <Stack.Screen name="login">
                        {(props) => <Login {...props} loadUserFromStorage={loadUserFromStorage} />}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: '#48BF84',
                },
                // headerTintColor: '#fff', // Color del texto en la barra de navegación
            }}>
                <Stack.Screen options={{
                    headerTitle: () => <CustomHeader loadUserFromStorage={loadUserFromStorage} />,
                }} name="Home" component={Home} />
                <Stack.Screen  options={({ route }: { route: RouteProp<any, 'Chat'> }) => ({
    headerTitle: () => <Header_Chat room={route.params.room} />,
  })} name="Chat" component={Chat} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
// const [width, setWidth] = useState<number>(Dimensions.get('window').width);
//     const [height, setHeight] = useState<number>(Dimensions.get('window').height);
//     useEffect(() => {
//         Dimensions.addEventListener('change', ({ window: { width, height } }) => {
//             setWidth(width);
//             setHeight(height);
//         });
//     }, );