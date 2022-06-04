export function IsResultEmpty(result) {
    return (result == null || result == '' || result == []);
}

export function IsInputTextValid(input) {
    if(input == '' || input == 0 || input == null) {
        return false;
    }
    return true;
}
export function IsInputNumberValid(input) {
    if(isNaN(input) || input == '' || input == null) {
        return false;
    }
    const num = parseInt(input);
    if(num == 0) {
        return false;
    }
    return true;
}
