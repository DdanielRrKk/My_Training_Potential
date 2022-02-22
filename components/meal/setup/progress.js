import React from 'react';
import ProgressBar from 'react-native-progress/Bar';



export default function Progress({ style, progress }){    
    return(
        <ProgressBar 
            style={style}
            progress={progress}
            width={null}
            color={'black'}
            borderColor={'black'}
            borderRadius={0}/>
    );
};