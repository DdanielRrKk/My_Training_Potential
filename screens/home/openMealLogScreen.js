import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';

import { stylesMisc } from '../../styles/miscStyles';
import { stylesOpenLog } from '../../styles/homeStyles';

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

            const percentageCalories = GetPercentageOfSmallValueInBigValue(caloriesTotalInt, caloriesGoalInt);
            const percentageCarbs = GetPercentageOfSmallValueInBigValue(crbsTotalInt, carbsGoalInt);
            const percentageProtein = GetPercentageOfSmallValueInBigValue(proteinTotalInt, proteinGoalInt);
            const percentageFat = GetPercentageOfSmallValueInBigValue(fatTotalInt, fatGoalInt);

            setCaloriesPercentage(parseFloat(percentageCalories));
            setCarbsPercentage(parseFloat(percentageCarbs));
            setProteinPercentage(parseFloat(percentageProtein));
            setFatPercentage(parseFloat(percentageFat));
            
        }
    }, [ route.params?.item ]);


    const openPrevScreen = () => navigation.goBack();

    return(
        <SafeAreaView style={stylesMisc.container}>
            <View style={stylesMisc.back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={stylesMisc.content_start}>
                <Header title={date} />
                
                <Text style={stylesMisc.subtitle}>Water</Text>
                
                <View style={stylesOpenLog.header}>
                    <Text style={stylesOpenLog.bigText}>{water} ml</Text>
                </View>

                <Text style={stylesMisc.subtitle}>Nutritions</Text>

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
