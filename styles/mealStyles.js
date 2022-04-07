import { StyleSheet } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from './colors';



export const stylesMealSetup = StyleSheet.create({
    box_margin: {
        marginTop: 24
    }
});



export const stylesMeal = StyleSheet.create({
    question: {
        fontSize: 24,
        color: TERTIARY_COLOR,
    },



    header: {
        backgroundColor: PRIMARY_COLOR,
        width: '100%',
        padding: 20,
        borderRadius: 10,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

    infoBox: {
        alignItems: 'center',
    },

    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },

    primaryText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },
    secondaryText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },
    subText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },


    meal_box_margin: {
        marginTop: 16
    },



    row_first: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 16,
        marginBottom: 24
    },
    row_last: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 16
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 24
    },

    results: {
        marginTop: 32,
        width: '100%',
        backgroundColor: SECONDARY_COLOR,
        borderRadius: 10,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },
    results_single: {
        width: '100%',
        backgroundColor: SECONDARY_COLOR,
        borderRadius: 10,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },
    label_18: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    },


    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
        marginTop: 16
    },
});
