import React from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';

import { stylesMisc } from '../../styles/miscStyles';
import { stylesLearn } from '../../styles/learnStyles';

import Header from '../../components/misc/header';
import LearnItemList from '../../components/learn/learnItemList';

import { FAQ_LIST } from '../../helpers/constants';



export default function MainLearnScreen(){
    const [openKey, setOpenKey] = React.useState(0);

    const openQuestionHandler = (key) => {
        if(key !== openKey) {
            setOpenKey(key);
            return;
        }
        setOpenKey(0);
        return;
    }
    
    return(
        <SafeAreaView style={stylesLearn.container}>
            <ScrollView style={stylesMisc.scrollContent} showsVerticalScrollIndicator={false}>
                <Header title='Learning'/>

                <Text style={stylesMisc.subtitle}>FAQ</Text>

                <View style={stylesMisc.view}>
                    <>{LearnItemList(FAQ_LIST, openQuestionHandler, openKey)}</>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
