import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';

import { SetActivityLevel, GetActivityLevel } from '../../../database/screen/meal/meal_setup_services';

import { continue_button_container } from '../../../styles/setupStyles';
import { container, content, back_button_container, question } from '../../../styles/miscStyles';

import SelectionButton from '../../../components/misc/setup/selectionButton';
import BackButton from '../../../components/misc/backButton';
import ContinueButton from '../../../components/misc/setup/continueButton';



export default function SetupMealActivityScreen({ navigation }){
    const [activityLevel, setActivityLevel] = React.useState(null);

    React.useEffect(() => {
        let isGood = true;
        GetActivityLevel().then((value) => { if(isGood) setActivityLevel(value); });
        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, []);

    const openPrevScreen = () => navigation.goBack();

    const openNextScreen = () => {
        SetActivityLevel(activityLevel);
        navigation.push('SetupMealResultsScreen');
    }

    return(
        <SafeAreaView style={container}>
            <View style={back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={content}>
                <Text style={question}>What is your activity level?</Text>

                <SelectionButton 
                    is_selected={(activityLevel == 1)? true : false}
                    title='Little to no Exercise'
                    pressHandler={() => setActivityLevel(1)}/>

                <SelectionButton 
                    style={{marginTop: 24}}
                    is_selected={(activityLevel == 2)? true : false}
                    title='Exercise 1 - 3 Days per Week'
                    pressHandler={() => setActivityLevel(2)}/>

                <SelectionButton 
                    style={{marginTop: 24}}
                    is_selected={(activityLevel == 3)? true : false}
                    title='Exercise 3 - 5 Days per Week'
                    pressHandler={() => setActivityLevel(3)}/>
                    
                <SelectionButton 
                    style={{marginTop: 24}}
                    is_selected={(activityLevel == 4)? true : false}
                    title='Exercise 6 - 7 Days per Week'
                    pressHandler={() => setActivityLevel(4)}/>
                    
                <SelectionButton 
                    style={{marginTop: 24}}
                    is_selected={(activityLevel == 5)? true : false}
                    title='Hard Exercise 6 - 7 Days per Week'
                    pressHandler={() => setActivityLevel(5)}/>
            </View>
        
            <View style={continue_button_container}>
                <ContinueButton pressHandler={openNextScreen}/>
            </View>
        </SafeAreaView>
    );
};
