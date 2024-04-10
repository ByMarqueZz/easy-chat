import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        width: '100%'
    },
    button: {
        width: 35,
        height: 35,
        borderWidth: 0.3,
        borderRadius: 75,
        objectFit: 'cover',
    },
    text: {
        fontSize: 16
    }
})