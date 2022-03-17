import React from 'react';

import { CreateDatabase, ExistsDatabase, DropDatabase } from './database/general/general_services';

import { Provider } from 'react-redux';
import { Store } from './redux/redux';
import RootNavigation from './navigation/rootNavigation';



export default function App() {
  const [existsDatabase, setExistsDatabase] = React.useState(null);

  React.useEffect(() => {
    let isGood = true;

    // DropDatabase();

    ExistsDatabase().then((check) => { if(isGood) setExistsDatabase(check); });
    console.log('existsDatabase', existsDatabase);

    if(!existsDatabase && existsDatabase !== null) CreateDatabase();

    return () => {  isGood = false; } // to prevent memory leaks (clean up)
  }, [existsDatabase]);

  return (
    <Provider store={Store}>
      <RootNavigation />
    </Provider>
  );
}
