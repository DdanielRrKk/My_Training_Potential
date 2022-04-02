import React from 'react';
import { Text, View } from 'react-native';

import { TERTIARY_COLOR } from '../../styles/colors';



export default function LoadingScreen() {
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color: TERTIARY_COLOR}}>Loading</Text>
        </View>
    );
};
