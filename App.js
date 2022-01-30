import React from 'react';

import { CreateDatabase, ExistsDatabase, DropDatabase } from './database/general/general_services';
import { GetUserPreferenceIsUserDataReady, SetUserPreferenceIsUserDataReady } from './database/services/user_services/user_preferences_services';

import LoadingScreen from './screens/landing/loadingScreen';
import LandingNavigation from './navigation/landing/landingNavigation';
import MainNavigation from './navigation/main/mainNavigation';



export default function App() {
  const [existsDatabase, setExistsDatabase] = React.useState(null);
  const [readyDatabase, setReadyDatabase] = React.useState(null);
  const [isUserDataReady, setIsUserDataReady] = React.useState(null);

  React.useEffect(() => {
    // DropDatabase();

    ExistsDatabase(setExistsDatabase);
    console.log('existsDatabase', existsDatabase);
    if(!existsDatabase && existsDatabase != null) CreateDatabase(setReadyDatabase);

    if(!isUserDataReady || isUserDataReady == null) GetUserPreferenceIsUserDataReady(setIsUserDataReady);
  });

  console.log('isUserDataReady', isUserDataReady);

  const dataReady = () => {
    SetUserPreferenceIsUserDataReady(true);
    setIsUserDataReady(true);
  }

  if(isUserDataReady == null) {
    return (
      <LoadingScreen />
    );
  }

  if(!isUserDataReady) {
    return (
      <LandingNavigation dataReady={dataReady}/>
    );
  }

  return (
    <MainNavigation />
  );
}
