import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../styles/colors';

import { WEIGHT_MAX_LENGTH } from '../../helpers/constants';



export default function WeightPopup({ flag, closeHandler, weight, weightChangeHandler, updateHandler }){    
    return(
        <Modal 
            transparent={true}
            visible={flag}
            animationType='fade'
            onRequestClose={() => closeHandler()}>
            <TouchableOpacity 
                style={styles.popupContainer}
                onPress={() => closeHandler()}>
                <View style={styles.popup}>
                    <Text style={styles.text}>Weight</Text>

                    <TextInput
                        style={styles.entry}
                        placeholder='kg'
                        onChangeText={(value) => weightChangeHandler(value)}
                        value={weight}
                        keyboardType='numeric'
                        maxLength={WEIGHT_MAX_LENGTH}/>

                    <TouchableOpacity 
                        style={styles.popupButton}
                        onPress={() => updateHandler()}>
                        <Text style={styles.buttonText}>Update Weight</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    popupContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },

    popup:{
        height: 200,
        width: '80%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16
    },

    text: {
        fontSize: 18,
    },

    entry:{
        width: '90%',
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        justifyContent: 'center',
    },

    popupButton:{
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    }
});
