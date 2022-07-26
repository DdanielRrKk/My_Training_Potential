import React from 'react';
import { Text, View, SafeAreaView, KeyboardAvoidingView } from 'react-native';

import { stylesMisc } from '../../styles/miscStyles';
import { stylesCalculator } from '../../styles/learnStyles';

import BackButton from '../../components/misc/backButton';
import GroupButton from '../../components/misc/groupButton';
import NumberInput from '../../components/misc/numberInput';
import CalculatorPicker from '../../components/learn/calculatorPicker';
import ActionButton from '../../components/misc/actionButton';

import { GetCorrectTextInput } from '../../helpers/helpers';
import {
    calculateBMI,
    calculateBFP,
    calculateBMR,
    calculateIBW,
    calculateLBM
} from '../../helpers/calculations';
import { 
    AGE_MAX_LENGTH,
    WEIGHT_MAX_LENGTH,
    HEIGHT_MAX_LENGTH 
} from '../../helpers/constants';



export default function CalculatorScreen({ navigation }){
    const [calculatorNumber, setCalculatorNumber] = React.useState('1');
    
    const [resultText, setResultText] = React.useState('');
    const [result, setResult] = React.useState(null);

    const [gender, setGender] = React.useState(null);
    const [age, setAge] = React.useState(null);
    const [height, setHeight] = React.useState(null);
    const [weight, setWeight] = React.useState(null);


    React.useEffect(() => { }, [result]);


    const openPrevScreen = () => navigation.goBack();

    const changeCalculatorHandler = (value) => setCalculatorNumber(value);

    // Gender
    const changeGenderToMaleHandler = () => setGender(0);
    const changeGenderToFemaleHandler = () => setGender(1);

    // Age
    const changeAgeHandler = (value) => setAge(value);
    const incAgeHandler = () => setAge(`${GetCorrectTextInput(age, true)}`);
    const decAgeHandler = () => setAge(`${GetCorrectTextInput(age, false)}`);
    
    // Height
    const changeHeightHandler = (value) => setHeight(value);
    const incHeightHandler = () => setHeight(`${GetCorrectTextInput(height, true)}`);
    const decHeightHandler = () => setHeight(`${GetCorrectTextInput(height, false)}`);
    
    // Weight
    const changeWeightHandler = (value) => setWeight(value);
    const incWeightHandler = () => setWeight(`${GetCorrectTextInput(weight, true)}`);
    const decWeightHandler = () => setWeight(`${GetCorrectTextInput(weight, false)}`);
    
    
    const calculate = () => { // !!!!!!!!!!!!BROKEN FORMULAS!!!!!!!!!!!!!
        const params = {
            gender: parseInt(gender),
            weight: parseInt(weight),
            height: Math.round(height / 100).toFixed(2),
            age: parseInt(age)
        };

        switch(calculatorNumber) {
            case '1': {
                setResult(calculateBMI(params.weight, params.height));
                setResultText('Body Mass Index');
                return;
            }
            case '2': {
                setResult(calculateBFP(params.gender, params.weight, params.height, params.age)); 
                setResultText('Basal Metabloc Rate');
                return;
            }
            case '3': {
                setResult(calculateBMR(params.gender, params.weight, params.height, params.age)); 
                setResultText('Body Fat Percentage');
                return;
            }
            case '4': {
                setResult(calculateIBW(params.gender, params.height)); 
                setResultText('Ideal Body Weight');
                return;
            }
            case '5': {
                setResult(calculateLBM(params.gender, params.weight, params.height)); 
                setResultText('Lean Body Mass');
                return;
            }
            default: return;
        }
    }

    return(
        <SafeAreaView style={stylesMisc.container}>
            <KeyboardAvoidingView style={stylesMisc.keyboardContainer}>
                <View style={stylesMisc.back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={stylesMisc.content_start}>
                    <Text style={stylesMisc.subtitle}>Calculator</Text>

                    <CalculatorPicker 
                        value={calculatorNumber}
                        changeHandler={changeCalculatorHandler}/>


                    <View style={stylesCalculator.subBox}>
                        <GroupButton 
                            is_selected={(gender == 0)? true : false}
                            title={'Male'}
                            pressHandler={changeGenderToMaleHandler}/>

                        <GroupButton 
                            is_selected={(gender == 1)? true : false}
                            title={'Female'}
                            pressHandler={changeGenderToFemaleHandler}/>
                    </View>

                    <View style={stylesCalculator.box}>
                        <View style={stylesCalculator.subBox}>
                            <Text style={stylesCalculator.text}>Age</Text>

                            <NumberInput
                                value={age}
                                onChangeHandler={changeAgeHandler}
                                incValueHandler={incAgeHandler}
                                decValueHandler={decAgeHandler}
                                maxLength={AGE_MAX_LENGTH}/>
                        </View>

                        <View style={stylesCalculator.subBox_middle}>
                            <Text style={stylesCalculator.text}>Weight</Text>

                            <NumberInput
                                value={weight}
                                onChangeHandler={changeWeightHandler}
                                incValueHandler={incWeightHandler}
                                decValueHandler={decWeightHandler}
                                maxLength={HEIGHT_MAX_LENGTH}/>
                        </View>

                        <View style={stylesCalculator.subBox_middle}>
                            <Text style={stylesCalculator.text}>Height</Text>

                            <NumberInput
                                value={height}
                                onChangeHandler={changeHeightHandler}
                                incValueHandler={incHeightHandler}
                                decValueHandler={decHeightHandler}
                                maxLength={WEIGHT_MAX_LENGTH}/>
                        </View>
                    </View>

                    {(result == null) ? null :
                        <View style={stylesCalculator.box}>
                            <Text style={stylesCalculator.text}>{resultText}</Text>
                            
                            <Text style={stylesCalculator.text}>{result}</Text>
                        </View>
                    }

                    <ActionButton title='Calculate' pressHandler={calculate}/>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
