import React from 'react';
import { Text , View, SafeAreaView } from 'react-native';

import { GetEditUserDataScreenData, SetEditUserData } from '../../../database/screen/home/settings_services';

import { container, back_button_container, subtitle, content_start } from '../../../styles/miscStyles';

import BackButton from '../../../components/misc/backButton';
import ActionButton from '../../../components/misc/actionButton';
import TextEntry from '../../../components/misc/textEntry';

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

            <View style={content_start}>
                <Text style={subtitle}>Name</Text>

                <TextEntry
                    onChangeText={setName}
                    value={name}
                    maxLength={NAME_MAX_LENGTH}/>

                <Text style={subtitle}>Age</Text>

                <TextEntry
                    onChangeText={setAge}
                    value={age}
                    maxLength={AGE_MAX_LENGTH}
                    isNumeric={true}/>
            </View>

            <ActionButton title='Save' pressHandler={saveEditData}/>
        </SafeAreaView>
    );
};
