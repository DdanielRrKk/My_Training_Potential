import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';



const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';

TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, ({ data, error, executionInfo }) => {
  console.log('Received a notification in the background!');
  // Do something with the notification data
  console.log('data: ',data);
  console.log('error: ',error);
  console.log('executionInfo: ',executionInfo);
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
  }),
});

// Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);



export async function SchedulePushNotification(hours, minutes, seconds) {
  const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
          title: "Training reminder",
          body: "It's time to start your next workout",
          data: { 
            data: 'data goes here' 
          }
      },
      trigger: {
          hour: hours,
          minute: minutes,
          repeats: true,
      }
    }
  );
  console.log('notificationId', notificationId);
};

export async function CancelScheduledNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}



// export async function RegisterForPushNotificationsAsync() {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
    
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();

//       if (status !== 'granted') {
//         console.log('Failed to get push token for push notification!');
//         return;
//       }
//     }

//     const token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log('token: ',token);

//     if (Platform.OS === 'android') {
//         Notifications.setNotificationChannelAsync('default', {
//             name: 'Permission Notification',
//             importance: Notifications.AndroidImportance.MAX,
//             vibrationPattern: [0, 250, 250, 250],
//             lightColor: '#FF231F7C',
//         });
//     }
// }
