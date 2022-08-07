import React from 'react';

import { CreateDatabase } from './database/general/general_services';

import RootNavigation from './navigation/rootNavigation';



export default function App() {
  
  React.useEffect(() => {
    let isGood = true;

    if(isGood) CreateDatabase(false).then((isNewStoreCreated) => {
      console.log('isNewStoreCreated', isNewStoreCreated)
    });

    return () => { isGood = false; } // to prevent memory leaks (clean up)
  }, []);

  return (
    <RootNavigation />
  );
}
