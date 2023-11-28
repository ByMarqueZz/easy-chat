import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './card_style'
import { useNavigation } from '@react-navigation/native';

export default function Card() {
    const navigation = useNavigation();
    function handleButtonPressImage() {

    }

    function handleButtonPressCard() {
        navigation.navigate('Chat' as never)
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
                            source={{ uri: 'https://media.istockphoto.com/id/1300972574/es/foto/líder-de-equipo-masculino-millennial-organiza-taller-virtual-con-empleados-en-línea.jpg?s=612x612&w=0&k=20&c=SWvvszsskWnHXCWq_g6S85iAPYt9rulJP2RPmcn4o0A=' }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.child2}>
                    <Text style={styles.child2_text}>Hola</Text>
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