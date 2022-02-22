import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { 
    SetUserMealsActivityLevel ,
    GetUserMealsActivityLevel
} from '../../../database/services/user_services/user_meals_services';

import { continue_button_container } from '../../../styles/setupStyles';
import { container, content, back_button_container } from '../../../styles/miscStyles';

import SelectionButton from '../../../components/misc/setup/selectionButton';
import BackButton from '../../../components/misc/backButton';
import ContinueButton from '../../../components/misc/setup/continueButton';



export default function SetupMealActivityScreen({ navigation }){
    const [activityLevel, setActivityLevel] = React.useState(null);

    React.useEffect(() => {
        GetUserMealsActivityLevel(setActivityLevel);
    }, []);

    const openPrevScreen = () => navigation.goBack();

    const openNextScreen = () => {
        SetUserMealsActivityLevel(activityLevel);
        navigation.push('SetupMealResultsScreen');
    }

    return(
        <SafeAreaView style={container}>
            <View style={back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={[content, {width: '100%'}]}>
                <Text style={styles.question}>What is youractivity level?</Text>

                <SelectionButton 
                    style={styles.buttons}
                    is_selected={(activityLevel == 1)? true : false}
                    title='Little to no Exercise'
                    pressHandler={() => setActivityLevel(1)}/>

                <SelectionButton 
                    style={styles.buttons}
                    is_selected={(activityLevel == 2)? true : false}
                    title='Exercise 1 - 3 Days per Week'
                    pressHandler={() => setActivityLevel(2)}/>

                <SelectionButton 
                    style={styles.buttons}
                    is_selected={(activityLevel == 3)? true : false}
                    title='Exercise 3 - 5 Days per Week'
                    pressHandler={() => setActivityLevel(3)}/>
                    
                <SelectionButton 
                    style={styles.buttons}
                    is_selected={(activityLevel == 4)? true : false}
                    title='Exercise 6 - 7 Days per Week'
                    pressHandler={() => setActivityLevel(4)}/>
                    
                <SelectionButton 
                    style={styles.buttons}
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