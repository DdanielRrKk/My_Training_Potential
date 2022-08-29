export function GetCorrectTextInput(input, isInc) {
    if(isInc) return (input == null || input == '' || input <= 0 || input == 'NaN') ? 1 : (parseInt(input) + 1);
    return (input == null || input == '' || input <= 0 || input == 'NaN') ? 0 : (parseInt(input) - 1);
}

export function GetCorrectTimeInput(time, isInc, isHour) {
    if(isInc) {
        // if(time == null || time == '' || time <= 0 || time == 'NaN') return 1;
        if(isHour) return (time >= 23) ? 0 : (parseInt(time) + 1);
        return (time >= 59) ? 0 : (parseInt(time) + 1);
    }
    // if(time == null || time == '' || time <= 0 || time == 'NaN') return 0;
    if(isHour) return (time <= 0 || time > 23) ? 23 : (parseInt(time) - 1);
    return (time <= 0 || time > 59) ? 59 : (parseInt(time) - 1);
}

export function GetPercentageOfSmallValueInBigValue(small_value, big_value) {
    return parseFloat((small_value / big_value)).toFixed(2);
}

export function getAverage(min, max) {
    const temp1 = parseInt(min);
    const temp2 = parseInt(max);
    return(parseInt((temp1 + temp2) / 2));
}

export function getActivityLevelFromActiveDays(activeDays) {
    switch(activeDays){
        case 0: return 1;
        case 1: return 2;
        case 2: return 2;
        case 3: return 2;
        case 4: return 3;
        case 5: return 3;
        case 6: return 4;
        case 7: return 5;
        default: return 0;
    }
}

export function GetReadyArrayForExercises(rawArray) {
    const readyArray = [];

    for (let i = 0; i < rawArray.length; i++) {
        const setsNumber = rawArray[i].sets;

        if(rawArray[i].type == 0) {
            const lastKey = readyArray.length + 1;
            readyArray.push({
                key: lastKey,
                name: `${rawArray[i].name} (from ${rawArray[i].minReps} - ${rawArray[i].maxReps} reps)`,
                type: -1
            });

            for (let j = 0; j < setsNumber; j++) {
                const lastKey = readyArray.length + 1;
                readyArray.push({
                    key: lastKey,
                    name: `Set ${j + 1}`,
                    type: rawArray[i].type,
                    value: getAverage(rawArray[i].minReps, rawArray[i].maxReps),
                    rest: rawArray[i].rest,
                    isFinished: false
                });
            }
        }

        if(rawArray[i].type == 1) {
            const lastKey = readyArray.length + 1;
            readyArray.push({
                key: lastKey,
                name: `${rawArray[i].name} (duration ${rawArray[i].duration} seconds)`,
                type: -1
            });

            for (let j = 0; j < setsNumber; j++) {
                const lastKey = readyArray.length + 1;
                readyArray.push({
                    key: lastKey,
                    name: `Set ${j + 1}`,
                    type: rawArray[i].type,
                    value: rawArray[i].duration,
                    rest: rawArray[i].rest,
                    isFinished: false
                });
            }
        }
    }

    return readyArray;
}

export function GetReadyArrayForDatabase(rawArray) {
    const readyArray = [];

    for (let i = 0; i < rawArray.length; i++) {
        if(rawArray[i].type != -1) {
            const lastKey = readyArray.length + 1;
            readyArray.push({
                key: lastKey,
                name: rawArray[i].name,
                value: rawArray[i].value
            });
        }
    }


    for (let i = 0; i < rawArray.length; i++) {
        const setsNumber = rawArray[i].sets;

        if(rawArray[i].type == 0) {
            const lastKey = readyArray.length + 1;
            readyArray.push({
                key: lastKey,
                name: `${rawArray[i].name} (from ${rawArray[i].minReps} - ${rawArray[i].maxReps} reps)`,
                type: -1
            });

            for (let j = 0; j < setsNumber; j++) {
                const lastKey = readyArray.length + 1;
                readyArray.push({
                    key: lastKey,
                    name: `Set ${j + 1}`,
                    instructions: rawArray[i].instructions,
                    sets: rawArray[i].sets,
                    type: rawArray[i].type,
                    value: getAverage(rawArray[i].minReps, rawArray[i].maxReps),
                    rest: rawArray[i].rest
                });
            }
        }

        if(rawArray[i].type == 1) {
            const lastKey = readyArray.length + 1;
            readyArray.push({
                key: lastKey,
                name: `${rawArray[i].name} (duration ${rawArray[i].duration} seconds)`,
                type: -1
            });

            for (let j = 0; j < setsNumber; j++) {
                const lastKey = readyArray.length + 1;
                readyArray.push({
                    key: lastKey,
                    name: `Set ${j + 1}`,
                    instructions: rawArray[i].instructions,
                    sets: rawArray[i].sets,
                    type: rawArray[i].type,
                    value: rawArray[i].duration,
                    rest: rawArray[i].rest
                });
            }
        }
    }

    return readyArray;
}
