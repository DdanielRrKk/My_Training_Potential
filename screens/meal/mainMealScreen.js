import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { GetMainMealScreenData, AddWater, RemoveWater } from '../../database/screen/meal/main_meal_services';

import { container, subtitle, content_start } from '../../styles/miscStyles';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../styles/colors';

import MealBox from '../../components/meal/mealBox';
import WaterBox from '../../components/meal/waterBox';
import SetupButtonView from '../../components/misc/setup/setupButtonView';

import { useSystemFlagsGlobal } from '../../helpers/globalState';



export default function MainMealScreen({ navigation, route }){
    const [systemFlags, setSystemFlags] = useSystemFlagsGlobal();

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

    // console.log('systemFlags meal', systemFlags);

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
            dinnerCalories
        }) => { 
            if(isGood) {
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

    if(!systemFlags.isMealReady || systemFlags == null) {
        return(
            <SetupButtonView style={container} pressHandler={openSetupScreen}/>
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
                    <Text style={styles.primaryText}>{(calories) ? calories : '0'} / {(caloriesGoal) ? caloriesGoal : '0'}</Text>
                    <Text style={styles.subText}>calories</Text>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoBox}>
                        <Text style={styles.secondaryText}>{(carbs) ? carbs : '0'} / {(carbsGoal) ? carbsGoal : '0'} g</Text>
                        <Text style={styles.subText}>carbs</Text>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.secondaryText}>{(protein) ? protein : '0'} / {(proteinGoal) ? proteinGoal : '0'} g</Text>
                        <Text style={styles.subText}>protein</Text>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.secondaryText}>{(fat) ? fat : '0'} / {(fatGoal) ? fatGoal : '0'} g</Text>
                        <Text style={styles.subText}>fat</Text>
                    </View>
                </View>
            </View>

            <View style={content_start}>
                <Text style={subtitle}>Water</Text>

                <WaterBox 
                    mililiters={water}
                    addWaterHandler={addWaterHandler}
                    removeWaterHandler={removeWaterHandler}/>
                
                <Text style={subtitle}>Meals</Text>

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
    header: {
        backgroundColor: PRIMARY_COLOR,
        width: '100%',
        padding: 20,
        borderRadius: 10,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
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
        fontSize: 24,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },
    secondaryText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },
    subText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },
});