import { Alert } from 'react-native';


export function AlertOK(title, information, pressHandler = null) {
    Alert.alert(
        title,
        information,
        [
            {
                text: "OK",
                onPress: pressHandler,
                style: "cancel"
            }
        ]
    );
}

export function AlertYESNO(title, information, noPressHandler, yesPressHandler) {
    Alert.alert(
        title,
        information,
        [
            {
                text: "No",
                onPress: noPressHandler,
                style: "cancel"
            },
            { 
              text: "Yes", 
              onPress: yesPressHandler
            }
        ]
    );
}
