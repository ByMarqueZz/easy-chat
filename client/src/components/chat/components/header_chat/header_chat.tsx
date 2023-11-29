import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from './header_chat_style'

export default function Header_Chat(props: any) {
    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <Image
                    style={styles.button}
                    source={{uri: props.room.profile_picture ? props.room.profile_picture : 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' }}
                    resizeMode="contain"
                />
                <Text style={styles.text}>{props.room.name}</Text>
            </View>
        </TouchableOpacity>
    )
}