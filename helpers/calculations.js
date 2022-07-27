// Body Mass Index - BMI (screening for weight cathegory)
export function calculateBMI(weight, height) {
    const result = (weight / Math.pow(height, 2));
    return (Math.round(result * 100) / 100).toFixed(3);
}



// Basal Metabolic Rate - BMR (normaly how much calories your body burns daily)
export function calculateBMR(gender, weight, height, age) {
    const tempResult = ((10 * weight) + (6.25 * height) - (5 * age));
    const result = (gender == 0) ? (tempResult + 5) : (tempResult - 161); // men : women
    return (Math.round(result * 100) / 100).toFixed(3);
}



// Body Fat Percentage - BFP (using BMI)
export function calculateBFP(gender, weight, height, age) {
    const bmi = calculateBMI(weight, height);
    // if(gender == 0 && age < 18) return (1.51 * bmi - 0.7 * age - 2.2); // boys
    // if(gender == 1 && age < 18) return (1.51 * bmi - 0.7 * age + 1.4); // girls
    // if(gender == 0 && age > 18) return (1.20 * bmi + 0.23 * age - 16.2); // men
    // if(gender == 1 && age > 18) return (1.20 * bmi - 0.23 * age - 5.4); // women
    // return 0; // with age difference

    const result = (gender == 0) ? (1.20 * bmi + 0.23 * age - 16.2) : (1.20 * bmi - 0.23 * age - 5.4); // men : women
    return (Math.round(result * 100) / 100).toFixed(3);
}



// Ideal Body Weight - IBW
export function calculateIBW(gender, height) {
    const result = (gender == 0) ? ((22 * height) * 2) : ((22 * height - 10) * 2); // men : women
    return (Math.round(result * 100) / 100).toFixed(3);
}



// Lean Body Mass - LBM
export function calculateLBM(gender, weight, height) {
    const result = (gender == 0) ? ((0.32810 * weight) + (0.33929 * height) - 29.5336) : ((0.29569 * weight) + (0.41813 * height) - 43.2933); // men : women
    return (Math.round(result * 100) / 100).toFixed(3);
}
