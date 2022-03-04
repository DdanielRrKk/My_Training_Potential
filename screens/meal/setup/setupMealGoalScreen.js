import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { SetMealGoal, GetMealGoal, GetActivityLevel } from '../../../database/screen/meal_services';

import { continue_button_container } from '../../../styles/setupStyles';
import { container, content, back_button_container } from '../../../styles/miscStyles';

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
        <SafeAreaView style={container}>
            <View style={back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={[content, {width: '100%'}]}>
                <Text style={styles.question}>What is your goal?</Text>

                <SelectionButton 
                    style={styles.buttons}
                    is_selected={(goal == 1)? true : false}
                    title='Lose Weight'
                    pressHandler={() => setGoal(1)}/>

                <SelectionButton 
                    style={styles.buttons}
                    is_selected={(goal == 2)? true : false}
                    title='Maintain Weight'
                    pressHandler={() => setGoal(2)}/>

                <SelectionButton 
                    style={styles.buttons}
                    is_selected={(goal == 3)? true : false}
                    title='Build Muscle'
                    pressHandler={() => setGoal(3)}/>
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

    buttons: {
        marginTop: 24
    }
});