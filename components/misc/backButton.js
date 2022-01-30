import React from 'react';
import { TouchableOpacity } from 'react-native';

import { AntDesign } from '@expo/vector-icons';



export default function BackButton({ pressHandler }){    
    return(
        <TouchableOpacity onPress={() => pressHandler()}>
            <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
    );
};