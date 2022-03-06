import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ScrollView } from 'react-native';

import { GetSingleMealScreenData, RemoveMealFoodData } from '../../database/screen/meal/single_meal_services';

import { container, back_button_container } from '../../styles/miscStyles';

import BackButton from '../../components/misc/backButton';
import MealItemList from '../../components/meal/mealItemList';



export default function SingleMealScreen({ navigation, route }){
    const [mealNumber, setMealNumber] = React.useState(null);
    const [name, setName] = React.useState(null);
    
    const [recommendedMin, setRecommendedMin] = React.useState('0');
    const [recommendedMax, setRecommendedMax] = React.useState('0');
    const [calories, setCalories] = React.useState('0');
    const [carbs, setCarbs] = React.useState('0');
    const [protein, setProtein] = React.useState('0');
    const [fat, setFat] = React.useState('0');
    const [foods, setFoods] = React.useState(null);

    React.useEffect(() => {
        if(route.params?.meal_number) setMealNumber(route.params.meal_number);
    }, [route.params?.meal_number]);

    React.useEffect(() => {
        let isGood = true;

        if(mealNumber == null) return;

        GetSingleMealScreenData(mealNumber).then(({
            name,
            recommendedMin,
            recommendedMax,
            calories,
            carbs,
            protein,
            fat, 
            foods
        }) => { 
            if(isGood) {
                setName(name);
                setRecommendedMin((recommendedMin)? recommendedMin : '0');
                setRecommendedMax((recommendedMax)? recommendedMax : '0');
                setCalories((calories)? calories : '0');
                setCarbs((carbs)? carbs : '0');
                setProtein((protein)? protein : '0');
                setFat((fat)? fat : '0');
                setFoods(foods);
            }
        });

        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, [
        mealNumber,
        name,
        recommendedMin,
        recommendedMax,
        calories,
        carbs,
        protein,
        fat,
        foods
    ]);

    const openPrevScreen = () => navigation.goBack();

    const openAddScreen = () => navigation.navigate('AddMealScreen', {meal_number: mealNumber});

    const removeFoodItem = (key) => {
        RemoveMealFoodData(mealNumber, key);
        const temp = foods.splice(key, 1);
        setFoods(temp);
    }

    return(
        <SafeAreaView style={[container]}>
            <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
                <View style={back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>{name}</Text>

                    <Text style={styles.subtitle}>Total</Text>

                    <View style={styles.results}>
                        <Text style={[styles.title, {marginTop: 16}]}>{calories} cal</Text>

                        <View style={[styles.row, {marginTop: 16}]}>
                            <Text style={styles.labels}>Recommended</Text>
                            
                            <Text style={styles.labels}>{recommendedMin} - {recommendedMax} cal</Text>
                        </View>
                        
                        <View style={styles.row}>
                            <Text style={styles.labels}>Calories</Text>
                            
                            <Text style={styles.labels}>{calories} cal</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.labels}>Carbs</Text>
                            
                            <Text style={styles.labels}>{carbs} g</Text>
                        </View>
                        
                        <View style={styles.row}>
                            <Text style={styles.labels}>Protein</Text>
                            
                            <Text style={styles.labels}>{protein} g</Text>
                        </View>

                        <View style={[styles.row, {marginBottom: 16}]}>
                            <Text style={styles.labels}>Fat</Text>
                            
                            <Text style={styles.labels}>{fat} g</Text>
                        </View>
                    </View>

                    <Text style={styles.subtitle}>Meals</Text>

                    {foods ? <>{MealItemList(foods, removeFoodItem)}</> : null }
                </View>
            </ScrollView>
        
            <TouchableOpacity
                style={styles.add}
                onPress={openAddScreen}>
                <Text>Add</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({

    footer: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-end',
    },

    content: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
    },

    title: {
        fontSize: 24,
        textAlign: 'center'
    },
    
    subtitle: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
        fontSize: 18,
        paddingVertical: 16
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
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginTop: 16,
        alignItems: 'center',
    },
});