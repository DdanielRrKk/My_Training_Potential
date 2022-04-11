import React from 'react';
import { Text, View, KeyboardAvoidingView, SafeAreaView } from 'react-native';

import { 
    AddBreakfastFoodData,
    AddLunchFoodData,
    AddDinnerFoodData
 } from '../../database/screen/meal/add_meal_services';

import { stylesMisc } from '../../styles/miscStyles';
import { stylesMeal } from '../../styles/mealStyles';

import BackButton from '../../components/misc/backButton';
import TextEntry from '../../components/misc/textEntry';
import ActionButton from '../../components/misc/actionButton';
import NumberInput from '../../components/misc/numberInput';

import { GetCorrectTextInput } from '../../helpers/helpers';
import { NAME_MAX_LENGTH, NUTRITIONS_MAX_LENGTH } from '../../helpers/constants';



export default function AddMealScreen({ navigation, route }){
    const [mealNumber, setMealNumber] = React.useState(null);

    const [name, setName] = React.useState(null);
    const [calories, setCalories] = React.useState('');
    const [carbs, setCarbs] = React.useState('');
    const [protein, setProtein] = React.useState('');
    const [fat, setFat] = React.useState('');

    React.useEffect(() => {
        if(route.params?.meal_number) setMealNumber(route.params.meal_number);
    }, [route.params?.meal_number]);

    const openPrevScreen = () => navigation.goBack();

    // calories
    const changeCaloriesHandler = (value) => setCalories(value);
    const incCaloriesHandler = () => setCalories(`${GetCorrectTextInput(calories, true)}`);
    const decCaloriesHandler = () => setCalories(`${GetCorrectTextInput(calories, false)}`);

    // carbs
    const changeCarbsHandler = (value) => setCarbs(value);
    const incCarbsHandler = () => setCarbs(`${GetCorrectTextInput(carbs, true)}`);
    const decCarbsHandler = () => setCarbs(`${GetCorrectTextInput(carbs, false)}`);

    // protein
    const changeProteinHandler = (value) => setProtein(value);
    const incProteinHandler = () => setProtein(`${GetCorrectTextInput(protein, true)}`);
    const decProteinHandler = () => setProtein(`${GetCorrectTextInput(protein, false)}`);

    // fat
    const changeFatHandler = (value) => setFat(value);
    const incFatHandler = () => setFat(`${GetCorrectTextInput(fat, true)}`);
    const decFatHandler = () => setFat(`${GetCorrectTextInput(fat, false)}`);

    const addMeal = () => {
        const tempCalories = (calories == '') ? 0 : parseInt(calories);
        const tempCarbs = (carbs == '') ? 0 : parseInt(carbs);
        const tempProtein = (protein == '') ? 0 : parseInt(protein);
        const tempFat = (fat == '') ? 0 : parseInt(fat);

        switch(mealNumber) {
            case 1: AddBreakfastFoodData(name, tempCalories, tempCarbs, tempProtein, tempFat).then(() => navigation.goBack()); break;
            case 2: AddLunchFoodData(name, tempCalories, tempCarbs, tempProtein, tempFat).then(() => navigation.goBack()); break;
            case 3: AddDinnerFoodData(name, tempCalories, tempCarbs, tempProtein, tempFat).then(() => navigation.goBack()); break;
            default: console.log('error with number', mealNumber);
        }
    }

    return(
        <SafeAreaView style={stylesMisc.container}>
            <KeyboardAvoidingView style={stylesMisc.keyboardContainer}>
                <View style={stylesMisc.back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={stylesMisc.content_start}>
                    <Text style={stylesMisc.question}>Meal Name</Text>

                    <TextEntry
                        onChangeText={setName}
                        maxLength={NAME_MAX_LENGTH}/>

                    <View style={stylesMeal.results}>
                        <View style={stylesMeal.row_first}>
                            <Text style={stylesMeal.label_18}>Calories (cal)</Text>
                            
                            <NumberInput
                                value={calories}
                                onChangeHandler={changeCaloriesHandler}
                                incValueHandler={incCaloriesHandler}
                                decValueHandler={decCaloriesHandler}
                                maxLength={NUTRITIONS_MAX_LENGTH}/>
                        </View>
                        
                        <View style={stylesMeal.row}>
                            <Text style={stylesMeal.label_18}>Carbohydrates (g)</Text>
                            
                            <NumberInput
                                value={carbs}
                                onChangeHandler={changeCarbsHandler}
                                incValueHandler={incCarbsHandler}
                                decValueHandler={decCarbsHandler}
                                maxLength={NUTRITIONS_MAX_LENGTH}/>
                        </View>
                        
                        <View style={stylesMeal.row}>
                            <Text style={stylesMeal.label_18}>Protein (g)</Text>
                            
                            <NumberInput
                                value={protein}
                                onChangeHandler={changeProteinHandler}
                                incValueHandler={incProteinHandler}
                                decValueHandler={decProteinHandler}
                                maxLength={NUTRITIONS_MAX_LENGTH}/>
                        </View>

                        <View style={stylesMeal.row_last}>
                            <Text style={stylesMeal.label_18}>Fat (g)</Text>
                            
                            <NumberInput
                                value={fat}
                                onChangeHandler={changeFatHandler}
                                incValueHandler={incFatHandler}
                                decValueHandler={decFatHandler}
                                maxLength={NUTRITIONS_MAX_LENGTH}/>
                        </View>
                    </View>
                </View>
            
                <ActionButton title='Add' pressHandler={addMeal}/>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
