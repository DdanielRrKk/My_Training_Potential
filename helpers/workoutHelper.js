export function getDayName(day_number) {
    switch(day_number) {
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
        case 7: return 'Sunday';
        default: return null;
    }
}

export function getSortedWorkoutDays(days) {
    const today = new Date();
    switch(today.getDay()) {
        case 0: { // Sunday
            days.push(days.shift());
            days.push(days.shift());
            days.push(days.shift());
            days.push(days.shift());
            days.push(days.shift());
            days.push(days.shift());
            return days;
        }
        case 1: { // Monday
            return days;
        }
        case 2: { // Tuesday
            days.push(days.shift());
            return days;
        }
        case 3: { // Wednesday
            days.push(days.shift());
            days.push(days.shift());
            return days;
        }
        case 4: { // Thursday
            days.push(days.shift());
            days.push(days.shift());
            days.push(days.shift());
            return days;
        }
        case 5: { // Friday
            days.push(days.shift());
            days.push(days.shift());
            days.push(days.shift());
            days.push(days.shift());
            return days;
        }
        case 6: { // Saturday
            days.push(days.shift());
            days.push(days.shift());
            days.push(days.shift());
            days.push(days.shift());
            days.push(days.shift());
            return days;
        }
        default: return null;
    }
}
