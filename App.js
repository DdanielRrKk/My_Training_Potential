import React from 'react';

import { CreateDatabase, ExistsDatabase, DropDatabase } from './database/general/general_services';
import { GetAppData } from './database/screen/app_serices';

import { SetSystemIsUserSetup, GetSystemIsUserSetup } from './database/screen/landing_services';

import LoadingScreen from './screens/landing/loadingScreen';
import LandingNavigation from './navigation/landing/landingNavigation';
import MainNavigation from './navigation/main/mainNavigation';

import { IsFlagCorrect } from './helpers/databaseValidations';



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

    GetAppData().then(({ isUserSetup, isMealReady, isWorkoutSetup }) => { 
      if(isGood) {
        setIsUserDataReady(isUserSetup);
        setIsMealReady(isMealReady);
        setIsWorkoutReady(isWorkoutSetup);
      }
     });

    return () => {  isGood = false; } // to prevent memory leaks (clean up)
  }, [existsDatabase, isUserDataReady, isMealReady, isWorkoutReady]);

  // console.log('isUserDataReady', isUserDataReady);
  console.log('isMealReady', isMealReady);
  // console.log('isWorkoutReady', isWorkoutReady);

  const dataReady = () => {
    SetSystemIsUserSetup(true);
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
