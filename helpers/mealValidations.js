export function CheckIsCorrectMealInput(input) {
    return (input == null || input == '' || input == 0) ? false : true;
}

export function GetCorrectMealInput(input, isInc) {
    if(isInc) return (input == null || input == '' || input <= 0 || input == 'NaN') ? 1 : (parseInt(input) + 1);
    return (input == null || input == '' || input <= 0 || input == 'NaN') ? 0 : (parseInt(input) - 1);
}