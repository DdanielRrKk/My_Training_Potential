import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import ContinueButton from '../../components/landing/continueButton';
import BackButton from '../../components/landing/backButton';
import GroupButton from '../../components/landing/groupButton';



export default function LandingGenderScreen({ navigation }){
    const [gender, setGender] = React.useState(null);
    const changeGender = (value) => setGender(value);

    const openNextScreen = () => navigation.push('LandingMeasurementsScreen');
    const openPrevScreen = () => navigation.goBack();
 
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.top_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={styles.content}>
                <Text style={styles.question}>What is your gender?</Text>

                <View style={styles.middle_button_container}>
                    <GroupButton 
                        is_selected={(gender == 1)? true : false}
                        title={'Male'}
                        pressHandler={() => changeGender(1)}/>

                    <GroupButton 
                        is_selected={(gender == 0)? true : false}
                        title={'Female'}
                        pressHandler={() => changeGender(0)}/>
                </View>
            </View>
        
            <View style={styles.bottom_button_container}>
                <ContinueButton pressHandler={openNextScreen}/>
            </View>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    question: {
        fontSize: 18
    },

    top_button_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },

    bottom_button_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    middle_button_container: {
        width: '100%',
        marginTop: 32,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
});