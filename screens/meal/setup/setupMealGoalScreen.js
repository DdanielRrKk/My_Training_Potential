import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';

import { SetMealGoal, GetMealGoal, GetActivityLevel } from '../../../database/screen/meal/meal_setup_services';

import { stylesMisc } from '../../../styles/miscStyles';
import { stylesMealSetup } from '../../../styles/mealStyles';

import SelectionButton from '../../../components/misc/setup/selectionButton';
import BackButton from '../../../components/misc/backButton';
import ContinueButton from '../../../components/misc/setup/continueButton';



export default function SetupMealGoalScreen({ navigation }){
    const [goal, setGoal] = React.useState(null);
    const [activity, setActivity] = React.useState(null);

    React.useEffect(() => {
        let isGood = true;
        GetMealGoal().then((value) => { if(isGood) setGoal(value); });
        GetActivityLevel().then((value) => { if(isGood) setActivity(value); });
        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, []);

    const openPrevScreen = () => navigation.goBack();

    const openNextScreen = () => {
        SetMealGoal(goal);
        if(activity == null) {
            navigation.push('SetupMealActivityScreen');
            return;
        }
        navigation.push('SetupMealResultsScreen');
        return;
    }

    return(
        <SafeAreaView style={stylesMisc.container}>
            <View style={stylesMisc.back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={stylesMisc.content}>
                <Text style={stylesMisc.question}>What is your goal?</Text>

                <SelectionButton 
                    is_selected={(goal == 1)? true : false}
                    title='Lose Weight'
                    pressHandler={() => setGoal(1)}/>

                <SelectionButton 
                    style={stylesMealSetup.box_margin}
                    is_selected={(goal == 2)? true : false}
                    title='Maintain Weight'
                    pressHandler={() => setGoal(2)}/>

                <SelectionButton 
                    style={stylesMealSetup.box_margin}
                    is_selected={(goal == 3)? true : false}
                    title='Build Muscle'
                    pressHandler={() => setGoal(3)}/>
            </View>
            
            <ContinueButton pressHandler={openNextScreen}/>
        </SafeAreaView>
    );
};
