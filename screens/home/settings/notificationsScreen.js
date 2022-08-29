import React from 'react';
import { Text, View, SafeAreaView, TextInput, ScrollView } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { GetNotificationsScreenData, SetNotificationsScreenData } from '../../../database/screen/home/settings_services';

import { stylesMisc } from '../../../styles/miscStyles';
import { stylesSettings } from '../../../styles/homeStyles';

import BackButton from '../../../components/misc/backButton';
import TextEntry from '../../../components/misc/textEntry';
import NotificationTimeChanger from '../../../components/home/settings/notificationTimeChanger';
import ActionButton from '../../../components/misc/actionButton';
import NotificationsList from '../../../components/home/settings/notificationsList';

import { GetCorrectTimeInput } from '../../../helpers/helpers';
import { IsInputTextValid, IsInputTimeValid } from '../../../helpers/validations';
import { getCorrectTimeString } from '../../../helpers/timer';
import { 
    SchedulePushNotification,
    CancelScheduledNotification
} from '../../../helpers/notifications';
import { AlertOK, AlertYESNO } from '../../../helpers/alerts';
import { 
    NAME_MAX_LENGTH,
    LONG_TEXT_MAX_LENGTH,

    ALERT_WARNING_TITLE,
    ALERT_NOTIFICATION_TITLE_TEXT,
    ALERT_NOTIFICATION_TIME_TEXT,
    ALERT_NOTIFICATION_DELETION_TEXT
} from '../../../helpers/constants';



const DEFAULT_HOUR = 12;
const DEFAULT_HOUR_STRING = '12';
const DEFAULT_MINUTE = 30;
const DEFAULT_MINUTE_STRING = '30'; 
// moje da se napravi pop up za zadavaneto na vreme

