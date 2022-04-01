import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { GetEditMealDataScreenData, SetEditMealData } from '../../../database/screen/home/settings_services';

import { container, back_button_container, subtitle } from '../../../styles/miscStyles';

import BackButton from '../../../components/misc/backButton';
import ActionButton from '../../../components/misc/actionButton';
import TextEntry from '../../../components/misc/textEntry';

import { NUTRITIONS_MAX_LENGTH } from '../../../helpers/constants';



export default function EditMealDataScreen({ navigation }){
    const [caloriesGoal, setCaloriesGoal] = React.useState('0');
    const [carbsGoal, setCarbsGoal] = React.useState('0');
    const [proteinGoal, setProteinGoal] = React.useState('0');
    const [fatGoal, setFatGoal] = React.useState('0');

    React.useEffect(() => {
        let isGood = true;

        GetEditMealDataScreenData().then(({ caloriesGoal, carbsGoal, proteinGoal, fatGoal }) => { 
            if(isGood) {
                // console.log('caloriesGoal', caloriesGoal);
                // console.log('carbsGoal', carbsGoal);
                // console.log('proteinGoal', proteinGoal);
                // console.log('fatGoal', fatGoal);
                if(caloriesGoal != null && caloriesGoal != 'null') setCaloriesGoal(`${caloriesGoal}`);
                if(carbsGoal != null && carbsGoal != 'null')setCarbsGoal(`${carbsGoal}`);
                if(proteinGoal != null && proteinGoal != 'null')setProteinGoal(`${proteinGoal}`);
                if(fatGoal != null && fatGoal != 'null')setFatGoal(`${fatGoal}`);
            }
        });

        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, []);

    const openPrevScreen = () => navigation.goBack();

    const saveEditData = () => {
        SetEditMealData(caloriesGoal, carbsGoal, proteinGoal, fatGoal);
        navigation.setOptions({ tabBarVisible: true });
        navigation.navigate('TabNavigation');
    }

    return(
        <SafeAreaView style={container}>
            <View style={back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={styles.content}>
                <Text style={subtitle}>Calories Goal</Text>

                <TextEntry
                    // style={styles.entry}
                    onChangeText={setCaloriesGoal}
                    value={caloriesGoal}
                    maxLength={NUTRITIONS_MAX_LENGTH}
                    isNumeric={true}/>

                <Text style={subtitle}>Carbs Goal</Text>

                <TextEntry
                    // style={styles.entry}
                    onChangeText={setCarbsGoal}
                    value={carbsGoal}
                    maxLength={NUTRITIONS_MAX_LENGTH}
                    isNumeric={true}/>

                <Text style={subtitle}>Protein Goal</Text>

                <TextEntry
                    // style={styles.entry}
                    onChangeText={setProteinGoal}
                    value={proteinGoal}
                    maxLength={NUTRITIONS_MAX_LENGTH}
                    isNumeric={true}/>

                <Text style={subtitle}>Fat Goal</Text>

                <TextEntry
                    // style={styles.entry}
                    onChangeText={setFatGoal}
                    value={fatGoal}
                    maxLength={NUTRITIONS_MAX_LENGTH}
                    isNumeric={true}/>
            </View>

            <ActionButton title='Save' pressHandler={saveEditData}/>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    entry:{
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        marginBottom: 16
    },
});