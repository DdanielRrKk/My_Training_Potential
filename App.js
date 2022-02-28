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
    let isGood = true;

    // DropDatabase();

    ExistsDatabase().then((check) => { if(isGood) setExistsDatabase(check); });
    console.log('existsDatabase', existsDatabase);

    if(!existsDatabase && existsDatabase !== null) CreateDatabase();

    if(!isUserDataReady || isUserDataReady === null || isUserDataReady === undefined) GetUserPreferenceIsUserDataReady().then((check) => { if(isGood) setIsUserDataReady(check); });
    if(!isMealReady || isMealReady === null || isMealReady === undefined) GetUserPreferenceIsMealReady().then((check) => { if(isGood) setIsMealReady(check); });
    if(!isWorkoutReady || isWorkoutReady === null || isWorkoutReady === undefined) GetUserPreferenceIsWorkoutReady().then((check) => { if(isGood) setIsWorkoutReady(check); });

    return () => {  isGood = false; } // to prevent memory leaks (clean up)
  }, [existsDatabase, isUserDataReady, isMealReady, isWorkoutReady]);

  console.log('isUserDataReady', isUserDataReady);
  console.log('isMealReady', isMealReady);
  console.log('isWorkoutReady', isWorkoutReady);

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
