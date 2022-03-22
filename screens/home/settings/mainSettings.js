import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';

import BackButton from '../../../components/misc/backButton';

import { container, back_button_container } from '../../../styles/miscStyles';

import { DropDatabase } from '../../../database/general/general_services';

import { useSystemFlagsGlobal } from '../../../helpers/globalState';



export default function MainSettingsScreen({ navigation }){
    const [systemFlags, setSystemFlags] = useSystemFlagsGlobal();

    const openPrevScreen = () => navigation.goBack();

    const openScreen = () => console.log('open screen');

    const deleteAccount = () => {
        Alert.alert(
            "Warning !",
            "If you delete your account, you will lose all of your data and progress. Do you want to continue ?",
            [
                {
                    text: "No",
                    onPress: () => console.log("canceled"),
                    style: "cancel"
                },
                { 
                  text: "Yes", 
                  onPress: () => {
                    setSystemFlags({
                        isUserReady: false,
                        isMealReady: false,
                        isWorkoutReady: false
                    });
                    DropDatabase();
                    console.log('deleted');
                  }
                }
            ]
        );
    }
 
    return(
        <SafeAreaView style={container}>
            <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
                <View style={back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={styles.content}>
                    <Text style={styles.subtitle}>Settings</Text>

                    <TouchableOpacity
                        style={styles.box}
                        onPress={openScreen}>
                        <Text style={{fontSize: 16}}>Edit User Data</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.box}
                        onPress={openScreen}>
                        <Text style={{fontSize: 16}}>Edit Nutritions Data</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.box}
                        onPress={openScreen}>
                        <Text style={{fontSize: 16}}>Edit Workout Plan</Text>
                    </TouchableOpacity>
                    

                    <TouchableOpacity
                        style={styles.textBox}
                        onPress={deleteAccount}>
                        <Text style={{fontSize: 16, color: 'red'}}>Delete Account</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    subtitle: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
        fontSize: 18,
        paddingVertical: 16
    },

    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    box: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 16,
        borderRadius: 10,
        backgroundColor: 'gray',
        marginBottom: 16
    },

    textBox: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 16,
        padding: 16
    }
});