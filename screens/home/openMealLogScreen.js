import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { container, back_button_container, subtitle, content_start } from '../../styles/miscStyles';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../styles/colors';

import BackButton from '../../components/misc/backButton';
import Header from '../../components/misc/header';
import NutritionsBox from '../../components/home/nutritionsBox';

import { GetPercentageOfSmallValueInBigValue } from '../../helpers/helpers';



export default function OpenMealLogScreen({ navigation, route }){
    const [date, setDate] = React.useState(null);

    const [water, setWater] = React.useState(0);
    
    const [caloriesTotal, setCaloriesTotal] = React.useState(0);
    const [carbsTotal, setCarbsTotal] = React.useState(0);
    const [proteinTotal, setTotalcentage] = React.useState(0);
    const [fatTotal, setFatTotal] = React.useState(0);
    
    const [caloriesGoal, setCaloriesGoal] = React.useState(0);
    const [carbsGoal, setCarbsGoal] = React.useState(0);
    const [proteinGoal, setProteinGoal] = React.useState(0);
    const [fatGoal, setFatGoal] = React.useState(0);
    
    const [caloriesPercentage, setCaloriesPercentage] = React.useState(0);
    const [carbsPercentage, setCarbsPercentage] = React.useState(0);
    const [proteinPercentage, setProteinPercentage] = React.useState(0);
    const [fatPercentage, setFatPercentage] = React.useState(0);

    React.useEffect(() => {
        console.log('route.params?.item', route.params?.item);
        if(route.params?.item) {
            setDate(route.params?.item.date);
            setWater(route.params?.item.water);

            const caloriesTotalInt = parseInt(route.params?.item.totalCalories);
            const crbsTotalInt = parseInt(route.params?.item.totalCarbs);
            const proteinTotalInt = parseInt(route.params?.item.totalProtein);
            const fatTotalInt = parseInt(route.params?.item.totalFat);
            
            const caloriesGoalInt = parseInt(route.params?.item.caloriesGoal);
            const carbsGoalInt = parseInt(route.params?.item.carbsGoal);
            const proteinGoalInt = parseInt(route.params?.item.proteinGoal);
            const fatGoalInt = parseInt(route.params?.item.fatGoal);

            setCaloriesTotal(caloriesTotalInt);
            setCarbsTotal(crbsTotalInt);
            setTotalcentage(proteinTotalInt);
            setFatTotal(fatTotalInt);

            setCaloriesGoal(caloriesGoalInt);
            setCarbsGoal(carbsGoalInt);
            setProteinGoal(proteinGoalInt);
            setFatGoal(fatGoalInt);

            setCaloriesPercentage(GetPercentageOfSmallValueInBigValue(caloriesTotalInt, caloriesGoalInt));
            setCarbsPercentage(GetPercentageOfSmallValueInBigValue(crbsTotalInt, carbsGoalInt));
            setProteinPercentage(GetPercentageOfSmallValueInBigValue(proteinTotalInt, proteinGoalInt));
            setFatPercentage(GetPercentageOfSmallValueInBigValue(fatTotalInt, fatGoalInt));
            
        }
    }, [ route.params?.item ]);


    const openPrevScreen = () => navigation.goBack();

    return(
        <SafeAreaView style={container}>
            <View style={back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={content_start}>
                <Header title={date} />
                
                <Text style={subtitle}>Water</Text>
                
                <View style={styles.header}>
                    <Text style={styles.bigText}>{water} ml</Text>
                </View>

                <Text style={subtitle}>Nutritions</Text>

                <NutritionsBox 
                    isDetailed={true}
                    caloriesGoal={caloriesGoal}
                    caloriesTotal={caloriesTotal}
                    caloriesPercentage={caloriesPercentage}
                    carbsGoal={carbsGoal}
                    carbsTotal={carbsTotal}
                    carbsPercentage={carbsPercentage}
                    proteinGoal={proteinGoal}
                    proteinTotal={proteinTotal}
                    proteinPercentage={proteinPercentage}
                    fatGoal={fatGoal}
                    fatTotal={fatTotal}
                    fatPercentage={fatPercentage}/>
            </View>
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
        borderRadius: 10,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

    bigText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },
});
