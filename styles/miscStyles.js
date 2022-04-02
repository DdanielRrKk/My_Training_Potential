import { StatusBar } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from './colors';



export const question = {
    fontSize: 18,
    marginBottom: 32,
    color: TERTIARY_COLOR
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



export const results = {
    marginTop: 32,
    width: '100%',
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 10,
    shadowColor: TERTIARY_COLOR,
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
};

export const label_18 = {
    fontSize: 18,
    fontWeight: 'bold',
    color: PRIMARY_COLOR
};

export const row = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24
};



export const title = {
    fontSize: 18,
    marginVertical: 32,
    color: TERTIARY_COLOR
}
