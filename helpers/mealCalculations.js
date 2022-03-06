
// Basal Metabolic Rate - BMR (normaly how much calories your body burns daily)
function calculateBMRMen(weight, height, age) {
    // return 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age); // old (slightly less calories)
    return (88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)); // garnet health formula
}
function calculateBMRWomen(weight, height, age) {
    // return 65.51 + (9.563 * weight) + (1.850 * height) - (4.676 * age); // old (slightly less calories)
    return (447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)); // garnet health formula
}

// Active Metabolic Rate - AMR (calories with activity)
function calculateAMR(bmr, activity) {
    if(activity = 1) return (bmr * 1.2); // little to no exercise
    if(activity = 2) return (bmr * 1.375); // exercise 1 - 3 days per week
    if(activity = 3) return (bmr * 1.55); // exercise 3 - 5 days per week
    if(activity = 4) return (bmr * 1.725); // exercise 6 - 7 days per week
    if(activity = 5) return (bmr * 1.9); // hard exercise 6 - 7 days per week
}

// Ideal Body Weight - IBW
function calculateIBWMen(height) {
    return ((22 * height) * 2);
}
function calculateIBWWomen(height) {
    return ((22 * height - 10) * 2);
}



export function getIdealWeight(gender, height) {
    return (gender == 1) ? calculateIBWMen(height) : calculateIBWWomen(height);
}

export function calculateCalories(weight, height, age, gender, activity, goal = null) {
    const bmr = (gender == 1) ? calculateBMRMen(weight, height, age) : calculateBMRWomen(weight, height, age);
    if(goal == 1) { // weight loss
        const amr = calculateAMR(bmr, activity);
        return (amr - (amr * 0.15)); // 15% less calories 
    }
    if(goal == 3) { // muscle growth
        const arm = calculateAMR(bmr, activity);
        return (arm + 500); // 500 calories more (calories surplus)
    }
}

export function calculateCarbs(weight, height, age, gender, activity, goal = null) {
    const bmr = (gender == 1) ? calculateBMRMen(weight, height, age) : calculateBMRWomen(weight, height, age);
    const amr = calculateAMR(bmr, activity);

    let goal_based_amr = 0;
    if(goal == 1) goal_based_amr = (amr - (amr * 0.15)); // weight loss
    if(goal == 3) goal_based_amr = (amr + 500); // muscle growth

    const calories_from_carbs = (goal_based_amr * 0.5); // 50% from all calories
    return (calories_from_carbs / 4); // grams of carbs
}

export function calculateProtein(weight, height, age, gender, activity, goal = null) {
    const bmr = (gender == 1) ? calculateBMRMen(weight, height, age) : calculateBMRWomen(weight, height, age);
    const amr = calculateAMR(bmr, activity);

    let goal_based_amr = 0;
    if(goal == 1) goal_based_amr = (amr - (amr * 0.15)); // weight loss
    if(goal == 3) goal_based_amr = (amr + 500); // muscle growth

    const calories_from_protein = (goal_based_amr * 0.25); // 25% from all calories
    return (calories_from_protein / 4); // grams of protein
}

export function calculateFat(weight, height, age, gender, activity, goal = null) {
    const bmr = (gender == 1) ? calculateBMRMen(weight, height, age) : calculateBMRWomen(weight, height, age);
    const amr = calculateAMR(bmr, activity);

    let goal_based_amr = 0;
    if(goal == 1) goal_based_amr = (amr - (amr * 0.15)); // weight loss
    if(goal == 3) goal_based_amr = (amr + 500); // muscle growth

    const calories_from_fat = (goal_based_amr * 0.25); // 25% from all calories
    return (calories_from_fat / 9); // grams of fat
}



export function calculateRecommendedCalories(calories) {
    const breakfastCalories = parseInt(calories * 0.35); // 35% of total calories
    const lunchCalories = parseInt(calories * 0.35); // 35% of total calories
    const dinnerCalories = parseInt(calories * 0.30); // 30% of total calories

    const range = 200; // range -200 and +200 cal from normal

    return {
        breakfastRecommendedMin: breakfastCalories - range,
        breakfastRecommendedMax: breakfastCalories + range,
        lunchRecommendedMin: lunchCalories - range,
        lunchRecommendedMax: lunchCalories + range,
        dinnerRecommendedMin: dinnerCalories - range,
        dinnerRecommendedMax: dinnerCalories + range,
    }
}
