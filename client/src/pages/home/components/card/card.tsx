import React, {useEffect, useState} from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './card_style'
import store from '../../../../redux/store'
import { socket } from '../../../../components/socket/socket'

export default function Card(props: any) {
    const [lastMessage, setLastMessage] = useState<any>('')
    const [time, setTime] = useState<string>('')
    useEffect(() => {
        socket.on('reloadHome', ()=> {
            getLastMessage()
        })
        getLastMessage()
    }, [])
    function handleButtonPressImage() {

    }

    function handleButtonPressCard() {
        props.onPress()
    }

    function getLastMessage() {
        fetch(store.getState().url + '/room/getLastMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'idRoom': props.room.id
            })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.lastMessage) {
                    setLastMessage(<Text>{data.lastMessage.user.username}: {data.lastMessage.text}</Text>)
                    setTime(formatTimestamp(data.lastMessage.timestamp))
                } else {
                    setLastMessage(data.message)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
      
        // Añadir un cero delante si los minutos son menores a 10
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      
        // Crear el string en el formato deseado
        const formattedTime = `${hours}:${formattedMinutes}`;
      
        return formattedTime;
      }
    return (
        <TouchableOpacity onPress={handleButtonPressCard}>
            <View
                style={styles.card}
            >
                <View style={styles.child1}>
                    <TouchableOpacity onPress={handleButtonPressImage}>
                        <Image
                            style={styles.image}
                            source={{ uri: props.room.profile_picture ? props.room.profile_picture : 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.child2}>
                    <Text style={styles.child2_text}>{props.room.name}</Text>
                    <View style={styles.child2_imageView}>
                        {/* <Image
                            source={require('../../../../assets/leer.png')}
                            style={styles.child2_image}
                        ></Image> */}
                        <Text style={styles.child2_imageView_text} numberOfLines={2} ellipsizeMode="tail">{lastMessage}</Text>
                    </View>
                </View>
                <View style={styles.child3}>
                    <Text style={styles.child3_time}>{time}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}