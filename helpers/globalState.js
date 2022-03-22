import GlobalStore from 'react-native-global-state-hooks';

const systemFlagsStore = new GlobalStore({
    isUserReady: false,
    isMealReady: false,
    isWorkoutReady: false
});

export const useSystemFlagsGlobal = systemFlagsStore.getHook();
