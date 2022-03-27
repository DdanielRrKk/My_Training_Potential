import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    USER_NAME,
    USER_WEIGHT,
    USER_HEIGHT,
    USER_GENDER,
    USER_AGE
} from '../../database_stores';
import { IsResultEmpty } from '../../../helpers/databaseValidations';



// get data for home screen
export async function GetEditUserDataScreenData() {
    try {
        const userNameResult = await AsyncStorage.getItem(USER_NAME);
        // console.log('userNameResult', userNameResult);
        if(IsResultEmpty(userNameResult)) return console.log('user name has no data'); 
        
        const userAgeResult = await AsyncStorage.getItem(USER_AGE);
        // console.log('userAgeResult', userAgeResult);
        if(IsResultEmpty(userAgeResult)) return console.log('user age has no data'); 

        const userWeightResult = await AsyncStorage.getItem(USER_WEIGHT);
        // console.log('userWeightResult', userWeightResult);
        if(IsResultEmpty(userWeightResult)) return console.log('user weight has no data'); 

        const userHeightResult = await AsyncStorage.getItem(USER_HEIGHT);
        // console.log('userHeightResult', userHeightResult);
        if(IsResultEmpty(userHeightResult)) return console.log('user height has no data'); 

        const userGenderResult = await AsyncStorage.getItem(USER_GENDER);
        // console.log('userGenderResult', userGenderResult);
        if(IsResultEmpty(userGenderResult)) return console.log('user gender has no data'); 

        // store has data
        const userName = JSON.parse(userNameResult);
        const userAge = JSON.parse(userAgeResult);
        const userWeight = JSON.parse(userWeightResult);
        const userHeight = JSON.parse(userHeightResult);
        const userGender = JSON.parse(userGenderResult);

        // console.log('userName', userName);
        // console.log('userAge', userAge);
        // console.log('userWeight', userWeight);
        // console.log('userHeight', userHeight);
        // console.log('userGender', userGender);

        return {
            name: userName,
            age: userAge,
            weight: userWeight,
            height: userHeight,
            gender: userGender
        }        
    } catch (error) {
        console.log(error);
    }
}
