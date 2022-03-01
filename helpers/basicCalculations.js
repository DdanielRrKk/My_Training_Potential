export function addition(textValue, numberValue) {
    if(textValue == null || textValue == '' || textValue == undefined || textValue == 'NaN') return numberValue;
    return (parseInt(textValue) + numberValue);
}

export function subtraction(textValue, numberValue) {
    if(textValue == null || textValue == '' || textValue == undefined || textValue == 'NaN') return numberValue;
    return (parseInt(textValue) - numberValue);
}