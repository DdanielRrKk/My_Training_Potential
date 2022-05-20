import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import LoadingScreen from '../loadingScreen';

import { GetMainMealScreenData, AddWater, RemoveWater } from '../../database/screen/meal/main_meal_services';

import { stylesMisc } from '../../styles/miscStyles';
import { stylesMeal } from '../../styles/mealStyles';

import MealBox from '../../components/meal/mealBox';
import WaterBox from '../../components/meal/waterBox';
import SetupButtonView from '../../components/misc/setup/setupButtonView';



export default function MainMealScreen({ navigation }){
    const [isMealSetup, setIsMealSetup] = React.useState(null);

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


    // console.log('isMealSetup meal', isMealSetup);

    const focus = useIsFocused();
    React.useEffect(() => {
        let isGood = true;

        GetMainMealScreenData().then(({
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
            dinnerCalories,
            isMealSetup
        }) => { 
            // if(isGood) {
            //     if(!isMealSetup) {
            //         setIsMealSetup(isMealSetup);
            //         return;
            //     }
            //     setCalories(calories);
            //     setCarbs(carbs);
            //     setProtein(protein);
            //     setFat(fat);

            //     setCaloriesGoal(caloriesGoal);
            //     setCarbsGoal(carbsGoal);
            //     setProteinGoal(proteinGoal);
            //     setFatGoal(fatGoal);

            //     setWater(water);

            //     setBreakfastCalories(breakfastCalories);
            //     setLunchCalories(lunchCalories);
            //     setDinnerCalories(dinnerCalories);
                
            //     setIsMealSetup(isMealSetup);
            // }

            if(isGood && !isMealSetup) {
                setIsMealSetup(isMealSetup);
                return;
            }
            if(isGood && isMealSetup) {
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
                
                setIsMealSetup(isMealSetup);
            }
        });

        return () => { isGood = false; } // to prevent memory leaks (clean up)
    }, [
        focus,
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
        dinnerCalories,
        isMealSetup
    ]);

    
    if(isMealSetup == null) {
        return(
            <LoadingScreen />
        );
    }


    const openSetupScreen = () => {
        navigation.setOptions({ tabBarVisible: false });
        navigation.navigate('SetupMealGoalScreen');
    }

    if(!isMealSetup) {
        return(
            <SetupButtonView style={stylesMisc.container} pressHandler={openSetupScreen}/>
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
        <SafeAreaView style={stylesMisc.container}>
            <View style={stylesMeal.header}>
                <View style={stylesMeal.infoBox}>
                    <Text style={stylesMeal.primaryText}>{(calories) ? calories : '0'} / {(caloriesGoal) ? caloriesGoal : '0'}</Text>
                    <Text style={stylesMeal.subText}>calories</Text>
                </View>

                <View style={stylesMeal.infoContainer}>
                    <View style={stylesMeal.infoBox}>
                        <Text style={stylesMeal.secondaryText}>{(carbs) ? carbs : '0'} / {(carbsGoal) ? carbsGoal : '0'} g</Text>
                        <Text style={stylesMeal.subText}>carbs</Text>
                    </View>

                    <View style={stylesMeal.infoBox}>
                        <Text style={stylesMeal.secondaryText}>{(protein) ? protein : '0'} / {(proteinGoal) ? proteinGoal : '0'} g</Text>
                        <Text style={stylesMeal.subText}>protein</Text>
                    </View>

                    <View style={stylesMeal.infoBox}>
                        <Text style={stylesMeal.secondaryText}>{(fat) ? fat : '0'} / {(fatGoal) ? fatGoal : '0'} g</Text>
                        <Text style={stylesMeal.subText}>fat</Text>
                    </View>
                </View>
            </View>

            <View style={stylesMisc.content_start}>
                <Text style={stylesMisc.subtitle}>Water</Text>

                <WaterBox 
                    mililiters={water}
                    addWaterHandler={addWaterHandler}
                    removeWaterHandler={removeWaterHandler}/>
                
                <Text style={stylesMisc.subtitle}>Meals</Text>

                <MealBox 
                    title='Breackfast'
                    totalCalories={breakfastCalories}
                    pressHandler={openAddBreackfastScreen}
                    openHandler={openBreackfastScreen}/>
                    
                <MealBox 
                    style={stylesMeal.meal_box_margin}
                    title='Lunch'
                    totalCalories={lunchCalories}
                    pressHandler={openAddLunchScreen}
                    openHandler={openLunchScreen}/>
                    
                <MealBox 
                    style={stylesMeal.meal_box_margin}
                    title='Dinner'
                    totalCalories={dinnerCalories}
                    pressHandler={openAddDinnerScreen}
                    openHandler={openDinnerScreen}/>
            </View>
        </SafeAreaView>
    );
};
