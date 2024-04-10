import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_login: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#00f',
        borderRadius: 10,
        padding: 5,
    },
    text_button: {
        color: '#fff',
        fontWeight: 'bold',
    },
});