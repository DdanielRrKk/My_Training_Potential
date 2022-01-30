import React from 'react';
import { TouchableOpacity } from 'react-native';

import { EvilIcons } from '@expo/vector-icons';



export default function OptionsButton({ style, pressHandler }){    
    return(
        <TouchableOpacity 
            style={style}
            onPress={() => pressHandler()}>
            <EvilIcons name="gear" size={28} color="black" />
        </TouchableOpacity>
    );
};