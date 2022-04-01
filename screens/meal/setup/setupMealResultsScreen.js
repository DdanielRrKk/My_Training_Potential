import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';

import { SetAndGetMealResults } from '../../../database/screen/meal/meal_setup_services';

import { continue_button_container } from '../../../styles/setupStyles';
import { container, content, back_button_container, question } from '../../../styles/miscStyles';

import BackButton from '../../../components/misc/backButton';
import ContinueButton from '../../../components/misc/setup/continueButton';
import NutritionsBox from '../../../components/home/nutritionsBox';

import { useSystemFlagsGlobal } from '../../../helpers/globalState';
import { CALORIES_PERCENTAGE, CARBS_PERCENTAGE_OF_CALORIES, PROTEIN_PERCENTAGE_OF_CALORIES, FAT_PERCENTAGE_OF_CALORIES } from '../../../helpers/constants';



export default function SetupMealResultsScreen({ navigation }){
    const [systemFlags, setSystemFlags] = useSystemFlagsGlobal();

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

        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, []);

    const openPrevScreen = () => navigation.goBack();

    const openNextScreen = () => {
        setSystemFlags({...systemFlags, isMealReady: true});
        navigation.setOptions({ tabBarVisible: true });
        navigation.navigate('TabNavigation');
    }

    return(
        <SafeAreaView style={container}>
            <View style={back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={content}>
                <Text style={question}>Your daily nutritional recommendations</Text>

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
        
            <View style={continue_button_container}>
                <ContinueButton pressHandler={openNextScreen}/>
            </View>
        </SafeAreaView>
    );
};
