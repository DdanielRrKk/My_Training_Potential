export function calculateTimeString(secs) { 
    const hours = Math.floor(secs / (60 * 60));

    const divisor_for_minutes = secs % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60);

    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds);

    let hourString = hours;
    if(hours < 10) hourString = `0${hours}`;
    
    let minutesString = minutes;
    if(minutes < 10) minutesString = `0${minutes}`;
    
    let secondsString = seconds;
    if(seconds < 10) secondsString = `0${seconds}`;

    return `${hourString}:${minutesString}:${secondsString}`;
}

export function calculateTimeDurationString(secs) { 
    const divisor_for_minutes = secs % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60);

    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds);

    let minutesString = minutes;
    if(minutes < 10) minutesString = `0${minutes}`;
    
    let secondsString = seconds;
    if(seconds < 10) secondsString = `0${seconds}`;

    if(secs < 60) return `${secondsString}`;

    return `${minutesString}:${secondsString}`;
}

export function getCorrectTimeString(time) { 
    return (time < 10) ? `0${time}` : `${time}`;
}

export const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
}
