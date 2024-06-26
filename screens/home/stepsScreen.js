import React from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';

import { Accelerometer } from 'expo-sensors';

import { GetStepsScreenData } from '../../database/screen/home/steps_services';

import { stylesMisc } from '../../styles/miscStyles';

import BackButton from '../../components/misc/backButton';
import { StepsLogItemList } from '../../components/home/logItemList';



export default function StepsScreen({ navigation }){
    const [stepsLog, setStepsLog] = React.useState(null);
    const [steps, setSteps] = React.useState(0);
    
    const [totalData, setTotalData] = React.useState({
        prevX: 0,
        prevY: 0,
        prevZ: 0,
        newX: 0,
        newY: 0,
        newZ: 0
    });

    const listeningSpeed = 2000;
    const bonus = 0;
    
    console.log('steps', steps);


    React.useEffect(() => {
        let isGood = true;
        GetStepsScreenData().then((stepsLog) => { 
            if(isGood) {
                setStepsLog(stepsLog);
                setSteps(stepsLog[0].steps);
            }
        });

        Accelerometer.setUpdateInterval(listeningSpeed);
        Accelerometer.addListener((newData) => {
            setTotalData((oldData) => ({
                prevX: oldData.newX,
                prevY: oldData.newY,
                prevZ: oldData.newZ,
                newX: newData.x,
                newY: newData.y,
                newZ: newData.z
            }));
        });

        return () => { 
            isGood = false; 
            Accelerometer.removeAllListeners();
        } // to prevent memory leaks (clean up)
    }, []);

    React.useEffect(() => {
        const oldMagnitude = Math.sqrt(
            Math.pow(totalData.prevX, 2) +
            Math.pow(totalData.prevY, 2) +
            Math.pow(totalData.prevZ, 2),
        );
        console.log('oldMagnitude', oldMagnitude);

        const newMagnitude = Math.sqrt(
            Math.pow(totalData.newX, 2) +
            Math.pow(totalData.newY, 2) +
            Math.pow(totalData.newZ, 2),
        );
        console.log('newMagnitude', newMagnitude);

        if(newMagnitude > oldMagnitude - 0.02 && newMagnitude < oldMagnitude + 0.02) {
            console.log('not passed');
            return;
        }
        console.log('passed filter');

        if(newMagnitude >= 3 && newMagnitude < 3.5) {
            setSteps((oldSteps) => (oldSteps + 5 + bonus));
            // console.log('steps add 5', steps);
            return;
        }

        if(newMagnitude >= 2.4 && newMagnitude < 3) {
            setSteps((oldSteps) => (oldSteps + 4 + bonus));
            // console.log('steps add 4', steps);
            return;
        }

        if(newMagnitude >= 1.8 && newMagnitude < 2.4) {
            setSteps((oldSteps) => (oldSteps + 3 + bonus));
            // console.log('steps add 3', steps);
            return;
        }

        if(newMagnitude >= 1.2 && newMagnitude < 1.8) {
            setSteps((oldSteps) => (oldSteps + 2 + bonus));
            // console.log('steps add 2', steps);
            return;
        }

        if(newMagnitude >= 0.6 && newMagnitude < 1.2) {
            setSteps((oldSteps) => (oldSteps + 1 + bonus));
            // console.log('steps add 1', steps);
            return;
        }

        // console.log('none steps added', steps);
        return;
    }, [totalData]);


    const openPrevScreen = () => navigation.goBack();
    

    return(
        <SafeAreaView style={stylesMisc.container}>
            <ScrollView style={stylesMisc.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={stylesMisc.back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={stylesMisc.content_start}>
                    <View>
                        <Text>Total steps</Text>
                        <Text>{steps}</Text>
                    </View>
                    
                    <Text style={stylesMisc.subtitle}>Steps History</Text>
                    
                    {stepsLog ? <>{StepsLogItemList(stepsLog)}</> : null }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
