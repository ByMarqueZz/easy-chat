import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Dimensions, Button } from 'react-native';
import styles from './home_styles';
import Chat from '../../components/chat/chat';

import Card from './components/card/card';

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
    return (
        <ScrollView>
            <View>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </View>
        </ScrollView>
    )
};



export default Home;
