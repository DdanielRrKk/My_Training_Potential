import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { SetAndGetMealResults } from '../../../database/screen/meal_services';

import { continue_button_container } from '../../../styles/setupStyles';
import { container, content, back_button_container } from '../../../styles/miscStyles';

import BackButton from '../../../components/misc/backButton';
import ContinueButton from '../../../components/misc/setup/continueButton';
import Progress from '../../../components/meal/setup/progress';



const CALORIES_PERCENTAGE = 1; // 100%
const CARBS_PERCENTAGE_OF_CALORIES = 0.5; // 50%
const PROTEIN_PERCENTAGE_OF_CALORIES = 0.25; // 25%
const FAT_PERCENTAGE_OF_CALORIES = 0.25; // 25%

export default function SetupMealResultsScreen({ navigation }){

    const [calories, setCalories] = React.useState(null);
    const [carbs, setCarbs] = React.useState(null);
    const [protein, setProtein] = React.useState(null);
    const [fat, setFat] = React.useState(null);


    React.useEffect(() => {
        let isGood = true;

        SetAndGetMealResults().then(({calories, carbs, protein, fat}) => { 
            if(isGood) {
                setCalories(calories);
                setCarbs(carbs);
                setProtein(protein);
                setFat(fat);
            }
        });

        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, []);

    const openPrevScreen = () => navigation.goBack();

    const openNextScreen = () => {
        navigation.setOptions({ tabBarVisible: true });
        navigation.navigate('TabNavigation');
    }

    return(
        <SafeAreaView style={container}>
            <View style={back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={[content, {width: '100%'}]}>
                <Text style={styles.question}>Your daily nutritional recommendations</Text>

                <View style={styles.results}>
                    <View style={[styles.row, {marginTop: 16}]}>
                        <Text style={styles.labels}>Calories</Text>
                        
                        <Text style={styles.labels}>{calories} cal</Text>
                    </View>

                    <Progress
                        style={styles.progress} 
                        progress={CALORIES_PERCENTAGE} />
                    
                    <View style={styles.row}>
                        <Text style={styles.labels}>Carbs</Text>
                        
                        <Text style={styles.labels}>{carbs} g</Text>
                    </View>

                    <Progress 
                        style={styles.progress} 
                        progress={CARBS_PERCENTAGE_OF_CALORIES} />
                    
                    <View style={styles.row}>
                        <Text style={styles.labels}>Protein</Text>
                        
                        <Text style={styles.labels}>{protein} g</Text>
                    </View>

                    <Progress 
                        style={styles.progress} 
                        progress={PROTEIN_PERCENTAGE_OF_CALORIES} />
                    
                    <View style={styles.row}>
                        <Text style={styles.labels}>Fat</Text>
                        
                        <Text style={styles.labels}>{fat} g</Text>
                    </View>

                    <Progress 
                        style={[styles.progress, {marginBottom: 20}]} 
                        progress={FAT_PERCENTAGE_OF_CALORIES} />
                </View>
            </View>
        
            <View style={continue_button_container}>
                <ContinueButton pressHandler={openNextScreen}/>
            </View>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({

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

    results: {
        marginTop: 32,
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