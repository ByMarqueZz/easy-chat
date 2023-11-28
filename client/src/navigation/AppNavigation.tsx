import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from '../pages/home/home';
import CustomHeader from '../components/header/header';
import Chat from '../components/chat/chat';
const Stack = createStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerTitle: () => <CustomHeader />,
                headerStyle: {
                    backgroundColor: '#48BF84',
                },
                // headerTintColor: '#fff', // Color del texto en la barra de navegación
            }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Chat" component={Chat} />
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