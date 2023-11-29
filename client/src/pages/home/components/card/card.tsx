import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './card_style'

export default function Card(props:any) {
    function handleButtonPressImage() {

    }

    function handleButtonPressCard() {
        props.onPress()
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
                        <Image
                            source={require('../../../../assets/leer.png')}
                            style={styles.child2_image}
                        ></Image>
                        <Text style={styles.child2_imageView_text}>Nombre</Text>
                    </View>
                </View>
                <View style={styles.child3}>
                    <Text style={styles.child3_time}>19:03</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}