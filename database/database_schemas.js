export const SYSTEM_FLAGS_SCHEMA = {
    isUserReady: false,
    isMealReady: false,
    isWorkoutReady: false
};

export const USER_INFO_SCHEMA = {
    name: '',
    age: null,
    weight: null,
    height: null,
    gender: null,
    activityLevel: null
};

export const USER_GOALS_SCHEMA = {
    mealGoal: null,
    caloriesGoal: null,
    carbsGoal: null,
    proteinGoal: null,
    fatGoal: null
};

export const MEAL_SCHEMA = {
    recommendedMin: null,
    recommendedMax: null,
    totalCalories: null,
    totalCarbs: null,
    totalProtein: null,
    totalFat: null,
    foods: []
};

export const WORKOUT_DAY_SCHEMA = {
    day_number: null,
    name: '',
    exercises: []
};
