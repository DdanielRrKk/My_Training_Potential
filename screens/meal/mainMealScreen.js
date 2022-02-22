import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

import { GetUserPreferenceCurrentMealLogKey } from '../../database/services/user_services/user_preferences_services';

import { container } from '../../styles/miscStyles';

import MealBox from '../../components/meal/mealBox';



export default function MainMealScreen({ navigation }){
    const [isMealSettedUp, setIsMealSettedUp] = React.useState(true);

    React.useEffect(() => {
        // GetUserPreferenceCurrentMealLogKey(setIsMealSettedUp);
    }, []);

    if(!isMealSettedUp || isMealSettedUp == null) {
        return(
            <SafeAreaView style={container}>
                <TouchableOpacity 
                    style={styles.setUp}
                    onPress={() => console.log('press')}>
                    <Text>Set Up Plan</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return(
        <SafeAreaView style={container}>
            <View style={styles.header}>
                <View style={styles.infoBox}>
                    <Text style={styles.primaryText}>0 / 3000</Text>
                    <Text style={styles.subText}>calories</Text>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoBox}>
                        <Text style={styles.secondaryText}>0 / 350 g</Text>
                        <Text style={styles.subText}>carbs</Text>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.secondaryText}>0 / 150 g</Text>
                        <Text style={styles.subText}>protein</Text>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.secondaryText}>0 / 100 g</Text>
                        <Text style={styles.subText}>fat</Text>
                    </View>
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.subtitle}>Water</Text>
                
                <Text style={styles.subtitle}>Meals</Text>

                <MealBox 
                    title='Breackfast'
                    pressHandler={() => console.log('pressed')}/>
                    
                <MealBox 
                    style={{marginTop: 16}}
                    title='Lunch'
                    pressHandler={() => console.log('pressed')}/>
                    
                <MealBox 
                    style={{marginTop: 16}}
                    title='Dinner'
                    pressHandler={() => console.log('pressed')}/>
            </View>
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
        padding: 20,
        borderRadius: 20
    },

    infoBox: {
        alignItems: 'center',
    },

    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
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
});