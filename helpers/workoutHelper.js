export function getCurrentWorkoutDay(days) {
    const today = new Date();
    switch(today.getDate()) {
        case 0: return days[6]; // Sunday
        case 1: return days[0]; // Monday
        case 2: return days[1]; // Tuesday
        case 3: return days[2]; // Wednesday
        case 4: return days[3]; // Thursday
        case 5: return days[4]; // Friday
        case 6: return days[5]; // Saturday
        default: return null;
    }
}



export function getWorkoutDaysWithoutToday(days) {
    const today = new Date();
    switch(today.getDate()) {
        case 0: { // Sunday
            days.push(days.shift());
            days.push(days.shift());
            days.push(days.shift());
            days.push(days.shift());
            days.push(days.shift());
            days.push(days.shift());
            days.splice(0, 1);
            return days;
        }
        case 1: { // Monday
            days.splice(0, 1);
            return days;
        }
        case 2: { // Tuesday
            days.push(days.shift());
            days.splice(0, 1);
            return days;
        }
        case 3: { // Wednesday
            days.push(days.shift());
            days.push(days.shift());
            days.splice(0, 1);
            return days;
        }
        case 4: { // Thursday
            days.push(days.shift());
            days.push(days.shift());
            days.push(days.shift());
            days.splice(0, 1);
            return days;
        }
        case 5: { // Friday
            days.push(days.shift());
            days.push(days.shift());
            days.push(days.shift());
            days.push(days.shift());
            days.splice(0, 1);
            return days;
        }
        case 6: { // Saturday
            days.push(days.shift());
            days.push(days.shift());
            days.push(days.shift());
            days.push(days.shift());
            days.push(days.shift());
            days.splice(0, 1);
            return days;
        }
        default: return null;
    }
}