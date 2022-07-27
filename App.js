import React from 'react';

import { CreateDatabase, IsDatabaseCreated } from './database/general/general_services';

import RootNavigation from './navigation/rootNavigation';



export default function App() {
  
  React.useEffect(() => {
    let isGood = true;
    CreateDatabase();
    IsDatabaseCreated().then((check) => { 
      if(isGood && !check) {
        CreateDatabase();
        setChangeUpdater(false);
      }
    });

    return () => { isGood = false; } // to prevent memory leaks (clean up)
  }, []);

  return (
    <RootNavigation />
  );
}
