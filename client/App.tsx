import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppNavigation from './src/navigation/AppNavigation';
import { socket } from './src/components/socket/socket';

export default function App() {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        socket.connect();
        socket.on('message', (data) => {
            console.log(`Mensaje del servidor: ${data}`);
        });

        return () => {
            socket.disconnect();
        };
    }, []);


    return (
        <Provider store={store}>
            <AppNavigation />
        </Provider>
    );
}