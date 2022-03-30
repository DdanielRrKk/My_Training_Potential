export function GetCorrectTextInput(input, isInc) {
    if(isInc) return (input == null || input == '' || input <= 0 || input == 'NaN') ? 1 : (parseInt(input) + 1);
    return (input == null || input == '' || input <= 0 || input == 'NaN') ? 0 : (parseInt(input) - 1);
}

export function GetPercentageOfSmallValueInBigValue(small_value, big_value) {
    return parseFloat((small_value / big_value)).toFixed(2);
}
