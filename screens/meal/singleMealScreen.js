import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

import { GetSingleMealScreenData, RemoveMealFoodData } from '../../database/screen/meal/single_meal_services';

import { container, back_button_container, subtitle, content_start, question } from '../../styles/miscStyles';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../styles/colors';

import BackButton from '../../components/misc/backButton';
import MealItemList from '../../components/meal/mealItemList';
import ActionButton from '../../components/misc/actionButton';



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
        <SafeAreaView style={container}>
            <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
                <View style={back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={content_start}>
                    <Text style={[question, {fontSize: 24, marginBottom: 0}]}>{name}</Text>

                    <Text style={subtitle}>Total</Text>

                    <View style={styles.results}>
                        <Text style={styles.title}>{calories} cal</Text>

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

                    <Text style={subtitle}>Meals</Text>

                    {foods ? <>{MealItemList(foods, removeFoodItem)}</> : null }
                </View>
            </ScrollView>
        
            <ActionButton title='Add' pressHandler={openAddScreen}/>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
        marginTop: 16
    },

    results: {
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
        color: PRIMARY_COLOR,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 24
    },
});