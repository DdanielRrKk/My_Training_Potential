import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

import { useIsFocused  } from '@react-navigation/native';

import { GetMainMealScreenData, AddWater, RemoveWater } from '../../database/screen/meal/main_meal_services';

import { container } from '../../styles/miscStyles';

import MealBox from '../../components/meal/mealBox';
import WaterBox from '../../components/meal/waterBox';



export default function MainMealScreen({ navigation }){
    const [isMealReady, setIsMealReady] = React.useState(false);
    
    const [calories, setCalories] = React.useState(null);
    const [carbs, setCarbs] = React.useState(null);
    const [protein, setProtein] = React.useState(null);
    const [fat, setFat] = React.useState(null);
    
    const [caloriesGoal, setCaloriesGoal] = React.useState(null);
    const [carbsGoal, setCarbsGoal] = React.useState(null);
    const [proteinGoal, setProteinGoal] = React.useState(null);
    const [fatGoal, setFatGoal] = React.useState(null);

    const [water, setWater] = React.useState(null);
    
    const [breakfastCalories, setBreakfastCalories] = React.useState('');
    const [lunchCalories, setLunchCalories] = React.useState('');
    const [dinnerCalories, setDinnerCalories] = React.useState('');



    const focus = useIsFocused();
    React.useEffect(() => {
        let isGood = true;
        console.log('focus meal', focus);

        GetMainMealScreenData().then(({
            isMealReady, 
            calories, 
            carbs, 
            protein, 
            fat,
            caloriesGoal,
            carbsGoal,
            proteinGoal,
            fatGoal,
            water,
            breakfastCalories,
            lunchCalories,
            dinnerCalories
        }) => { 
            if(isGood) {
                setIsMealReady(isMealReady); 

                setCalories(calories);
                setCarbs(carbs);
                setProtein(protein);
                setFat(fat);

                setCaloriesGoal(caloriesGoal);
                setCarbsGoal(carbsGoal);
                setProteinGoal(proteinGoal);
                setFatGoal(fatGoal);

                setWater(water);

                setBreakfastCalories(breakfastCalories);
                setLunchCalories(lunchCalories);
                setDinnerCalories(dinnerCalories);
            }
        });

        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, [
        focus, 
        isMealReady,
        calories,
        carbs,
        protein,
        fat,
        caloriesGoal,
        carbsGoal,
        proteinGoal,
        fatGoal,
        water,
        breakfastCalories,
        lunchCalories,
        dinnerCalories
    ]);



    const openSetupScreen = () => {
        navigation.setOptions({ tabBarVisible: false });
        navigation.navigate('SetupMealGoalScreen');
    }

    if(!isMealReady || isMealReady == null) {
        return(
            <SafeAreaView style={container}>
                <TouchableOpacity 
                    style={styles.setUp}
                    onPress={openSetupScreen}>
                    <Text>Set Up Plan</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const addWaterHandler = () => {
        AddWater();
        setWater(water + 250);
    }
    
    const removeWaterHandler = () => {
        RemoveWater();
        if((water - 250) <= 0) {
            setWater(0);
            return;
        }
        setWater(water - 250);
    }

    const openAddBreackfastScreen = () => navigation.navigate('AddMealScreen', {meal_number: 1});
    const openAddLunchScreen = () => navigation.navigate('AddMealScreen', {meal_number: 2});
    const openAddDinnerScreen = () => navigation.navigate('AddMealScreen', {meal_number: 3});

    const openBreackfastScreen = () => navigation.navigate('SingleMealScreen', {meal_number: 1});
    const openLunchScreen = () => navigation.navigate('SingleMealScreen', {meal_number: 2});
    const openDinnerScreen = () => navigation.navigate('SingleMealScreen', {meal_number: 3});

    return(
        <SafeAreaView style={container}>
            <View style={styles.header}>
                <View style={styles.infoBox}>
                    <Text style={styles.primaryText}>{calories} / {caloriesGoal}</Text>
                    <Text style={styles.subText}>calories</Text>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoBox}>
                        <Text style={styles.secondaryText}>{carbs} / {carbsGoal} g</Text>
                        <Text style={styles.subText}>carbs</Text>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.secondaryText}>{protein} / {proteinGoal} g</Text>
                        <Text style={styles.subText}>protein</Text>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.secondaryText}>{fat} / {fatGoal} g</Text>
                        <Text style={styles.subText}>fat</Text>
                    </View>
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.subtitle}>Water</Text>

                <WaterBox 
                    mililiters={water}
                    addWaterHandler={addWaterHandler}
                    removeWaterHandler={removeWaterHandler}/>
                
                <Text style={styles.subtitle}>Meals</Text>

                <MealBox 
                    title='Breackfast'
                    totalCalories={breakfastCalories}
                    pressHandler={openAddBreackfastScreen}
                    openHandler={openBreackfastScreen}/>
                    
                <MealBox 
                    style={{marginTop: 16}}
                    title='Lunch'
                    totalCalories={lunchCalories}
                    pressHandler={openAddLunchScreen}
                    openHandler={openLunchScreen}/>
                    
                <MealBox 
                    style={{marginTop: 16}}
                    title='Dinner'
                    totalCalories={dinnerCalories}
                    pressHandler={openAddDinnerScreen}
                    openHandler={openDinnerScreen}/>
            </View>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    setUp: {
        backgroundColor: 'gray',
        width: '100%',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center'
    },

    header: {
        backgroundColor: 'gray',
        width: '100%',
        padding: 20,
        borderRadius: 10
    },

    infoBox: {
        alignItems: 'center',
    },

    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },

    primaryText: {
        fontSize: 24
    },

    secondaryText: {
        fontSize: 18
    },

    subText: {
        fontSize: 14
    },

    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    subtitle: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
        fontSize: 18,
        paddingVertical: 16
    },
});