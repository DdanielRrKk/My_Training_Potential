// import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';



// const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';

// TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, ({ data, error, executionInfo }) => {
//   console.log('Received a notification in the background!');
//   // Do something with the notification data
//   console.log('data: ',data);
//   console.log('error: ',error);
//   console.log('executionInfo: ',executionInfo);
// });

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

// Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);



export async function SchedulePushNotification(title, message = null, weekday = 0, hours, minutes) {
    const contentObject = (message == null) ? { title: title } : {
        title: title,
        body: message,
    };

    const triggerObject = (weekday == 0) ? {
        hour: hours,
        minute: minutes,
        repeats: true,
    } : {
        weekday: weekday,
        hour: hours,
        minute: minutes,
        repeats: true,
    };

    const notificationId = await Notifications.scheduleNotificationAsync({
        content: contentObject,
        trigger: triggerObject
    });
    return notificationId;
};

export async function CancelScheduledNotification(id) {
    await Notifications.cancelScheduledNotificationAsync(id);
}

export async function CancelAllScheduledNotifications() {
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
