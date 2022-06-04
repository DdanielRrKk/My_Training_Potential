import { StyleSheet, StatusBar } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from './colors';



export const stylesWorkoutSetup = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        paddingBottom: 0,
        marginTop: StatusBar.currentHeight,
    },

    box_margin: {
        marginTop: 16
    },
    box_margin_v: {
        marginVertical: 16
    },



    btn: {
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 2,
        paddingHorizontal: 16,
        borderRadius: 10,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },



    back_button_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },



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

    boxInstruction: {
        width: '100%',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOR,
        marginTop: 16,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

    instructionsText: {
        fontSize: 16,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        color: SECONDARY_COLOR,
        marginBottom: 16
    },

    instructions: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: SECONDARY_COLOR,
        color: TERTIARY_COLOR
    },
});



export const stylesWorkout = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        paddingBottom: 0,
        marginTop: StatusBar.currentHeight,
    },



    box_margin: {
        marginBottom: 16
    },



    header: {
        backgroundColor: SECONDARY_COLOR,
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
        color: PRIMARY_COLOR
    },
    
    note_box: {
        flexDirection: 'row',
        width: '100%',
        padding: 16,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOR,
        marginBottom: 16,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },
    note: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: SECONDARY_COLOR,
        color: TERTIARY_COLOR
    },



    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: TERTIARY_COLOR
    },
    sets: {
        marginVertical: 16,
        fontSize: 20,
        fontWeight: 'bold',
        color: TERTIARY_COLOR
    },

    back_button_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    view: {
        justifyContent: 'center', 
        alignItems: 'center'
    },
    label_18: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
        marginRight: 16
    },

    instructionBox: {
        flexDirection: 'row',
        backgroundColor: SECONDARY_COLOR, 
        borderRadius: 10, 
        padding: 8, 
        marginVertical: 36,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },
    instructionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    },

    input: {
        padding: 8, 
        borderRadius: 10,
        backgroundColor: SECONDARY_COLOR,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

    duration_text: {
        marginBottom: 16,
        fontSize: 20,
        fontWeight: 'bold',
        color: TERTIARY_COLOR
    },
    btn: {
        fontSize: 16,
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },
    text_btn: {
        fontSize: 16,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },



    text: {
        fontSize: 36,
        marginBottom: 16,
        fontWeight: 'bold',
        color: TERTIARY_COLOR
    },
    subtext: {
        fontSize: 24,
        fontWeight: 'bold',
        color: TERTIARY_COLOR
    },
    row: {
        flexDirection: 'row'
    },

    btn_active: {
        fontSize: 24,
        backgroundColor: PRIMARY_COLOR,
        marginRight: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },
    btn_active_down: {
        fontSize: 24,
        backgroundColor: PRIMARY_COLOR,
        marginLeft: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },
    subtext_active: {
        fontSize: 24,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },
    btn_unactive: {
        fontSize: 24,
        backgroundColor: SECONDARY_COLOR,
        marginRight: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },
    subtext_unactive: {
        fontSize: 24,
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    },
});
