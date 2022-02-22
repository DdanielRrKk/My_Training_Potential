import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar } from 'react-native';

import { GetUserDataName } from '../../database/services/user_services/user_data_services';

import OptionsButton from '../../components/home/optionsButton';
import SetupBox from '../../components/home/setupBox';
import LogBox from '../../components/home/logBox';
import GroupLogBox from '../../components/home/groupLogBox';


export default function MainHomeScreen({ navigation }){
    const [name, setName] = React.useState(null);
    
    React.useEffect(() => {
        GetUserDataName(setName);
        console.log('name', name);
    }, [name]);
    console.log('name out', name);

    const openOptionsScreen = () => console.log('options');
    const openSetupNutritionScreen = () => console.log('setup nutrition');
    const openSetupWorkoutScreen = () => console.log('setup workout');
    const openStepsLogScreen = () => console.log('setup steps log');
    const openWeightLogScreen = () => console.log('setup weight log');
    const openWorkoutLogScreen = () => console.log('setup workout log');
    const openMealLogScreen = () => console.log('setup meal log');
 
    return(
        <SafeAreaView style={[styles.container, {marginTop: StatusBar.currentHeight}]}>
            <ScrollView style={{flex: 1, width: '100%', padding: 16}}>
                <View style={styles.top_button_container}>
                    <Text style={styles.title}>Welcome {name}</Text>

                    <OptionsButton 
                        style={styles.options}
                        pressHandler={openOptionsScreen}/>
                </View>

                <View style={styles.content}>
                    <Text style={styles.subtitle}>Nutrition</Text>
                    
                    <SetupBox pressHandler={openSetupNutritionScreen}/>

                    <Text style={styles.subtitle}>Workout</Text>
                    
                    <SetupBox pressHandler={openSetupWorkoutScreen}/>

                    <Text style={styles.subtitle}>Steps Counter</Text>

                    <LogBox 
                        value={20}
                        title='steps today'
                        pressHandler={openStepsLogScreen}/>
                    
                    <Text style={styles.subtitle}>Weight Log</Text>
                    
                    <LogBox 
                        value={70}
                        title='current weight'
                        pressHandler={openWeightLogScreen}/>
                    
                    <Text style={styles.subtitle}>History</Text>

                    <View style={styles.middle_button_container}>
                        <GroupLogBox 
                            title='Workouts'
                            value={0}
                            subtitle='max squads'
                            pressHandler={openWorkoutLogScreen}/>

                        <GroupLogBox 
                            title='Meals'
                            value={0}
                            subtitle='yesterday'
                            pressHandler={openMealLogScreen}/>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    top_button_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    subtitle: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
        fontSize: 18,
        paddingVertical: 16
    },

    title: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24
    },

    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    middle_button_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});