import React from 'react';

import { CreateDatabase, IsDatabaseCreated } from './database/general/general_services';

import RootNavigation from './navigation/rootNavigation';

import { 
  SchedulePushNotification,
  CancelScheduledNotifications
} from './helpers/notifications';



export default function App() {
  
  React.useEffect(() => {
    let isGood = true;

    // SchedulePushNotification(19, 4);
    // CancelScheduledNotifications();

    CreateDatabase(false).then((isNewStoreCreated) => {
      console.log('isNewStoreCreated', isNewStoreCreated)
    });
    
    // IsDatabaseCreated().then((check) => { 
    //   if(isGood && !check) {
    //     CreateDatabase();
    //     setChangeUpdater(false);
    //   }
    // });

    return () => { isGood = false; } // to prevent memory leaks (clean up)
  }, []);

  return (
    <RootNavigation />
  );
}
