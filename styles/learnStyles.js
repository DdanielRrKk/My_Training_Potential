import { StyleSheet, StatusBar } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from './colors';



export const stylesLearn = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 0,
        marginTop: StatusBar.currentHeight
    }
});

export const stylesCalculator = StyleSheet.create({
    box: {
        width: '100%',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: SECONDARY_COLOR,
        marginTop: 16,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

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
});
