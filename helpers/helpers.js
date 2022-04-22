export function GetCorrectTextInput(input, isInc) {
    if(isInc) return (input == null || input == '' || input <= 0 || input == 'NaN') ? 1 : (parseInt(input) + 1);
    return (input == null || input == '' || input <= 0 || input == 'NaN') ? 0 : (parseInt(input) - 1);
}

export function GetPercentageOfSmallValueInBigValue(small_value, big_value) {
    return parseFloat((small_value / big_value)).toFixed(2);
}

export function getAverage(min, max) {
    const temp1 = parseInt(min);
    const temp2 = parseInt(max);
    
    return((temp1 + temp2) / 2);
}

export function getActivityLevelFromActiveDays(activeDays) {
    switch(activeDays){
        case 0: return 1;
        case 1: return 2;
        case 2: return 2;
        case 3: return 2;
        case 4: return 3;
        case 5: return 3;
        case 6: return 4;
        case 7: return 5;
        default: return 0;
    }
}
