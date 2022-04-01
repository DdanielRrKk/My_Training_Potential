import React from 'react';
import { Text, View, SafeAreaView, KeyboardAvoidingView } from 'react-native';

import { SetUserMeasurements, GetUserMeasurements } from '../../database/screen/landing_services';

import { continue_button_container } from '../../styles/setupStyles';
import { container, content, back_button_container, question } from '../../styles/miscStyles';

import ContinueButton from '../../components/misc/setup/continueButton';
import BackButton from '../../components/misc/backButton';
import TextEntry from '../../components/misc/textEntry';

import { useSystemFlagsGlobal } from '../../helpers/globalState';
import { AGE_MAX_LENGTH, WEIGHT_MAX_LENGTH, HEIGHT_MAX_LENGTH } from '../../helpers/constants';




export default function LandingMeasurementsScreen({ navigation }){
    const [systemFlags, setSystemFlags] = useSystemFlagsGlobal();

    const [age, setAge] = React.useState(null);
    const [weight, setWeight] = React.useState(null);
    const [height, setHeight] = React.useState(null);

    React.useEffect(() => {
        let isGood = true;
        GetUserMeasurements().then(({age, weight, height}) => { 
            if(isGood) {
                setAge(age);
                setWeight(weight);
                setHeight(height);
            }
        });
        return () => { isGood = false; } // to prevent memory leaks (clean up)
    }, []);

    const openPrevScreen = () => navigation.goBack();

    const openNextScreen = () => {
        SetUserMeasurements(age, weight, height);
        setSystemFlags({...systemFlags, isUserReady: true});
    }
 
    return(
        <SafeAreaView style={container}>
            <KeyboardAvoidingView>
                <View style={back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={[content, {width: 'auto'}]}>
                    <Text style={question}>Age</Text>
                    <TextEntry
                        style={{width: '50%'}}
                        onChangeText={setAge}
                        value={age}
                        maxLength={AGE_MAX_LENGTH}
                        isNumeric={true}/>

                    <Text style={[question, {marginTop: 32}]}>Weight</Text>
                    <TextEntry
                        style={{width: '50%'}}
                        placeholder='kg'
                        onChangeText={setWeight}
                        value={weight}
                        maxLength={WEIGHT_MAX_LENGTH}
                        isNumeric={true}/>

                    <Text style={[question, {marginTop: 32}]}>Height</Text>
                    <TextEntry
                        style={{width: '50%'}}
                        placeholder='cm'
                        onChangeText={setHeight}
                        value={height}
                        maxLength={HEIGHT_MAX_LENGTH}
                        isNumeric={true}/>
                </View>
            
                <View style={continue_button_container}>
                    <ContinueButton pressHandler={openNextScreen}/>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
