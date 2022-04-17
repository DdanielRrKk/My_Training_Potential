import React from 'react';
import { DeviceEventEmitter } from 'react-native';

import { CreateDatabase, ExistsDatabase } from './database/general/general_services';

import RootNavigation from './navigation/rootNavigation';



export default function App() {
  const [appState, setAppState] = React.useState();
  console.log('appState', appState);

  React.useEffect(() => {
    let isGood = true;

    DeviceEventEmitter.addListener('event.appState', ({flag}) => setAppState(flag));

    CreateDatabase();

    ExistsDatabase().then((check) => { 
      if(isGood) {
        // console.log('check', check);
        setAppState(check);
        if(!check) CreateDatabase();
      }
    });

    return () => { 
      isGood = false;
      DeviceEventEmitter.removeListener('appState');
    } // to prevent memory leaks (clean up)
  }, [appState]);

  return (
    <RootNavigation />
  );
}
