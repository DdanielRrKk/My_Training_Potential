import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

const STEPS_COUNTER = 'steps_counter';



export async function RegisterBackgroundStepsCounter() {
    return BackgroundFetch.registerTaskAsync(STEPS_COUNTER, {
        minimumInterval: 2, // 2 seconds
        stopOnTerminate: false, // android only,
        startOnBoot: true, // android only
    });
}

export async function UnregisterBackgroundStepsCounter() {
    return BackgroundFetch.unregisterTaskAsync(STEPS_COUNTER);
}

export async function CheckIsStepsCounterRegistered() {
    return await TaskManager.isTaskRegisteredAsync(STEPS_COUNTER);
}



export async function initBackgroundStepsCounter() {
    try {
        if (!TaskManager.isTaskDefined(STEPS_COUNTER)) {
            TaskManager.defineTask(STEPS_COUNTER, () => {
                console.log('activated task');
            });
        }

        await BackgroundFetch.registerTaskAsync(STEPS_COUNTER, {
            minimumInterval: 2, // 2 seconds
            stopOnTerminate: false, // android only,
            startOnBoot: true, // android only
        });
    } catch (err) {
        console.log("initBackgroundStepsCounter error:", err);
    }
}
