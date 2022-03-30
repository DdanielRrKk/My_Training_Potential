export function IsResultEmpty(result) {
    return (result == null || result == '' || result == []);
}

export function IsFlagCorrect(flag) {
    return (!flag || flag === null || flag === undefined || flag === '' || flag === 'NaN');
}
