import React from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView } from 'react-native';

import { GetEditUserDataScreenData, SetEditUserData } from '../../../database/screen/home/settings_services';

import { container, back_button_container, subtitle } from '../../../styles/miscStyles';

import BackButton from '../../../components/misc/backButton';
import ActionButton from '../../../components/misc/actionButton';

import { NAME_MAX_LENGTH, AGE_MAX_LENGTH } from '../../../helpers/constants';



export default function EditUserDataScreen({ navigation }){
    const [name, setName] = React.useState(null);
    const [age, setAge] = React.useState(null);

    React.useEffect(() => {
        let isGood = true;

        GetEditUserDataScreenData().then(({ name, age }) => { 
            if(isGood) {
                setName(name);
                setAge(age); 
            }
        });

        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, []);

    const openPrevScreen = () => navigation.goBack();

    const saveEditData = () => {
        SetEditUserData(name, age);
        navigation.setOptions({ tabBarVisible: true });
        navigation.navigate('TabNavigation');
    }

    return(
        <SafeAreaView style={container}>
            <View style={back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={styles.content}>
                <Text style={subtitle}>Name</Text>

                <TextInput
                    style={styles.entry}
                    onChangeText={setName}
                    value={name}
                    maxLength={NAME_MAX_LENGTH}/>

                <Text style={subtitle}>Age</Text>

                <TextInput
                    style={styles.entry}
                    onChangeText={setAge}
                    value={age}
                    maxLength={AGE_MAX_LENGTH}/>
            </View>

            <ActionButton title='Save' pressHandler={saveEditData}/>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    entry:{
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        marginBottom: 16
    },
});