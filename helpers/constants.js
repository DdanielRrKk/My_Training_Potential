
export const SYSTEM_USER_SETUP = 1;
export const SYSTEM_USER_AND_MEAL_SETUP = 2;
export const SYSTEM_USER_AND_WORKOUT_SETUP = 3;
export const SYSTEM_ALL_SETUP = 4;


export const NAME_MAX_LENGTH = 40;

export const AGE_MAX_LENGTH = 3;
export const WEIGHT_MAX_LENGTH = 3;
export const HEIGHT_MAX_LENGTH = 3;

export const LONG_TEXT_MAX_LENGTH = 100;


export const NUTRITIONS_MAX_LENGTH = 5;

export const WATER_INTAKE_VALUE = 250;

export const CALORIES_PERCENTAGE = 1; // 100%
export const CARBS_PERCENTAGE_OF_CALORIES = 0.5; // 50%
export const PROTEIN_PERCENTAGE_OF_CALORIES = 0.25; // 25%
export const FAT_PERCENTAGE_OF_CALORIES = 0.25; // 25%


export const WORKOUT_NUMBER_MAX_LENGTH = 4;
export const WORKOUT_TIME_MAX_LENGTH = 5;

export const WORKOUT_WEEKLY_ARRAY = [
    {
        day_number: 1,
        name: null,
        exercises: []
    },
    {
        day_number: 2,
        name: null,
        exercises: []
    },
    {
        day_number: 3,
        name: null,
        exercises: []
    },
    {
        day_number: 4,
        name: null,
        exercises: []
    },
    {
        day_number: 5,
        name: null,
        exercises: []
    },
    {
        day_number: 6,
        name: null,
        exercises: []
    },
    {
        day_number: 7,
        name: null,
        exercises: []
    },
];


// ALERT MESSAGES =====================
export const ALERT_WARNING_TITLE = 'Warning !';

export const ALERT_NOT_SETUP_MEAL_PLAN_TEXT = "You don't have a meal set up.";
export const ALERT_NOT_SETUP_WORKOUT_PLAN_TEXT = "You don't have a workout set up.";
export const ALERT_RESET_SETUP_PLAN_TEXT = 'If you reset your plan setup, you will lose all of your data and progress. Do you want to continue ?';
export const ALERT_DELETE_ACCOUNT_TEXT = 'If you delete your account, you will lose all of your data and progress. Do you want to continue ?';

export const ALERT_NAME_TEXT = 'Not a valid name.';
export const ALERT_GENDER_TEXT = 'Select one of the gender options.';
export const ALERT_AGE_TEXT = 'Not a valid age.';
export const ALERT_WEIGHT_TEXT = 'Not a valid weight.';
export const ALERT_HEIGHT_TEXT = 'Not a valid height.';

export const ALERT_CALORIES_TEXT = 'Not a valid calories goal.';
export const ALERT_CARBS_TEXT = 'Not a valid carbs goal.';
export const ALERT_PROTEIN_TEXT = 'Not a valid protein goal.';
export const ALERT_FAT_TEXT = 'Not a valid fat goal.';

export const ALERT_MEAL_GOAL_TEXT = 'Select one of the meal goal options.';
export const ALERT_MEAL_ACTIVITY_LEVEL_TEXT = 'Select one of the activity level options.';
export const ALERT_MEAL_NAME_TEXT = 'Not a valid meal name.';

export const ALERT_WORKOUT_EXERCISE_NAME_TEXT = 'Not a valid exercise name.';
export const ALERT_WORKOUT_DAY_NAME_TEXT = 'Not a valid workout name.';
export const ALERT_WORKOUT_PLAN_NAME_TEXT = 'Not a valid workout plan name.';
export const ALERT_WORKOUT_PLAN_WORKOUTS_TEXT = 'The workout plan must have atleast one workout day.';

export const ALERT_NOTIFICATION_TITLE_TEXT = 'Not a valid title.';
export const ALERT_NOTIFICATION_TIME_TEXT = 'Not a valid time.';
export const ALERT_NOTIFICATION_DELETION_TEXT = 'Do you want to delete this notification?';



export const FAQ_LIST = [
    {
        key: 1,
        question: "How does muscles work?",
        answer: "Muscles provide the tug on the bones needed to bend, straighten, and support joints. Muscles can pull on bones, but they can't push them back to their original position, so the muscles work in pairs of flexors and extensors. The extensor muscle relaxes and stretches as the flexor muscle contracts to bend the joint."
    },
    {
        key: 2,
        question: "How much calories should I eat?",
        answer: "Generally, the recommended daily calorie intake is 2,000 calories a day for women and 2,500 for men."
    },
    {
        key: 3,
        question: "How often should I workout?",
        answer: "According to the Center for Disease Control and Prevention (CDC), adults should get at least 150 minutes of moderate-intensity aerobic activity, such as cycling or swimming, per week."
    },
    {
        key: 4,
        question: "Should I do cardio everyday?",
        answer: "There is no recommended upper limit on the amount of cardio exercise you should do on a daily or weekly basis. However, if you push yourself hard with every workout, then skipping a day or two each week to rest may help you avoid injury and burnout."
    },
    {
        key: 5,
        question: "What are macros?",
        answer: "“Macro” is short for macronutrient. What's a macronutrient? They're the three categories of nutrients you eat the most and provide you with most of your energy: protein, carbohydrates and fats. So when you're counting your macros, you're counting the grams of proteins, carbs or fat that you're consuming."
    },
    {
        key: 6,
        question: "How hard should I workout?",
        answer: "Your exercise intensity must generally be at a moderate or vigorous level for maximum benefit. For weight loss, the more intense or longer your activity, the more calories you burn. Balance is still important. Overdoing it can increase your risk of soreness, injury and burnout."
    },
    {
        key: 7,
        question: "Can you burn fat with just diet?",
        answer: "You can lose weight through diet alone. But combining a healthy dietary pattern with exercise is usually more effective for burning fat and maintaining muscle mass. The most important factors when creating a diet or workout plan are safety, flexibility, and sustainability."
    },
    {
        key: 8,
        question: "Can you build muscle with only diet?",
        answer: "You won`t grow any muscle tissue unless you are eating in a caloric surplus. Drink as many protein shakes as you want, eat as much chicken breast you can, but if you are not eating enough calories, then don`t expect any muscle gain."
    }
];
