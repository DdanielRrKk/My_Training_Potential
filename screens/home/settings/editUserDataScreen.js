import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';

import BackButton from '../../../components/misc/backButton';

import { container, back_button_container } from '../../../styles/miscStyles';

import { GetEditUserDataScreenData } from '../../../database/screen/home/settings_services';



export default function EditUserDataScreen({ navigation }){
    const [name, setName] = React.useState(null);
    const [age, setAge] = React.useState(null);
    const [weight, setWeight] = React.useState(null);
    const [height, setHeight] = React.useState(null);
    const [gender, setGender] = React.useState(null);

    const openPrevScreen = () => navigation.goBack();

    React.useEffect(() => {
        let isGood = true;

        GetEditUserDataScreenData().then(({ name, age, weight, height, gender }) => { 
            if(isGood) {
                setName(name);
                setAge(age); 
                setWeight(weight); 
                setHeight(height); 
                setGender(gender); 
            }
        });

        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, [name, age, weight, height, gender]);
 
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
                        onPress={resetMealSetup}>
                        <Text style={{fontSize: 16, color: 'red'}}>Reset Meal Setup</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.textBox}
                        onPress={resetWorkoutSetup}>
                        <Text style={{fontSize: 16, color: 'red'}}>Reset Workout Setup</Text>
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