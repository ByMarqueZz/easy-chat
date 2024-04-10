import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Dimensions, Alert } from 'react-native';
import RoomProps from '../../interfaces/roomProps';
import { socket } from '../../components/socket/socket';

import Card from './components/card/card';
import store from '../../redux/store';

// const Home = () => {

//     return (
//         <View style={[styles.container, width >= 800 ? styles.containerLarge : styles.containerSmall]}>
//             <Chat style={[width <= 800 ? styles.width_div2 : styles.chat]}></Chat>
//         </View>
//     );
// };
{/* <Button
                title="GO TO Details"
                onPress={() => navigation.navigate('Chat')}
            /> */}

const Home = ({ navigation }: any) => {
    const [rooms, setRooms] = useState<RoomProps[]>([]);
    useEffect(() => {
        getRooms();
        socket.on('reloadRoom', () => {
            getRooms();
        });
    }, []);
    function getRooms() {
        fetch(store.getState().url + '/room/getRooms', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setRooms(data.rooms);
        })
    }
    return (
        <ScrollView>
            <View>
                {
                    rooms.map((room: RoomProps, index) => {
                        return (
                            <Card
                                key={index}
                                room={room}
                                navigate={navigation}
                                onPress={() => navigation.navigate('Chat', { room: room})}
                            />
                        )
                    })
                }
            </View>
        </ScrollView>
    )
};



export default Home;
