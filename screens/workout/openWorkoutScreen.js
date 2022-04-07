import React from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';

import { GetOpenWorkoutScreenData } from '../../database/screen/workout/open_workout_services';

import { stylesMisc } from '../../styles/miscStyles';

import BackButton from '../../components/misc/backButton';
import ActionButton from '../../components/misc/actionButton';
import WorkoutItemList from '../../components/workout/workoutItemList';
import Header from '../../components/misc/header';



export default function OpenWorkoutScreen({ navigation, route }){
    const [name, setName] = React.useState(null);
    const [exercises, setExercises] = React.useState([]);

    const [isToday, setIsToday] = React.useState(false);
    
    React.useEffect(() => {
        if(route.params?.day_number) {
            let isGood = true;
            GetOpenWorkoutScreenData(parseInt(route.params?.day_number)).then(({
                name, 
                exercises,
                isToday
            }) => { 
                if(isGood) {
                    setName(name);
                    setExercises(exercises);
                    setIsToday(isToday);
                }
            });

            return () => {  isGood = false; } // to prevent memory leaks (clean up)
        }
    }, [route.params?.day_number]);

    const openPrevScreen = () => navigation.goBack();

    const openStartWorkoutScreen = () => {
        navigation.setOptions({ tabBarVisible: false });
        navigation.navigate('StartWorkoutScreen', {exercises: exercises, day_name: name});
    }

    return(
        <SafeAreaView style={stylesMisc.container}>
            <View style={stylesMisc.back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={stylesMisc.content_start}>
                <Header title={name}/>

                <Text style={stylesMisc.subtitle}>Exercises</Text>

                <ScrollView style={stylesMisc.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={stylesMisc.view}>
                        {exercises ? <>{WorkoutItemList(exercises, null, true)}</> : null }
                    </View>
                </ScrollView>
            </View>
            
            {(isToday) ?
            <ActionButton title='Start' pressHandler={openStartWorkoutScreen}/>
            : null }
        </SafeAreaView>
    );
};
