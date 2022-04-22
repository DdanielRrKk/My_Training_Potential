import React from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import LoadingScreen from '../loadingScreen';

import { GetAppState } from '../../database/screen/app_serices';
import { 
    GetMainHomeScreenData,
    GetMainAndOnlyMealHomeScreenData,
    GetMainAndOnlyWorkoutHomeScreenData,
    GetAllHomeScreenData
} from '../../database/screen/home/home_services';

import { stylesMisc } from '../../styles/miscStyles';
import { stylesHome } from '../../styles/homeStyles';

import OptionsButton from '../../components/home/optionsButton';
import SetupBox from '../../components/home/setupBox';
import LogBox from '../../components/home/logBox';
import GroupLogBox from '../../components/home/groupLogBox';
import WorkoutBox from '../../components/workout/workoutBox';
import NutritionsBox from '../../components/home/nutritionsBox';

import { 
    SYSTEM_USER_SETUP,
    SYSTEM_USER_AND_MEAL_SETUP,
    SYSTEM_USER_AND_WORKOUT_SETUP,
    SYSTEM_ALL_SETUP
 } from '../../helpers/constants';



export default function MainHomeScreen({ navigation }){
    const [systemState, setSystemState] = React.useState(null);
    const [isMealSetup, setIsMealSetup] = React.useState(false);
    const [isWorkoutSetup, setIsWorkoutSetup] = React.useState(false);

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
    

    console.log('systemState home', systemState);

    const focus = useIsFocused();
    React.useEffect(() => {
        let isGood = true;

        GetAppState().then((state) => { // ima problem tuk s memory leak
            setSystemState(state);

            setIsMealSetup(state == SYSTEM_USER_AND_MEAL_SETUP || state == SYSTEM_ALL_SETUP);
            setIsWorkoutSetup(state == SYSTEM_USER_AND_WORKOUT_SETUP || state == SYSTEM_ALL_SETUP);

            switch(state) {
                case SYSTEM_USER_SETUP: 
                    GetMainHomeScreenData().then(({ name, weight }) => { 
                        if(isGood) {
                            setName(name);
                            setWeight(weight);
                        }
                    });
                    break;

                case SYSTEM_USER_AND_MEAL_SETUP: 
                    GetMainAndOnlyMealHomeScreenData().then(({
                        name, 
                        weight,
                        caloriesPercentage,
                        carbsPercentage,
                        proteinPercentage,
                        fatPercentage,
                        caloriesGoal,
                        carbsGoal,
                        proteinGoal,
                        fatGoal
                    }) => { 
                        if(isGood) {
                            setName(name);
                            setWeight(weight);
                            
                            setCaloriesPercentage(parseFloat(caloriesPercentage));
                            setCarbsPercentage(parseFloat(carbsPercentage));
                            setProteinPercentage(parseFloat(proteinPercentage));
                            setFatPercentage(parseFloat(fatPercentage));
        
                            setCaloriesGoal(caloriesGoal);
                            setCarbsGoal(carbsGoal);
                            setProteinGoal(proteinGoal);
                            setFatGoal(fatGoal);
                        }
                    });
                    break;

                case SYSTEM_USER_AND_WORKOUT_SETUP: 
                    GetMainAndOnlyWorkoutHomeScreenData().then(({ name, weight, todaysWorkout }) => { 
                        if(isGood) {
                            setName(name);
                            setWeight(weight);
                            setTodaysWorkout(todaysWorkout);
                        }
                    });
                    break;

                case SYSTEM_ALL_SETUP: 
                    GetAllHomeScreenData().then(({
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
                        todaysWorkout
                    }) => { 
                        if(isGood) {
                            setName(name);
                            setWeight(weight);
        
                            setCaloriesPercentage(parseFloat(caloriesPercentage));
                            setCarbsPercentage(parseFloat(carbsPercentage));
                            setProteinPercentage(parseFloat(proteinPercentage));
                            setFatPercentage(parseFloat(fatPercentage));
            
                            setCaloriesGoal(caloriesGoal);
                            setCarbsGoal(carbsGoal);
                            setProteinGoal(proteinGoal);
                            setFatGoal(fatGoal);
            
                            setTodaysWorkout(todaysWorkout);
                        }
                    });
                    break;

                default: return;
            };
        });

        return () => {  isGood = false; } // to prevent memory leaks (clean up)
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
        fatGoal        
    ]);

    if(systemState == null) {
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
