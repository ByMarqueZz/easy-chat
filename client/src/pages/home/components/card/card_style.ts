import { StyleSheet } from "react-native";

export default StyleSheet.create({
    card: {
        width: '100%',
        height: 80,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginVertical: 5,
        overflow: 'hidden',
        position: 'relative',
        elevation: 5,
        shadowColor: '#000',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        }
    },
    child1: {
        width: 70,
        height: 70,
    },
    child2: {
        height: '100%',
        paddingTop: 7,
    },
    child2_text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    child2_image: {
        width: 18,
        height: 18,
    },
    child2_imageView_text: {
        fontSize: 15,
        color: '#999',
        maxWidth: '100%'
    },
    child2_imageView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },
    child3: {
        position: 'absolute',
        right: 0,
        color: '#999',
        height: '100%',
        paddingTop: 5,
        paddingRight: 12,
        top: 5,
    },
    child3_time: {
        color: '#999',
    },
    image: {
        width: 70,
        height: 70,
        borderWidth: 0.3,
        borderRadius: 75,
        objectFit: 'cover',
    },
});