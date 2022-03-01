import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { SetUserGender, GetUserGender } from '../../database/screen/landing_services';

import { continue_button_container } from '../../styles/setupStyles';
import { container, content, back_button_container } from '../../styles/miscStyles';

import ContinueButton from '../../components/misc/setup/continueButton';
import GroupButton from '../../components/landing/groupButton';
import BackButton from '../../components/misc/backButton';



export default function LandingGenderScreen({ navigation }){
    const [gender, setGender] = React.useState(null);

    React.useEffect(() => {
        let isGood = true;
        GetUserGender().then((value) => { if(isGood) setGender(value); });
        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, []);

    const openPrevScreen = () => navigation.goBack();

    const openNextScreen = () => {
        SetUserGender(gender);
        navigation.push('LandingMeasurementsScreen');
    }

    return(
        <SafeAreaView style={container}>
            <View style={back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={content}>
                <Text style={styles.question}>What is your gender?</Text>

                <View style={styles.middle_button_container}>
                    <GroupButton 
                        is_selected={(gender == 1)? true : false}
                        title={'Male'}
                        pressHandler={() => setGender(1)}/>

                    <GroupButton 
                        is_selected={(gender == 0)? true : false}
                        title={'Female'}
                        pressHandler={() => setGender(0)}/>
                </View>
            </View>
        
            <View style={continue_button_container}>
                <ContinueButton pressHandler={openNextScreen}/>
            </View>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({

    question: {
        fontSize: 18
    },

    middle_button_container: {
        width: '100%',
        marginTop: 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});