import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppNavigation from './src/navigation/AppNavigation';
import io from 'socket.io-client';

export default function App() {
    const [socket, setSocket] = React.useState<any>(null);
    useEffect(() => {
        const socket = io('http://127.0.0.1:5000');
        setSocket(socket);
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
