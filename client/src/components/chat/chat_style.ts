import { StyleSheet } from "react-native"
export default StyleSheet.create({
    chat: {
        width: '100%'
    },
    scrollView: {
        height: '90%',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    background: {

    },
    chat_view: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal:10,
        paddingVertical:10
    },
    ownMessage: {
        width: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    otherMessage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    messageBack: {
        backgroundColor: 'white',
        padding: 5,
        borderWidth: 0.3,
        borderColor: 'black',
        borderRadius: 16,
        overflow: 'hidden',
        minWidth: 40,
        textAlign: 'center'
    }
})