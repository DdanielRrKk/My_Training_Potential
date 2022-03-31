import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

import { container, shadow, subtitle } from '../../styles/miscStyles';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../styles/colors';

import { EvilIcons } from '@expo/vector-icons';



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
        <SafeAreaView style={[container, {justifyContent: 'flex-start', paddingVertical: 0}]}>
            <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                <View style={[styles.header, shadow]}>
                    <Text style={styles.headerText}>Learning</Text>
                </View>

                <Text style={subtitle}>FAQ</Text>

                <>
                {FAQ_LIST.map((item) => {
                    if((openKey == item.key)) {
                        return(
                            <TouchableOpacity 
                                key={item.key}
                                style={styles.bigContainer}
                                onPress={() => openQuestionHandler(item.key)}>
                                <View style={styles.containerTop}>
                                    <Text style={styles.question}>{item.question}</Text>
                        
                                    <EvilIcons name="chevron-up" size={40} color={PRIMARY_COLOR} />
                                </View>
                                <View style={[styles.containerBottom, shadow]}>
                                    <Text style={styles.answer}>{item.answer}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }
                
                    return(
                        <TouchableOpacity 
                            key={item.key}
                            style={[styles.container, shadow]}
                            onPress={() => openQuestionHandler(item.key)}>
                            <Text style={styles.question}>{item.question}</Text>
                
                            <EvilIcons name="chevron-down" size={40} color={PRIMARY_COLOR} />
                        </TouchableOpacity>
                    );
                })}
                </>
            </ScrollView>
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



    container: {
        flexDirection: 'row',
        width: '100%',
        padding: 16,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: SECONDARY_COLOR,
        marginBottom: 16
    },

    question: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    },
    answer: {
        fontSize: 16,
        // fontWeight: 'bold',
        color: TERTIARY_COLOR
    },


    bigContainer: {
        width: '100%',
        marginBottom: 16
    },
    containerTop: {
        flexDirection: 'row',
        width: '100%',
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: SECONDARY_COLOR
    },
    containerBottom: {
        width: '100%',
        padding: 10,
        // borderTopColor: PRIMARY_COLOR,
        // borderTopWidth: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOR
    },
});



const FAQ_LIST = [
    {
        key: 1,
        question: "How does muscles work?",
        answer: "Muscles provide the tug on the bones needed to bend, straighten, and support joints. Muscles can pull on bones, but they can't push them back to their original position, so the muscles work in pairs of flexors and extensors. The extensor muscle relaxes and stretches as the flexor muscle contracts to bend the joint."
    },
    {
        key: 2,
        question: "How much calories should I eat?",
        answer: "Generally, the recommended daily calorie intake is 2,000 calories a day for women and 2,500 for men."
    },
    {
        key: 3,
        question: "How often should I workout?",
        answer: "According to the Center for Disease Control and Prevention (CDC), adults should get at least 150 minutes of moderate-intensity aerobic activity, such as cycling or swimming, per week."
    },
    {
        key: 4,
        question: "Should I do cardio everyday?",
        answer: "There is no recommended upper limit on the amount of cardio exercise you should do on a daily or weekly basis. However, if you push yourself hard with every workout, then skipping a day or two each week to rest may help you avoid injury and burnout."
    },
    {
        key: 5,
        question: "What are macros?",
        answer: "“Macro” is short for macronutrient. What's a macronutrient? They're the three categories of nutrients you eat the most and provide you with most of your energy: protein, carbohydrates and fats. So when you're counting your macros, you're counting the grams of proteins, carbs or fat that you're consuming."
    },
    {
        key: 6,
        question: "How hard should I workout?",
        answer: "Your exercise intensity must generally be at a moderate or vigorous level for maximum benefit. For weight loss, the more intense or longer your activity, the more calories you burn. Balance is still important. Overdoing it can increase your risk of soreness, injury and burnout."
    },
    {
        key: 7,
        question: "Can you burn fat with just diet?",
        answer: "You can lose weight through diet alone. But combining a healthy dietary pattern with exercise is usually more effective for burning fat and maintaining muscle mass. The most important factors when creating a diet or workout plan are safety, flexibility, and sustainability."
    },
    {
        key: 8,
        question: "Can you build muscle with only diet?",
        answer: "You won`t grow any muscle tissue unless you are eating in a caloric surplus. Drink as many protein shakes as you want, eat as much chicken breast you can, but if you are not eating enough calories, then don`t expect any muscle gain."
    }
];
