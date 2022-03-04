import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, SafeAreaView } from 'react-native';

import { AddMealFoodData } from '../../database/screen/meal_services';

import { container, back_button_container } from '../../styles/miscStyles';

import BackButton from '../../components/misc/backButton';
import MealInput from '../../components/meal/mealInput';

import { GetCorrectMealInput } from '../../helpers/mealValidations';



const NAME_MAX_LENGTH = 40;

export default function AddMealScreen({ navigation, route }){
    const [mealNumber, setMealNumber] = React.useState(null);

    const [name, setName] = React.useState(null);
    const [calories, setCalories] = React.useState('0');
    const [carbs, setCarbs] = React.useState('0');
    const [protein, setProtein] = React.useState('0');
    const [fat, setFat] = React.useState('0');

    React.useEffect(() => {
        if(route.params?.meal_number) setMealNumber(route.params.meal_number);
    }, [route.params?.meal_number]);

    const openPrevScreen = () => navigation.goBack();

    // calories
    const changeCaloriesHandler = (value) => setCalories(value);
    const incCaloriesHandler = () => setCalories(`${GetCorrectMealInput(calories, true)}`);
    const decCaloriesHandler = () => setCalories(`${GetCorrectMealInput(calories, false)}`);

    // carbs
    const changeCarbsHandler = (value) => setCarbs(value);
    const incCarbsHandler = () => setCarbs(`${GetCorrectMealInput(carbs, true)}`);
    const decCarbsHandler = () => setCarbs(`${GetCorrectMealInput(carbs, false)}`);

    // protein
    const changeProteinHandler = (value) => setProtein(value);
    const incProteinHandler = () => setProtein(`${GetCorrectMealInput(protein, true)}`);
    const decProteinHandler = () => setProtein(`${GetCorrectMealInput(protein, false)}`);

    // fat
    const changeFatHandler = (value) => setFat(value);
    const incFatHandler = () => setFat(`${GetCorrectMealInput(fat, true)}`);
    const decFatHandler = () => setFat(`${GetCorrectMealInput(fat, false)}`);

    const addMeal = () => {
        AddMealFoodData(mealNumber, name, calories, carbs, protein, fat);
        route.params.refresh();
        navigation.goBack();
    }

    return(
        <SafeAreaView style={container}>
            <KeyboardAvoidingView style={{flex: 1, width: '100%'}}>
                <View style={back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={styles.content}>
                    <Text style={styles.question}>Meal Name</Text>

                    <TextInput
                        style={styles.entry}
                        onChangeText={setName}
                        maxLength={NAME_MAX_LENGTH}/>

                    <View style={styles.results}>
                        <View style={[styles.row, {marginTop: 16}]}>
                            <Text style={styles.labels}>Calories (cal)</Text>
                            
                            <MealInput
                                value={calories}
                                onChangeHandler={changeCaloriesHandler}
                                incValueHandler={incCaloriesHandler}
                                decValueHandler={decCaloriesHandler}/>
                        </View>
                        
                        <View style={styles.row}>
                            <Text style={styles.labels}>Carbohydrates (g)</Text>
                            
                            <MealInput
                                value={carbs}
                                onChangeHandler={changeCarbsHandler}
                                incValueHandler={incCarbsHandler}
                                decValueHandler={decCarbsHandler}/>
                        </View>
                        
                        <View style={styles.row}>
                            <Text style={styles.labels}>Protein (g)</Text>
                            
                            <MealInput
                                value={protein}
                                onChangeHandler={changeProteinHandler}
                                incValueHandler={incProteinHandler}
                                decValueHandler={decProteinHandler}/>
                        </View>

                        <View style={[styles.row, {marginBottom: 16}]}>
                            <Text style={styles.labels}>Fat (g)</Text>
                            
                            <MealInput
                                value={fat}
                                onChangeHandler={changeFatHandler}
                                incValueHandler={incFatHandler}
                                decValueHandler={decFatHandler}/>
                        </View>
                    </View>
                </View>
            
                <TouchableOpacity
                    style={styles.add}
                    onPress={addMeal}>
                    <Text>Add</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({

    content: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
    },

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

    entry:{
        width: '100%',
        marginVertical: 32,
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        justifyContent: 'center',
    },

    results: {
        width: '100%',
        backgroundColor: 'gray',
        borderRadius: 10
    },

    labels: {
        fontSize: 18
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 24
    },

    add: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 8,
        alignItems: 'center',
    },
});