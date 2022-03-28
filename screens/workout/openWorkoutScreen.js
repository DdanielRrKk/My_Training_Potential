import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

import { GetOpenWorkoutScreenData } from '../../database/screen/workout/open_workout_services';

import { container, back_button_container } from '../../styles/miscStyles';

import BackButton from '../../components/misc/backButton';

import { MaterialCommunityIcons } from '@expo/vector-icons';


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
        navigation.navigate('StartWorkoutScreen', {exercises: exercises});
    }

    return(
        <SafeAreaView style={container}>
            <View style={back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 20 }}>{name}</Text>
                </View>

                <Text style={styles.subtitle}>Exercises</Text>

                <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        {exercises.map((item) => (
                            <View key={item.key} style={styles.box}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <MaterialCommunityIcons name="drag" size={24} color="black" />

                                    <View style={{marginLeft: 8}}>
                                        <Text style={styles.bigText}>{item.name}</Text>
                                        
                                        <Text style={styles.smallText}>{item.description}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
            
            {(isToday) ?
                <TouchableOpacity
                    style={styles.add}
                    onPress={openStartWorkoutScreen}>
                    <Text>Start</Text>
                </TouchableOpacity>
            : null }
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    setUp: {
        backgroundColor: 'gray',
        width: '100%',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center'
    },

    header: {
        backgroundColor: 'gray',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginTop: 16,
        borderRadius: 10,
        height: 80
    },

    primaryText: {
        fontSize: 24
    },

    secondaryText: {
        fontSize: 18
    },

    subText: {
        fontSize: 14
    },

    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    subtitle: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
        fontSize: 18,
        paddingVertical: 16
    },

    box: {
        flexDirection: 'row',
        width: '100%',
        padding: 16,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'gray',
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