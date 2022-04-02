import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView } from 'react-native';

import { AddMealFoodData } from '../../database/screen/meal/add_meal_services';

import { container, back_button_container, question, content_start } from '../../styles/miscStyles';

import BackButton from '../../components/misc/backButton';
import TextEntry from '../../components/misc/textEntry';
import ActionButton from '../../components/misc/actionButton';
import NumberInput from '../../components/misc/numberInput';

import { GetCorrectTextInput } from '../../helpers/helpers';
import { NAME_MAX_LENGTH, NUTRITIONS_MAX_LENGTH } from '../../helpers/constants';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../styles/colors';



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
        AddMealFoodData(mealNumber, name, (calories == '') ? 0 : calories, (carbs == '') ? 0 : carbs, (protein == '') ? 0 : protein, (fat == '') ? 0 : fat);
        navigation.goBack();
        return;
    }

    return(
        <SafeAreaView style={container}>
            <KeyboardAvoidingView style={{flex: 1, width: '100%'}}>
                <View style={back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={content_start}>
                    <Text style={question}>Meal Name</Text>

                    <TextEntry
                        onChangeText={setName}
                        maxLength={NAME_MAX_LENGTH}/>

                    <View style={styles.results}>
                        <View style={[styles.row, {marginTop: 16}]}>
                            <Text style={styles.labels}>Calories (cal)</Text>
                            
                            <NumberInput
                                value={calories}
                                onChangeHandler={changeCaloriesHandler}
                                incValueHandler={incCaloriesHandler}
                                decValueHandler={decCaloriesHandler}
                                maxLength={NUTRITIONS_MAX_LENGTH}/>
                        </View>
                        
                        <View style={styles.row}>
                            <Text style={styles.labels}>Carbohydrates (g)</Text>
                            
                            <NumberInput
                                value={carbs}
                                onChangeHandler={changeCarbsHandler}
                                incValueHandler={incCarbsHandler}
                                decValueHandler={decCarbsHandler}
                                maxLength={NUTRITIONS_MAX_LENGTH}/>
                        </View>
                        
                        <View style={styles.row}>
                            <Text style={styles.labels}>Protein (g)</Text>
                            
                            <NumberInput
                                value={protein}
                                onChangeHandler={changeProteinHandler}
                                incValueHandler={incProteinHandler}
                                decValueHandler={decProteinHandler}
                                maxLength={NUTRITIONS_MAX_LENGTH}/>
                        </View>

                        <View style={[styles.row, {marginBottom: 16}]}>
                            <Text style={styles.labels}>Fat (g)</Text>
                            
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



const styles = StyleSheet.create({
    results: {
        marginTop: 32,
        width: '100%',
        backgroundColor: SECONDARY_COLOR,
        borderRadius: 10,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

    labels: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 24
    },
});