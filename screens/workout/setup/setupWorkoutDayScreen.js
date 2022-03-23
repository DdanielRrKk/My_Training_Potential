import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

import { container, content, back_button_container } from '../../../styles/miscStyles';

import BackButton from '../../../components/misc/backButton';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';



const NAME_MAX_LENGTH = 40;

export default function SetupWorkoutDayScreen({ navigation, route }){
    const [dayNumber, setDayNumber] = React.useState(null);

    const [name, setName] = React.useState(null);
    const [exercises, setExercises] = React.useState([]);

    React.useEffect(() => {
        if(route.params?.day_number) setDayNumber(route.params.day_number);
        if(route.params?.name) setName(route.params.name);
        if(route.params?.exercises) setExercises(route.params.exercises);
    }, [route.params?.day_number, route.params?.name, route.params?.exercises]);

    React.useEffect(() => {
        if(route.params?.exercise) {
            if(route.params?.exercise.key !== null) {
                const tempArray = [...exercises]; // shallow copy of array
                tempArray.find((item, index) => {
                    if (item.key === route.params?.exercise.key) {
                        tempArray[index] = route.params?.exercise;
                        setExercises(tempArray);
                        return true; // stop searching
                    }
                });
                return;
            }

            const tempObject = route.params?.exercise;
            if(exercises.length == 0) {
                tempObject.key = 1;
                setExercises([tempObject]);
                return;
            }
            tempObject.key = exercises[exercises.length - 1].key + 1;
            setExercises([...exercises, tempObject]);
            return;
        }
    }, [route.params?.exercise]);
    
    // console.log('exercises', exercises);
    // console.log('day number', dayNumber);

    const openPrevScreen = () => navigation.goBack();

    const editExercise = (exercise) => navigation.navigate('SetupWorkoutExerciseScreen', { 
        exercise: exercise, 
        isFromEdit: true 
    });

    const addWorkout= () => navigation.navigate('SetupWorkoutExerciseScreen');

    const createDay = () => navigation.navigate('SetupWorkoutPlanScreen', {
        day: {
            day_number: dayNumber,
            name: name,
            exercises: exercises
        }
    });

    return(
        <SafeAreaView style={container}>
            <View style={back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={[content, {width: '100%'}]}>
                <Text style={styles.title}>Workout Name</Text>

                <TextInput
                    style={styles.entry}
                    onChangeText={setName}
                    value={name}
                    maxLength={NAME_MAX_LENGTH}/>

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

                                <TouchableOpacity onPress={() => editExercise(item)}>
                                    <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        ))}

                        <TouchableOpacity onPress={addWorkout}>
                            <EvilIcons name="plus" size={42} color="black" />
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </View>
        
            <TouchableOpacity
                style={styles.add}
                onPress={createDay}>
                <Text>Create</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({

    title: {
        marginTop: 16,
        fontSize: 18
    },

    middle_button_container: {
        width: '100%',
        marginTop: 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    entry:{
        width: '100%',
        marginTop: 16,
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        justifyContent: 'center',
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
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 8,
        alignItems: 'center',
        width: '100%'
    },
});