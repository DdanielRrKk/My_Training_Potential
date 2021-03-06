export function getCurrentDateForLog() {
    const today = new Date();
    let recordedDate = undefined;
    
    switch(today.getMonth()) {
        case 0: recordedDate = `${today.getDate()} January`; break;
        case 1: recordedDate = `${today.getDate()} February`; break;
        case 2: recordedDate = `${today.getDate()} March`; break;
        case 3: recordedDate = `${today.getDate()} April`; break;
        case 4: recordedDate = `${today.getDate()} May`; break;
        case 5: recordedDate = `${today.getDate()} June`; break;
        case 6: recordedDate = `${today.getDate()} July`; break;
        case 7: recordedDate = `${today.getDate()} August`; break;
        case 8: recordedDate = `${today.getDate()} September`; break;
        case 9: recordedDate = `${today.getDate()} October`; break;
        case 10: recordedDate = `${today.getDate()} November`; break;
        case 11: recordedDate = `${today.getDate()} December`; break;
        default: recordedDate = 'wrong date';
    }
    return recordedDate;
}



export function getCurrentDateString() {
    const today = new Date();
    return `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;
}
