import React from 'react';
import { TouchableOpacity } from 'react-native';

import { TERTIARY_COLOR } from '../../styles/colors';

import { EvilIcons } from '@expo/vector-icons';



export default function OptionsButton({ style, pressHandler }){    
    return(
        <TouchableOpacity 
            style={style}
            onPress={() => pressHandler()}>
            <EvilIcons name="gear" size={28} color={TERTIARY_COLOR} />
        </TouchableOpacity>
    );
};
