import React from 'react';
import { Text, View, SafeAreaView, DeviceEventEmitter } from 'react-native';

import { SetAndGetMealResults } from '../../../database/screen/meal/meal_setup_services';

import { stylesMisc } from '../../../styles/miscStyles';

import BackButton from '../../../components/misc/backButton';
import ContinueButton from '../../../components/misc/setup/continueButton';
import NutritionsBox from '../../../components/home/nutritionsBox';

import { CALORIES_PERCENTAGE, CARBS_PERCENTAGE_OF_CALORIES, PROTEIN_PERCENTAGE_OF_CALORIES, FAT_PERCENTAGE_OF_CALORIES } from '../../../helpers/constants';



export default function SetupMealResultsScreen({ navigation }){
    const [calories, setCalories] = React.useState(0);
    const [carbs, setCarbs] = React.useState(0);
    const [protein, setProtein] = React.useState(0);
    const [fat, setFat] = React.useState(0);


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

        return () => {  
            isGood = false;
            DeviceEventEmitter.removeListener('event.mealReady');
         } // to prevent memory leaks (clean up)
    }, []);

    const openPrevScreen = () => navigation.goBack();

    const openNextScreen = () => {
        DeviceEventEmitter.emit("event.mealReady", {flag: true});
        navigation.setOptions({ tabBarVisible: true });
        navigation.navigate('TabNavigation');
    }

    return(
        <SafeAreaView style={stylesMisc.container}>
            <View style={stylesMisc.back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={stylesMisc.content}>
                <Text style={stylesMisc.question}>Your daily nutritional recommendations</Text>

                <NutritionsBox 
                    caloriesGoal={calories}
                    caloriesPercentage={CALORIES_PERCENTAGE}
                    carbsGoal={carbs}
                    carbsPercentage={CARBS_PERCENTAGE_OF_CALORIES}
                    proteinGoal={protein}
                    proteinPercentage={PROTEIN_PERCENTAGE_OF_CALORIES}
                    fatGoal={fat}
                    fatPercentage={FAT_PERCENTAGE_OF_CALORIES}/>
            </View>
        
            <ContinueButton pressHandler={openNextScreen}/>
        </SafeAreaView>
    );
};
