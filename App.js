import React from 'react';
import { DeviceEventEmitter } from 'react-native';

import { CreateDatabase, IsDatabaseCreated } from './database/general/general_services';

import RootNavigation from './navigation/rootNavigation';



export default function App() {
  const [changeUpdater, setChangeUpdater] = React.useState(false);
  console.log('changeUpdater', changeUpdater);

  React.useEffect(() => {
    let isGood = true;
    DeviceEventEmitter.addListener('event.appUpdate', ({flag}) => setChangeUpdater(flag));

    // CreateDatabase();
    IsDatabaseCreated().then((check) => { 
      if(isGood && !check) {
        CreateDatabase();
        setChangeUpdater(false);
      }
    });

    return () => { 
      isGood = false;
      DeviceEventEmitter.removeListener('event.appUpdate');
    } // to prevent memory leaks (clean up)
  }, [changeUpdater]);

  return (
    <RootNavigation />
  );
}
