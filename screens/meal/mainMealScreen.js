import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import {
    GetUserMealsCaloriesGoal,
    GetUserMealsCarbsGoal,
    GetUserMealsProteinGoal,
    GetUserMealsFatGoal
} from '../../database/services/user_services/user_meals_services';
import { GetUserPreferenceIsMealReady, SetUserPreferenceIsMealReady } from '../../database/services/user_services/user_preferences_services';

import { container } from '../../styles/miscStyles';

import MealBox from '../../components/meal/mealBox';
import WaterBox from '../../components/meal/waterBox';



export default function MainMealScreen({ navigation }){
    const [isMealReady, setIsMealReady] = React.useState(false);
    
    const [calories, setCalories] = React.useState(null);
    const [carbs, setCarbs] = React.useState(null);
    const [protein, setProtein] = React.useState(null);
    const [fat, setFat] = React.useState(null);
    const [water, setWater] = React.useState(null);



    const focus = useIsFocused();
    React.useEffect(() => {
        // SetUserPreferenceIsMealReady(false);
        GetUserPreferenceIsMealReady(setIsMealReady);

        if(isMealReady) {
            GetUserMealsCaloriesGoal(setCalories);
            GetUserMealsCarbsGoal(setCarbs);
            GetUserMealsProteinGoal(setProtein);
            GetUserMealsFatGoal(setFat);
        }
    }, [focus]);

    const openSetupScreen = () => {
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

    return(
        <SafeAreaView style={container}>
            <View style={styles.header}>
                <View style={styles.infoBox}>
                    <Text style={styles.primaryText}>0 / {calories}</Text>
                    <Text style={styles.subText}>calories</Text>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoBox}>
                        <Text style={styles.secondaryText}>0 / {carbs} g</Text>
                        <Text style={styles.subText}>carbs</Text>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.secondaryText}>0 / {protein} g</Text>
                        <Text style={styles.subText}>protein</Text>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.secondaryText}>0 / {fat} g</Text>
                        <Text style={styles.subText}>fat</Text>
                    </View>
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.subtitle}>Water</Text>

                <WaterBox 
                    mililiters={water}
                    addWaterHandler={() => console.log('add')}
                    removeWaterHandler={() => console.log('remove')}/>
                
                <Text style={styles.subtitle}>Meals</Text>

                <MealBox 
                    title='Breackfast'
                    pressHandler={() => console.log('pressed')}/>
                    
                <MealBox 
                    style={{marginTop: 16}}
                    title='Lunch'
                    pressHandler={() => console.log('pressed')}/>
                    
                <MealBox 
                    style={{marginTop: 16}}
                    title='Dinner'
                    pressHandler={() => console.log('pressed')}/>
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