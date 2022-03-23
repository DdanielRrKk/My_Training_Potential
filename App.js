import React from 'react';

import { CreateDatabase, ExistsDatabase } from './database/general/general_services';

import RootNavigation from './navigation/rootNavigation';

import { useAppStateGlobal } from './helpers/globalState';



export default function App() {
  const [appState, setAppState] = useAppStateGlobal();
  console.log('appState', appState);

  React.useEffect(() => {
    let isGood = true;

    ExistsDatabase().then((check) => { if(isGood) setAppState(check); });

    if(!appState) CreateDatabase();

    return () => {  isGood = false; } // to prevent memory leaks (clean up)
  }, []);

  return (
    <RootNavigation />
  );
}
