import React from 'react';
import { TouchableOpacity } from 'react-native';

import { TERTIARY_COLOR } from '../../styles/colors';

import { AntDesign } from '@expo/vector-icons';



export default function CheckButton({ pressHandler }){    
    return(
        <TouchableOpacity onPress={() => pressHandler()}>
            <AntDesign name="check" size={24} color={TERTIARY_COLOR} />
        </TouchableOpacity>
    );
};
