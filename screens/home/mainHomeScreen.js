import React from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import LoadingScreen from '../loadingScreen';

import { GetHomeScreenData } from '../../database/screen/home/home_services';

import { stylesMisc } from '../../styles/miscStyles';
import { stylesHome } from '../../styles/homeStyles';

import OptionsButton from '../../components/home/optionsButton';
import SetupBox from '../../components/home/setupBox';
import LogBox from '../../components/home/logBox';
import GroupLogBox from '../../components/home/groupLogBox';
import WorkoutBox from '../../components/workout/workoutBox';
import NutritionsBox from '../../components/home/nutritionsBox';



export default function MainHomeScreen({ navigation }){
    const [isMealSetup, setIsMealSetup] = React.useState(null);
    const [isWorkoutSetup, setIsWorkoutSetup] = React.useState(null);

    const [name, setName] = React.useState(null);
    const [weight, setWeight] = React.useState('0');
    
    const [caloriesPercentage, setCaloriesPercentage] = React.useState(null);
    const [carbsPercentage, setCarbsPercentage] = React.useState(null);
    const [proteinPercentage, setProteinPercentage] = React.useState(null);
    const [fatPercentage, setFatPercentage] = React.useState(null);
    
    const [caloriesGoal, setCaloriesGoal] = React.useState(null);
    const [carbsGoal, setCarbsGoal] = React.useState(null);
    const [proteinGoal, setProteinGoal] = React.useState(null);
    const [fatGoal, setFatGoal] = React.useState(null);
    
    const [todaysWorkout, setTodaysWorkout] = React.useState(null);
    

    console.log('isMealSetup home', isMealSetup);
    console.log('isWorkoutSetup home', isWorkoutSetup);

    const focus = useIsFocused();
    React.useEffect(() => {
        let isGood = true;

        GetHomeScreenData().then(({
            name, 
            weight,
            caloriesPercentage,
            carbsPercentage,
            proteinPercentage,
            fatPercentage,
            caloriesGoal,
            carbsGoal,
            proteinGoal,
            fatGoal,
            todaysWorkout,
            isMealSetup,
            isWorkoutSetup
        }) => { 
            if(isGood) {
                setName(name);
                setWeight(weight);

                if(isMealSetup) {
                    setCaloriesPercentage(parseFloat(caloriesPercentage));
                    setCarbsPercentage(parseFloat(carbsPercentage));
                    setProteinPercentage(parseFloat(proteinPercentage));
                    setFatPercentage(parseFloat(fatPercentage));

                    setCaloriesGoal(caloriesGoal);
                    setCarbsGoal(carbsGoal);
                    setProteinGoal(proteinGoal);
                    setFatGoal(fatGoal);
                }

                if(isWorkoutSetup) {
                    setTodaysWorkout(todaysWorkout);
                }

                setIsMealSetup(isMealSetup);
                setIsWorkoutSetup(isWorkoutSetup);
            }
        });

        return () => { isGood = false; } // to prevent memory leaks (clean up)
    }, [
        focus,
        name,
        weight,
        caloriesPercentage,
        carbsPercentage,
        proteinPercentage,
        fatPercentage,
        caloriesGoal,
        carbsGoal,
        proteinGoal,
        fatGoal,
        isMealSetup,
        isWorkoutSetup 
    ]);

    if(isMealSetup == null || isWorkoutSetup == null) {
        return(
            <LoadingScreen />
        );
    }

    const openOptionsScreen = () => navigation.navigate('MainSettingsScreen');
    
    const openSetupNutritionScreen = () => {
        navigation.setOptions({ tabBarVisible: false });
        navigation.navigate('SetupMealGoalScreen');
    }
    const openSetupWorkoutScreen = () => {
        navigation.setOptions({ tabBarVisible: false });
        navigation.navigate('SetupWorkoutPlanScreen');
    }

    const openWeightLogScreen = () => {
        navigation.setOptions({ tabBarVisible: false });
        navigation.navigate('WeightScreen');
    }

    const openStartWorkoutScreen = () => {
        navigation.setOptions({ tabBarVisible: false });
        navigation.navigate('StartWorkoutScreen', {exercises: todaysWorkout.exercises, day_name: todaysWorkout.name});
    }
    const openWorkoutScreen = () => {
        navigation.setOptions({ tabBarVisible: false });
        navigation.navigate('OpenWorkoutScreen', {day_number: todaysWorkout.day_number});
    }

    const openWorkoutLogScreen = () => {
        navigation.setOptions({ tabBarVisible: false });
        navigation.navigate('WorkoutLogsScreen');
    }
    const openMealLogScreen = () => {
        navigation.setOptions({ tabBarVisible: false });
        navigation.navigate('MealLogsScreen');
    }
 
    return(
        <SafeAreaView style={stylesHome.container}>
            <ScrollView style={stylesMisc.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={stylesHome.top_button_container}>
                    <Text style={stylesHome.title}>Welcome {name}</Text>

                    <OptionsButton pressHandler={openOptionsScreen}/>
                </View>

                <View style={stylesMisc.content_start}>
                    <Text style={stylesMisc.subtitle}>Nutrition</Text>
                    
                    { // Nutritions ================ START
                    isMealSetup ?
                        <NutritionsBox 
                            caloriesGoal={caloriesGoal}
                            caloriesPercentage={caloriesPercentage}
                            carbsGoal={carbsGoal}
                            carbsPercentage={carbsPercentage}
                            proteinGoal={proteinGoal}
                            proteinPercentage={proteinPercentage}
                            fatGoal={fatGoal}
                            fatPercentage={fatPercentage}/>
                    :
                        <SetupBox pressHandler={openSetupNutritionScreen}/>
                    // Nutritions ================ END
                    } 

                    <Text style={stylesMisc.subtitle}>Workout</Text>
                    
                    { // Workout ================ START
                    (isWorkoutSetup && todaysWorkout != null) ?
                        <WorkoutBox 
                            day={todaysWorkout}
                            isToday={true}
                            startHandler={openStartWorkoutScreen}
                            openHandler={openWorkoutScreen}/>
                    : 
                        <SetupBox pressHandler={openSetupWorkoutScreen}/>
                    // Workout ================ END
                    } 
                    
                    <Text style={stylesMisc.subtitle}>Weight Log</Text>
                    
                    <LogBox 
                        value={weight}
                        title='current weight'
                        pressHandler={openWeightLogScreen}/>
                    
                    <Text style={stylesMisc.subtitle}>History</Text>

                    <View style={stylesHome.middle_button_container}>
                        <GroupLogBox 
                            title='Workout History'
                            pressHandler={openWorkoutLogScreen}/>

                        <GroupLogBox 
                            title='Meal History'
                            pressHandler={openMealLogScreen}/>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