export default function NotificationsScreen({ navigation }){ 
    const [isEditing, setIsEditing] = React.useState(false);

    const [key, setKey] = React.useState(null);
    const [title, setTitle] = React.useState(null);
    const [message, setMessage] = React.useState(null);
    
    const [weekDay, setWeekDay] = React.useState(0);

    const [hour, setHour] = React.useState(DEFAULT_HOUR);
    const [hourString, setHourString] = React.useState(DEFAULT_HOUR_STRING);
    const [minute, setMinute] = React.useState(DEFAULT_MINUTE);
    const [minuteString, setMinuteString] = React.useState(DEFAULT_MINUTE_STRING);
    
    const [notifications, setNotifications] = React.useState(null);

    
    const focus = useIsFocused();
    React.useEffect(() => {
        let isGood = true;

        GetNotificationsScreenData().then((notifications) => { 
            if(isGood) setNotifications(notifications);
         });

        return () => { isGood = false; } // to prevent memory leaks (clean up)
    }, [focus]);


    const openPrevScreen = () => navigation.goBack();

    const changeWeekDayHandler = (value) => setWeekDay(value);

    const saveNotification = () => {
        if(!IsInputTextValid(title)) {
            AlertOK(ALERT_WARNING_TITLE, ALERT_NOTIFICATION_TITLE_TEXT);
            return;
        }
        if(!IsInputTimeValid(parseInt(hour), parseInt(minute))) {
            AlertOK(ALERT_WARNING_TITLE, ALERT_NOTIFICATION_TIME_TEXT);
            return;
        }

        // console.log('key before', key);
        const readyMessage = (message == null || message == '') ? null : message;
        const readyHour = parseInt(hour);
        const readyMinute = parseInt(minute);
        const readyWeekDay = parseInt(weekDay);
        
        setKey(null);
        setTitle(null);
        setMessage(null);
        setWeekDay(0);
        setHour(DEFAULT_HOUR);
        setHourString(DEFAULT_HOUR_STRING);
        setMinute(DEFAULT_MINUTE);
        setMinuteString(DEFAULT_MINUTE_STRING);
        
        setIsEditing(false);

        if(key == null) {
            SchedulePushNotification(title, readyMessage, readyWeekDay, readyHour, readyMinute).then((notificationId) => {
                const lastKey = (notifications.length == 0) ? 1 : notifications[notifications.length - 1].key + 1;
                notifications.push({
                    key: lastKey, 
                    id: notificationId, 
                    title: title, 
                    message: readyMessage, 
                    weekDay: readyWeekDay,
                    hour: readyHour, 
                    minute: readyMinute
                });
                setNotifications([... notifications]);
                
                SetNotificationsScreenData(notifications);
            });
            return;
        }

        const index = notifications.findIndex((object) => object.key == key);
        CancelScheduledNotification(notifications[index].id);

        notifications[index].title = title;
        notifications[index].message = readyMessage; 
        notifications[index].weekDay = readyWeekDay;  
        notifications[index].hour = readyHour;  
        notifications[index].minute = readyMinute;

        SchedulePushNotification(title, readyMessage, readyWeekDay, readyHour, readyMinute).then((notificationId) => {
            notifications[index].id = notificationId;
            setNotifications([... notifications]);

            SetNotificationsScreenData(notifications);
        });
        return;
    };

    const editNotification = (key) => {
        setIsEditing(true);
        const index = notifications.findIndex((object) => object.key == key);

        setKey(notifications[index].key);
        setTitle(notifications[index].title);
        setMessage(notifications[index].message);
        setHour(notifications[index].hour);
        setHourString(getCorrectTimeString(notifications[index].hour));
        setMinute(notifications[index].minute);
        setMinuteString(getCorrectTimeString(notifications[index].minute));
    };

    const deleteNotification = (key) => {
        const index = notifications.findIndex((object) => object.key == key);
        CancelScheduledNotification(notifications[index].id);
        if(key == notifications[index].id) setKey(null);

        notifications.splice(index, 1);
        setNotifications([... notifications]);

        SetNotificationsScreenData(notifications);

        return;
    };

    const askForDeletingNotificationHadler = (key) => {
        AlertYESNO(ALERT_WARNING_TITLE, ALERT_NOTIFICATION_DELETION_TEXT, null, () => deleteNotification(key));
    };

    
    // Hour
    const incHourHandler = () => {
        const result = GetCorrectTimeInput(hour, true, true);
        setHour(result);
        setHourString(getCorrectTimeString(result));
    }
    const decHourHandler = () => {
        const result = GetCorrectTimeInput(hour, false, true);
        setHour(result);
        setHourString(getCorrectTimeString(result));
    }
    
    // Minute
    const incMinuteHandler = () => {
        const result = GetCorrectTimeInput(minute, true, false);
        setMinute(result);
        setMinuteString(getCorrectTimeString(result));
    }
    const decMinuteHandler = () => {
        const result = GetCorrectTimeInput(minute, false, false);
        setMinute(result);
        setMinuteString(getCorrectTimeString(result));
    }

    return(
        <SafeAreaView style={stylesMisc.container}>
            <ScrollView style={stylesMisc.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={stylesMisc.back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={stylesMisc.content_start}>
                    <Text style={stylesMisc.subtitle}>Title</Text>

                    <TextEntry
                        onChangeText={setTitle}
                        value={title}
                        maxLength={NAME_MAX_LENGTH}/>

                    <Text style={stylesMisc.subtitle}>Message</Text>

                    <TextInput
                        style={stylesSettings.messageBox}
                        placeholder='(optional)'
                        onChangeText={setMessage}
                        value={message}
                        maxLength={LONG_TEXT_MAX_LENGTH}
                        multiline={true}
                        numberOfLines={4}/>

                    <Text style={stylesMisc.subtitle}>Time</Text>

                    <NotificationTimeChanger
                        weekDayValue={weekDay}
                        changeWeekDayHandler={changeWeekDayHandler}

                        incHourHandler={incHourHandler}
                        decHourHandler={decHourHandler}
                        hourValue={hourString}

                        incMinuteHandler={incMinuteHandler}
                        decMinuteHandler={decMinuteHandler}
                        minuteValue={minuteString}/>

                    <Text style={stylesMisc.subtitle}>Notifications</Text>
                    
                    {notifications ? <>{NotificationsList(notifications, editNotification, askForDeletingNotificationHadler)}</> : null }
                </View>
            </ScrollView>

            <ActionButton title={(isEditing) ? 'Save Changes' : 'Create'} pressHandler={saveNotification}/>
        </SafeAreaView>
    );
};
