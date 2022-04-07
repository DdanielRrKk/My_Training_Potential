import { StyleSheet, StatusBar } from 'react-native';



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
