import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';

import { container, back_button_container } from '../../styles/miscStyles';

import BackButton from '../../components/misc/backButton';



export default function SingleMealScreen({ navigation, route }){
    const [mealNumber, setMealNumber] = React.useState(null);
    const [name, setName] = React.useState(null);
    
    const [recommendedMin, setRecommendedMin] = React.useState('0');
    const [recommendedMax, setRecommendedMax] = React.useState('0');
    const [calories, setCalories] = React.useState('0');
    const [carbs, setCarbs] = React.useState('0');
    const [protein, setProtein] = React.useState('0');
    const [fat, setFat] = React.useState('0');
    const [foods, setFoods] = React.useState([]);

    React.useEffect(() => {
        if(route.params?.meal_number) setMealNumber(route.params.meal_number);
        if(route.params?.meal_number == 1) setName('Breakfast');
        if(route.params?.meal_number == 2) setName('Lunch');
        if(route.params?.meal_number == 3) setName('Dinner');
    }, [route.params?.meal_number, name]);

    const openPrevScreen = () => navigation.goBack();

    return(
        <SafeAreaView style={[container, {width: '100%'}]}>
            <View style={back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>{name}</Text>

                <Text style={styles.subtitle}>Total</Text>

                <View style={styles.results}>
                    <Text style={[styles.title, {marginTop: 16}]}>{calories} cal</Text>

                    <View style={[styles.row, {marginTop: 16}]}>
                        <Text style={styles.labels}>Recommended</Text>
                        
                        <Text style={styles.labels}>{recommendedMin} - {recommendedMax} cal</Text>
                    </View>
                    
                    <View style={styles.row}>
                        <Text style={styles.labels}>Calories</Text>
                        
                        <Text style={styles.labels}>{calories} cal</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.labels}>Carbs</Text>
                        
                        <Text style={styles.labels}>{carbs} g</Text>
                    </View>
                    
                    <View style={styles.row}>
                        <Text style={styles.labels}>Protein</Text>
                        
                        <Text style={styles.labels}>{protein} g</Text>
                    </View>

                    <View style={[styles.row, {marginBottom: 16}]}>
                        <Text style={styles.labels}>Fat</Text>
                        
                        <Text style={styles.labels}>{fat} g</Text>
                    </View>
                </View>

                <Text style={styles.subtitle}>Meals</Text>
            </View>
        
            <TouchableOpacity
                style={styles.add}
                onPress={() => console.log('press')}>
                <Text>Add</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({

    content: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
    },

    title: {
        fontSize: 24,
        textAlign: 'center'
    },
    
    subtitle: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
        fontSize: 18,
        paddingVertical: 16
    },

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

    entry:{
        width: '100%',
        marginVertical: 32,
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        justifyContent: 'center',
    },

    results: {
        width: '100%',
        backgroundColor: 'gray',
        borderRadius: 10
    },

    labels: {
        fontSize: 18
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 24
    },

    add: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 8,
        alignItems: 'center',
    },
});