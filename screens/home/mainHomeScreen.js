import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

// import { GetHomeScreenData } from '../../database/general/general_services';
import { GetHomeScreenData } from '../../database/screen/home_services';

import OptionsButton from '../../components/home/optionsButton';
import SetupBox from '../../components/home/setupBox';
import LogBox from '../../components/home/logBox';
import GroupLogBox from '../../components/home/groupLogBox';
import Progress from '../../components/meal/setup/progress';



export default function MainHomeScreen({ navigation }){
    const [isMealReady, setIsMealReady] = React.useState(false);

    const [name, setName] = React.useState(null);
    const [weight, setWeight] = React.useState(null);
    const [steps, setSteps] = React.useState(null);
    
    const [caloriesPercentage, setCaloriesPercentage] = React.useState(null);
    const [carbsPercentage, setCarbsPercentage] = React.useState(null);
    const [proteinPercentage, setProteinPercentage] = React.useState(null);
    const [fatPercentage, setFatPercentage] = React.useState(null);
    
    const [caloriesGoal, setCaloriesGoal] = React.useState(null);
    const [carbsGoal, setCarbsGoal] = React.useState(null);
    const [proteinGoal, setProteinGoal] = React.useState(null);
    const [fatGoal, setFatGoal] = React.useState(null);
    


    const focus = useIsFocused();
    React.useEffect(() => {
        let isGood = true;
        console.log('focus home', focus);

        GetHomeScreenData().then(({
            isMealReady, 
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
        }) => { 
            if(isGood) {
                setIsMealReady(isMealReady);
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

        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, [
        focus,
        name,
        weight,
        steps,
        caloriesPercentage,
        carbsPercentage,
        proteinPercentage,
        fatPercentage,
        caloriesGoal,
        carbsGoal,
        proteinGoal,
        fatGoal,
    ]);



    const openOptionsScreen = () => console.log('options');
    const openSetupNutritionScreen = () => {
        navigation.setOptions({ tabBarVisible: false });
        navigation.navigate('SetupMealGoalScreen');
    }
    const openSetupWorkoutScreen = () => console.log('setup workout');
    const openStepsLogScreen = () => console.log('setup steps log');
    const openWeightLogScreen = () => console.log('setup weight log');
    const openWorkoutLogScreen = () => console.log('setup workout log');
    const openMealLogScreen = () => console.log('setup meal log');
 
    return(
        <SafeAreaView style={[styles.container, {marginTop: StatusBar.currentHeight}]}>
            <ScrollView style={{flex: 1, width: '100%', padding: 16}}>
                <View style={styles.top_button_container}>
                    <Text style={styles.title}>Welcome {name}</Text>

                    <OptionsButton 
                        style={styles.options}
                        pressHandler={openOptionsScreen}/>
                </View>

                <View style={styles.content}>
                    <Text style={styles.subtitle}>Nutrition</Text>
                    
                    { // Nutritions ================ START
                    isMealReady 
                    ?
                    <View style={styles.results}>
                        <View style={[styles.row, {marginTop: 16}]}>
                            <Text style={styles.labels}>Calories</Text>
                            
                            <Text style={styles.labels}>{caloriesGoal} cal</Text>
                        </View>

                        <Progress
                            style={styles.progress} 
                            progress={caloriesPercentage} />
                        
                        <View style={styles.row}>
                            <Text style={styles.labels}>Carbs</Text>
                            
                            <Text style={styles.labels}>{carbsGoal} g</Text>
                        </View>

                        <Progress 
                            style={styles.progress} 
                            progress={carbsPercentage} />
                        
                        <View style={styles.row}>
                            <Text style={styles.labels}>Protein</Text>
                            
                            <Text style={styles.labels}>{proteinGoal} g</Text>
                        </View>

                        <Progress 
                            style={styles.progress} 
                            progress={proteinPercentage} />
                        
                        <View style={styles.row}>
                            <Text style={styles.labels}>Fat</Text>
                            
                            <Text style={styles.labels}>{fatGoal} g</Text>
                        </View>

                        <Progress 
                            style={[styles.progress, {marginBottom: 20}]} 
                            progress={fatPercentage} />
                    </View>
                    :
                    <SetupBox pressHandler={openSetupNutritionScreen}/>
                     // Nutritions ================ END
                    } 

                    <Text style={styles.subtitle}>Workout</Text>
                    
                    <SetupBox pressHandler={openSetupWorkoutScreen}/>

                    <Text style={styles.subtitle}>Steps Counter</Text>

                    <LogBox 
                        value={steps}
                        title='steps today'
                        pressHandler={openStepsLogScreen}/>
                    
                    <Text style={styles.subtitle}>Weight Log</Text>
                    
                    <LogBox 
                        value={weight}
                        title='current weight'
                        pressHandler={openWeightLogScreen}/>
                    
                    <Text style={styles.subtitle}>History</Text>

                    <View style={styles.middle_button_container}>
                        <GroupLogBox 
                            title='Workouts'
                            value={0}
                            subtitle='max squads'
                            pressHandler={openWorkoutLogScreen}/>

                        <GroupLogBox 
                            title='Meals'
                            value={0}
                            subtitle='yesterday'
                            pressHandler={openMealLogScreen}/>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    top_button_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    subtitle: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
        fontSize: 18,
        paddingVertical: 16
    },

    title: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24
    },

    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    middle_button_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32
    },

    results: {
        width: '100%',
        backgroundColor: 'gray',
        borderRadius: 10
    },

    labels: {
        fontSize: 16
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },

    progress: {
        margin: 16
    }
});