import React from 'react';
import { TouchableOpacity } from 'react-native';

import { AntDesign } from '@expo/vector-icons';



export default function Header({ pressHandler }){    
    return(
        <TouchableOpacity onPress={() => pressHandler()}>
            <AntDesign 
                name="left" 
                size={24} />
        </TouchableOpacity>
    );
};