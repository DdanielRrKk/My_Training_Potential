import React from 'react';
import { Text, View, SafeAreaView, KeyboardAvoidingView } from 'react-native';

import { stylesMisc } from '../../styles/miscStyles';
import { stylesCalculator } from '../../styles/learnStyles';

import BackButton from '../../components/misc/backButton';
import GroupButton from '../../components/misc/groupButton';
import NumberInput from '../../components/misc/numberInput';

import { 
    WEIGHT_MAX_LENGTH,
    HEIGHT_MAX_LENGTH 
} from '../../helpers/constants';



export default function CalculatorScreen({ navigation, route }){
    const [calculatorNumber, setCalculatorNumber] = React.useState(0);

    const [gender, setGender] = React.useState(null);
    const [height, setHeight] = React.useState(null);
    const [weight, setWeight] = React.useState(null);


    React.useEffect(() => {
        if(route.params?.calculatorNumber) setCalculatorNumber(route.params?.calculatorNumber);
    }, [route.params?.calculatorNumber]);

    
    const openPrevScreen = () => navigation.goBack();

    // Height
    const changeHeightHandler = (value) => setHeight(value);
    const incHeightHandler = () => setHeight(`${GetCorrectTextInput(height, true)}`);
    const decHeightHandler = () => setHeight(`${GetCorrectTextInput(height, false)}`);
    
    // Weight
    const changeWeightHandler = (value) => setWeight(value);
    const incWeightHandler = () => setWeight(`${GetCorrectTextInput(weight, true)}`);
    const decWeightHandler = () => setWeight(`${GetCorrectTextInput(weight, false)}`);
    
    return(
        <SafeAreaView style={stylesMisc.container}>
            <KeyboardAvoidingView style={stylesMisc.keyboardContainer}>
                <View style={stylesMisc.back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={stylesMisc.content_start}>
                    <Text style={stylesMisc.subtitle}>Calculator</Text>

                    <View style={stylesCalculator.subBox}>
                        <GroupButton 
                            is_selected={(gender == 0)? true : false}
                            title={'Male'}
                            pressHandler={() => setGender(0)}/>

                        <GroupButton 
                            is_selected={(gender == 1)? true : false}
                            title={'Female'}
                            pressHandler={() => setGender(1)}/>
                    </View>

                    <View style={stylesCalculator.box}>
                        <View style={stylesCalculator.subBox}>
                            <Text style={stylesCalculator.text}>Weight</Text>

                            <NumberInput
                                value={weight}
                                onChangeHandler={changeHeightHandler}
                                incValueHandler={incHeightHandler}
                                decValueHandler={decHeightHandler}
                                maxLength={WEIGHT_MAX_LENGTH}/>
                        </View>

                        <View style={stylesCalculator.subBox_middle}>
                            <Text style={stylesCalculator.text}>Height</Text>

                            <NumberInput
                                value={height}
                                onChangeHandler={changeWeightHandler}
                                incValueHandler={incWeightHandler}
                                decValueHandler={decWeightHandler}
                                maxLength={HEIGHT_MAX_LENGTH}/>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
