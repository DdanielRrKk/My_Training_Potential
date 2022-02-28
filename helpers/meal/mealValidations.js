export function CheckIsCorrectMealInput(input) {
    return (input == null || input == '' || input == 0) ? false : true;
}