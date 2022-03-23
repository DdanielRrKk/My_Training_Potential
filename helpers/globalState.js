import GlobalStore from 'react-native-global-state-hooks';



const systemFlagsStore = new GlobalStore({
    isUserReady: false,
    isMealReady: false,
    isWorkoutReady: false
});
export const useSystemFlagsGlobal = systemFlagsStore.getHook();



const appState = new GlobalStore(false);
export const useAppStateGlobal = appState.getHook();
