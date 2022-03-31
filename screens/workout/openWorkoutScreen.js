import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

import { GetOpenWorkoutScreenData } from '../../database/screen/workout/open_workout_services';

import { container, back_button_container, shadow, subtitle } from '../../styles/miscStyles';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../styles/colors';

import BackButton from '../../components/misc/backButton';
import ActionButton from '../../components/misc/actionButton';



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
        <SafeAreaView style={container}>
            <View style={back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={styles.content}>
                <View style={[styles.header, shadow]}>
                    <Text style={styles.headerText}>{name}</Text>
                </View>

                <Text style={subtitle}>Exercises</Text>

                <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        {exercises.map((item) => (
                            <View key={item.key} style={[styles.box, shadow]}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{marginLeft: 8}}>
                                        <Text style={styles.boxText}>{item.name}</Text>
                                        
                                        <Text style={styles.boxText}>{item.description}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
            
            {(isToday) ?
            <ActionButton title='Start' pressHandler={openStartWorkoutScreen}/>
            : null }
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    header: {
        backgroundColor: PRIMARY_COLOR,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginTop: 16,
        borderRadius: 10,
        height: 80
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },

    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    box: {
        flexDirection: 'row',
        width: '100%',
        padding: 16,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: SECONDARY_COLOR,
        marginBottom: 16
    },
    boxText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    },
});