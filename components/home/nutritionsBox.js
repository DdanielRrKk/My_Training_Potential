import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ProgressBar from 'react-native-progress/Bar';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../styles/colors';



export default function NutritionsBox({ 
    isDetailed = false,
    caloriesGoal,
    caloriesPercentage,
    carbsGoal,
    carbsPercentage,
    proteinGoal,
    proteinPercentage,
    fatGoal,
    fatPercentage,
    caloriesTotal = null,
    carbsTotal = null,
    proteinTotal = null,
    fatTotal = null,
}){    
    if(isDetailed) {
        return(
            <View style={styles.results}>
                <View style={[styles.row, {marginTop: 0}]}>
                    <Text style={styles.labels}>Calories</Text>
                    
                    <Text style={styles.labels}>{caloriesTotal} / {caloriesGoal} cal</Text>
                </View>
    
                <ProgressBar 
                    progress={caloriesPercentage}
                    width={null}
                    color={TERTIARY_COLOR}
                    borderColor={TERTIARY_COLOR}
                    borderRadius={0}/>
                
                <View style={styles.row}>
                    <Text style={styles.labels}>Carbs</Text>
                    
                    <Text style={styles.labels}>{carbsTotal} / {carbsGoal} g</Text>
                </View>
    
                <ProgressBar 
                    progress={carbsPercentage}
                    width={null}
                    color={TERTIARY_COLOR}
                    borderColor={TERTIARY_COLOR}
                    borderRadius={0}/>
                
                <View style={styles.row}>
                    <Text style={styles.labels}>Protein</Text>
                    
                    <Text style={styles.labels}>{proteinTotal} / {proteinGoal} g</Text>
                </View>
    
                <ProgressBar 
                    progress={proteinPercentage}
                    width={null}
                    color={TERTIARY_COLOR}
                    borderColor={TERTIARY_COLOR}
                    borderRadius={0}/>
                
                <View style={styles.row}>
                    <Text style={styles.labels}>Fat</Text>
                    
                    <Text style={styles.labels}>{fatTotal} / {fatGoal} g</Text>
                </View>
    
                <ProgressBar 
                    progress={fatPercentage}
                    width={null}
                    color={TERTIARY_COLOR}
                    borderColor={TERTIARY_COLOR}
                    borderRadius={0}/>
            </View>
        );
    }

    return(
        <View style={styles.results}>
            <View style={[styles.row, {marginTop: 0}]}>
                <Text style={styles.labels}>Calories</Text>
                
                <Text style={styles.labels}>{caloriesGoal} cal</Text>
            </View>

            <ProgressBar 
                progress={caloriesPercentage}
                width={null}
                color={TERTIARY_COLOR}
                borderColor={TERTIARY_COLOR}
                borderRadius={0}/>
            
            <View style={styles.row}>
                <Text style={styles.labels}>Carbs</Text>
                
                <Text style={styles.labels}>{carbsGoal} g</Text>
            </View>

            <ProgressBar 
                progress={carbsPercentage}
                width={null}
                color={TERTIARY_COLOR}
                borderColor={TERTIARY_COLOR}
                borderRadius={0}/>
            
            <View style={styles.row}>
                <Text style={styles.labels}>Protein</Text>
                
                <Text style={styles.labels}>{proteinGoal} g</Text>
            </View>

            <ProgressBar 
                progress={proteinPercentage}
                width={null}
                color={TERTIARY_COLOR}
                borderColor={TERTIARY_COLOR}
                borderRadius={0}/>
            
            <View style={styles.row}>
                <Text style={styles.labels}>Fat</Text>
                
                <Text style={styles.labels}>{fatGoal} g</Text>
            </View>

            <ProgressBar 
                progress={fatPercentage}
                width={null}
                color={TERTIARY_COLOR}
                borderColor={TERTIARY_COLOR}
                borderRadius={0}/>
        </View>
    );
};

const styles = StyleSheet.create({
    results: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: PRIMARY_COLOR,
        padding: 16,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

    labels: {
        fontSize: 16,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },

    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 16
    },

    progress: {
        margin: 16
    }
});
