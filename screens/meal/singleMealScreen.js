import React from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { 
    GetBreakfastData,
    GetLunchData,
    GetDinnerData,
    RemoveBreakfastFoodData,
    RemoveLunchFoodData,
    RemoveDinnerFoodData
} from '../../database/screen/meal/single_meal_services';

import { stylesMisc } from '../../styles/miscStyles';
import { stylesMeal } from '../../styles/mealStyles';

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
    const [foods, setFoods] = React.useState([]);

    React.useEffect(() => {
        if(route.params?.meal_number) setMealNumber(route.params.meal_number);
    }, [route.params?.meal_number]);

    const focus = useIsFocused();
    React.useEffect(() => {
        let isGood = true;
        const foodsLength = foods.length;

        if(mealNumber == null) return;

        if(mealNumber == 1) {
            GetBreakfastData().then(({
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
                    setRecommendedMin(recommendedMin);
                    setRecommendedMax(recommendedMax);
                    setCalories(calories);
                    setCarbs(carbs);
                    setProtein(protein);
                    setFat(fat);
                    if(foods.length != foodsLength) setFoods(foods);
                }
            });
        }
        if(mealNumber == 2) {
            GetLunchData().then(({
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
                    setRecommendedMin(recommendedMin);
                    setRecommendedMax(recommendedMax);
                    setCalories(calories);
                    setCarbs(carbs);
                    setProtein(protein);
                    setFat(fat);
                    if(foods.length != foodsLength) setFoods(foods);
                }
            });
        }
        if(mealNumber == 3) {
            GetDinnerData().then(({
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
                    setRecommendedMin(recommendedMin);
                    setRecommendedMax(recommendedMax);
                    setCalories(calories);
                    setCarbs(carbs);
                    setProtein(protein);
                    setFat(fat);
                    if(foods.length != foodsLength) setFoods(foods);
                }
            });
        }

        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, [
        focus,
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
        if(mealNumber == 1) {
            RemoveBreakfastFoodData(key).then(() => {
                const temp = foods.splice(key, 1);
                setFoods(temp);
            });
        }
        if(mealNumber == 2) {
            RemoveLunchFoodData(key).then(() => {
                const temp = foods.splice(key, 1);
                setFoods(temp);
            });
        }
        if(mealNumber == 3) {
            RemoveDinnerFoodData(key).then(() => {
                const temp = foods.splice(key, 1);
                setFoods(temp);
            });
        }
    }

    return(
        <SafeAreaView style={stylesMisc.container}>
            <ScrollView style={stylesMisc.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={stylesMisc.back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={stylesMisc.content_start}>
                    <Text style={stylesMeal.question}>{name}</Text>

                    <Text style={stylesMisc.subtitle}>Total</Text>

                    <View style={stylesMeal.results_single}>
                        <Text style={stylesMeal.title}>{calories} cal</Text>

                        <View style={stylesMeal.row_first}>
                            <Text style={stylesMeal.labels}>Recommended</Text>
                            
                            <Text style={stylesMeal.labels}>{recommendedMin} - {recommendedMax} cal</Text>
                        </View>
                        
                        <View style={stylesMeal.row}>
                            <Text style={stylesMeal.labels}>Calories</Text>
                            
                            <Text style={stylesMeal.labels}>{calories} cal</Text>
                        </View>

                        <View style={stylesMeal.row}>
                            <Text style={stylesMeal.labels}>Carbs</Text>
                            
                            <Text style={stylesMeal.labels}>{carbs} g</Text>
                        </View>
                        
                        <View style={stylesMeal.row}>
                            <Text style={stylesMeal.labels}>Protein</Text>
                            
                            <Text style={stylesMeal.labels}>{protein} g</Text>
                        </View>

                        <View style={stylesMeal.row_last}>
                            <Text style={stylesMeal.labels}>Fat</Text>
                            
                            <Text style={stylesMeal.labels}>{fat} g</Text>
                        </View>
                    </View>

                    <Text style={stylesMisc.subtitle}>Meals</Text>

                    {foods ? <>{MealItemList(foods, removeFoodItem)}</> : null }
                </View>
            </ScrollView>
        
            <ActionButton title='Add' pressHandler={openAddScreen}/>
        </SafeAreaView>
    );
};
