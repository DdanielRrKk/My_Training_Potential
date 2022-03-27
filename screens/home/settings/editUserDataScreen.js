import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView } from 'react-native';

import { container, back_button_container } from '../../../styles/miscStyles';

import { GetEditUserDataScreenData, SetEditUserData } from '../../../database/screen/home/settings_services';

import BackButton from '../../../components/misc/backButton';



const NAME_MAX_LENGTH = 40;
const AGE_MAX_LENGTH = 3;

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
        navigation.goBack();
    }

    return(
        <SafeAreaView style={container}>
            <View style={back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={styles.content}>
                <Text style={styles.subtitle}>Name</Text>

                <TextInput
                    style={styles.entry}
                    onChangeText={setName}
                    value={name}
                    maxLength={NAME_MAX_LENGTH}/>

                <Text style={styles.subtitle}>Age</Text>

                <TextInput
                    style={styles.entry}
                    onChangeText={setAge}
                    value={age}
                    maxLength={AGE_MAX_LENGTH}/>
            </View>

            <TouchableOpacity
                style={styles.add}
                onPress={saveEditData}>
                <Text>Save</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    subtitle: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
        fontSize: 18,
        paddingVertical: 16
    },

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

    add: {
        marginTop: 16,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 8,
        alignItems: 'center',
        width: '100%'
    },
});