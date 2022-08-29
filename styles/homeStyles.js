import { StyleSheet, StatusBar } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from './colors';



export const stylesHome = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        paddingBottom: 0,
        marginTop: StatusBar.currentHeight,
    },

    top_button_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    title: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    },

    middle_button_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32
    },
});



export const stylesOpenLog = StyleSheet.create({
    header: {
        backgroundColor: PRIMARY_COLOR,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderRadius: 10,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

    bigText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },

    row: {
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },

    note_box: {
        width: '100%',
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 10,
        padding: 16,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },
    note_text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },

    view: {
        width: '100%', 
        alignItems: 'center'
    }
});



export const stylesSettings = StyleSheet.create({
    subBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subBox_middle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },

    messageBox: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: SECONDARY_COLOR,
        color: TERTIARY_COLOR,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },
});

