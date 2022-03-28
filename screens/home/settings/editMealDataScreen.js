import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView } from 'react-native';

import { container, back_button_container } from '../../../styles/miscStyles';

import { GetEditMealDataScreenData, SetEditMealData } from '../../../database/screen/home/settings_services';

import BackButton from '../../../components/misc/backButton';



const NUTRITIONS_MAX_LENGTH = 5;

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
                <Text style={styles.subtitle}>Calories Goal</Text>

                <TextInput
                    style={styles.entry}
                    onChangeText={setCaloriesGoal}
                    value={caloriesGoal}
                    maxLength={NUTRITIONS_MAX_LENGTH}/>

                <Text style={styles.subtitle}>Carbs Goal</Text>

                <TextInput
                    style={styles.entry}
                    onChangeText={setCarbsGoal}
                    value={carbsGoal}
                    maxLength={NUTRITIONS_MAX_LENGTH}/>

                <Text style={styles.subtitle}>Protein Goal</Text>

                <TextInput
                    style={styles.entry}
                    onChangeText={setProteinGoal}
                    value={proteinGoal}
                    maxLength={NUTRITIONS_MAX_LENGTH}/>

                <Text style={styles.subtitle}>Fat Goal</Text>

                <TextInput
                    style={styles.entry}
                    onChangeText={setFatGoal}
                    value={fatGoal}
                    maxLength={NUTRITIONS_MAX_LENGTH}/>
            </View>

            <TouchableOpacity
                style={styles.add}
                onPress={saveEditData}>
                <Text>Save</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    subtitle: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
        fontSize: 18,
        paddingVertical: 16
    },

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

    add: {
        marginTop: 16,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 8,
        alignItems: 'center',
        width: '100%'
    },
});