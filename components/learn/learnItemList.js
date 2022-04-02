import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../styles/colors';

import { EvilIcons } from '@expo/vector-icons';



export default function LearnItemList(learn, openHandler, openKey){
    return learn.map((item) => {
        if((openKey == item.key)) {
            return(
                <TouchableOpacity 
                    key={item.key}
                    style={styles.bigContainer}
                    onPress={() => openHandler(item.key)}>
                    <View style={styles.containerTop}>
                        <Text style={styles.question}>{item.question}</Text>
            
                        <EvilIcons name="chevron-up" size={40} color={PRIMARY_COLOR} />
                    </View>
                    <View style={styles.containerBottom}>
                        <Text style={styles.answer}>{item.answer}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    
        return(
            <TouchableOpacity 
                key={item.key}
                style={styles.container}
                onPress={() => openHandler(item.key)}>
                <Text style={styles.question}>{item.question}</Text>
    
                <EvilIcons name="chevron-down" size={40} color={PRIMARY_COLOR} />
            </TouchableOpacity>
        );
    });
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        padding: 16,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: SECONDARY_COLOR,
        marginBottom: 16,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

    question: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    },
    answer: {
        fontSize: 16,
        color: TERTIARY_COLOR
    },


    bigContainer: {
        width: '100%',
        marginBottom: 16
    },
    containerTop: {
        flexDirection: 'row',
        width: '100%',
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: SECONDARY_COLOR
    },
    containerBottom: {
        width: '100%',
        padding: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOR,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },
});