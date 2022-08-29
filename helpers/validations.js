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

export function IsInputTimeValid(hour, minute) {
    if(isNaN(hour) || hour == '' || hour == null || isNaN(minute) || minute == '' || minute == null) {
        return false;
    }
    if(hour > 23 || hour < 0 || minute > 59 || minute < 0) {
        return false;
    }
    return true;
}
