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


function shiftWorkoutsNTimes(workouts, n) {
    for (let i = 0; i < n; i++) workouts.push(workouts.shift());
    return workouts;
}

function DuplicateWorkouts(workouts, current_workout) {
    const tempArray = [];
    let count = (current_workout == null) ? 0 : current_workout;
    
    while(tempArray.length != 7) {
        if(count == workouts.length) count = 0;

        tempArray.push({
            day_number: tempArray.length + 1,
            name: workouts[count].name,
            exercises: workouts[count].exercises
        });

        count++;
    }

    return tempArray;
}

export function getSortedWorkouts(workouts, type, current_workout = null) {
    if(type == 0) {
        const today = new Date();
        switch(today.getDay()) {
            case 0: return shiftWorkoutsNTimes(workouts, 6); // Sunday
            case 1: return workouts; // Monday
            case 2: return shiftWorkoutsNTimes(workouts, 1); // Tuesday
            case 3: return shiftWorkoutsNTimes(workouts, 2); // Wednesday
            case 4: return shiftWorkoutsNTimes(workouts, 3); // Thursday
            case 5: return shiftWorkoutsNTimes(workouts, 4); // Friday
            case 6: return shiftWorkoutsNTimes(workouts, 5); // Saturday
            default: return null;
        }
    }
    else return DuplicateWorkouts(workouts, current_workout);
}
