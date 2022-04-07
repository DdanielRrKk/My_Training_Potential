import { StyleSheet } from 'react-native';

import { TERTIARY_COLOR } from './colors';



export const stylesLanding = StyleSheet.create({
    question_gender: {
        fontSize: 18,
        marginBottom: 16,
        color: TERTIARY_COLOR,
    },
    question_middle: {
        fontSize: 18,
        marginVertical: 32,
        color: TERTIARY_COLOR,
    },
    question: {
        fontSize: 18,
        marginBottom: 32,
        color: TERTIARY_COLOR,
    },

    content: {
        flex: 1,
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
    },

    entry: {
        width: '50%'
    },

    primary_title: {
        justifyContent: 'center', 
        alignItems: 'center', 
        fontSize: 24, 
        color: TERTIARY_COLOR
    },

    secondary_title: {
        justifyContent: 'center', 
        alignItems: 'center', 
        fontSize: 36, 
        color: TERTIARY_COLOR
    },

    info: {
        textAlign: 'justify', 
        marginTop: 50, 
        color: TERTIARY_COLOR
    },
});
