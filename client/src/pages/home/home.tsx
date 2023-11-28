import { useEffect, useState } from 'react';
import { Text, View, Dimensions } from 'react-native';
import styles from './home_styles';
import Chat from '../../components/chat/chat';
import Users from '../../components/users/users';

const Home = () => {
    const [width, setWidth] = useState<number>(Dimensions.get('window').width);
    const [height, setHeight] = useState<number>(Dimensions.get('window').height);
    useEffect(() => {
        Dimensions.addEventListener('change', ({ window: { width, height } }) => {
            setWidth(width);
            setHeight(height);
        });
    }, );
    return (
        <View style={[styles.container, width >= 800 ? styles.containerLarge : styles.containerSmall]}>
            <Users style={[width <= 800 ? styles.height_div1 : styles.users]}></Users>
            <Chat style={[width <= 800 ? styles.width_div2 : styles.chat]}></Chat>
        </View>
    );
};



export default Home;
