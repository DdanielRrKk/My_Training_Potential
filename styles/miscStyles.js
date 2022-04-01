import { StyleSheet, StatusBar } from 'react-native';

import { TERTIARY_COLOR } from './colors';



export const question = {
    fontSize: 18,
    marginBottom: 32
}


export const container = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: StatusBar.currentHeight
};

export const content = {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red'
};
export const content_start = {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center'
};

export const back_button_container = {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start'
};

export const middle_button_container = {
    width: '100%',
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export const subtitle = {
    justifyContent: 'center',
    alignSelf: 'flex-start',
    fontSize: 18,
    paddingVertical: 16,
    color: TERTIARY_COLOR
};



export const shadow = {
    shadowColor: TERTIARY_COLOR,
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
}



const test_styles = StyleSheet.create({
    
});