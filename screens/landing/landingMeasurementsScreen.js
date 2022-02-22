import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, KeyboardAvoidingView } from 'react-native';

import { 
    SetUserDataMeasurements,
    GetUserDataMeasurements
} from '../../database/services/user_services/user_data_services';

import { continue_button_container } from '../../styles/setupStyles';
import { container, content, back_button_container } from '../../styles/miscStyles';

import ContinueButton from '../../components/misc/setup/continueButton';
import BackButton from '../../components/misc/backButton';


const AGE_MAX_LENGTH = 3;
const WEIGHT_MAX_LENGTH = 3;
const HEIGHT_MAX_LENGTH = 3;

export default function LandingMeasurementsScreen({ navigation, route }){
    const [age, setAge] = React.useState(null);
    const [weight, setWeight] = React.useState(null);
    const [height, setHeight] = React.useState(null);

    React.useEffect(() => {
        GetUserDataMeasurements(setAge, setWeight, setHeight);
    }, []);

    const openPrevScreen = () => navigation.goBack();

    const openNextScreen = () => {
        SetUserDataMeasurements(age, weight, height);
        route.params.dataReady();
    }
 
    return(
        <SafeAreaView style={container}>
            <KeyboardAvoidingView>
                <View style={back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={content}>
                    <Text style={styles.question}>Age</Text>
                    <TextInput
                        style={styles.entry}
                        onChangeText={setAge}
                        keyboardType='numeric'
                        maxLength={AGE_MAX_LENGTH}/>

                    <Text style={[styles.question, {marginTop: 32}]}>Weight</Text>
                    <TextInput
                        style={styles.entry}
                        placeholder='kg'
                        onChangeText={setWeight}
                        keyboardType='numeric'
                        maxLength={WEIGHT_MAX_LENGTH}/>

                    <Text style={[styles.question, {marginTop: 32}]}>Height</Text>
                    <TextInput
                        style={styles.entry}
                        placeholder='cm'
                        onChangeText={setHeight}
                        keyboardType='numeric'
                        maxLength={HEIGHT_MAX_LENGTH}/>
                </View>
            
                <View style={continue_button_container}>
                    <ContinueButton pressHandler={openNextScreen}/>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({

    question: {
        fontSize: 18,
    },

    middle_button_container: {
        width: '100%',
        marginTop: 32,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    
    entry:{
        width: '50%',
        marginTop: 16,
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        justifyContent: 'center',
    },
});