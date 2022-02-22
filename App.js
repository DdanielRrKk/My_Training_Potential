import React from 'react';

import { CreateDatabase, ExistsDatabase, DropDatabase } from './database/general/general_services';
import { 
  GetUserPreferenceIsUserDataReady, 
  SetUserPreferenceIsUserDataReady,
  GetUserPreferenceIsMealReady,
  GetUserPreferenceIsWorkoutReady 
} from './database/services/user_services/user_preferences_services';

import LoadingScreen from './screens/landing/loadingScreen';
import LandingNavigation from './navigation/landing/landingNavigation';
import SetupAllNavigation from './navigation/setup/setupAllNavigation';
import MainNavigation from './navigation/main/mainNavigation';



export default function App() {
  const [existsDatabase, setExistsDatabase] = React.useState(null);
  const [isUserDataReady, setIsUserDataReady] = React.useState(null);
  const [isMealReady, setIsMealReady] = React.useState(null);
  const [isWorkoutReady, setIsWorkoutReady] = React.useState(null);

  React.useEffect(() => {
    // DropDatabase();

    ExistsDatabase(setExistsDatabase);
    console.log('existsDatabase', existsDatabase);
    if(!existsDatabase && existsDatabase != null) CreateDatabase();

    if(!isUserDataReady || isUserDataReady == null) GetUserPreferenceIsUserDataReady(setIsUserDataReady);
    if(!isMealReady || isMealReady == null) GetUserPreferenceIsMealReady(setIsMealReady);
    if(!isWorkoutReady || isWorkoutReady == null) GetUserPreferenceIsWorkoutReady(setIsWorkoutReady);
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

  if(!isMealReady || isMealReady == null && !isWorkoutReady || isWorkoutReady == null) {
    console.log('SetupAllNavigation');
    return (
      <SetupAllNavigation />
    );
  }

  return (
    <MainNavigation />
  );
}
