import { StyleSheet } from "react-native"
export default StyleSheet.create({
    chat: {
        height: '93%',
        backgroundColor: 'red',
    },
    inputView: {
        height: '7%',
        display: 'flex',
        flexDirection: 'row',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        paddingLeft: 10,
        width: '90%'
    },
    buttonView: {
        width: '10%',
        height: 40,
        margin: 10,
    },
    button: {
        width: '100%',
        height: '100%',
        cursor: 'pointer',
    },
})