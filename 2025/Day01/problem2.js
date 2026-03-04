const BASE = 100;

function rotatePass0(accumulator, currentValue) {
    const LEFT = "L";
    
    let change = (currentValue[0] === LEFT ? -1 : 1) * Number(currentValue.slice(1));
    let position = (accumulator.position + change);

    let count = accumulator.count;
    if(position < 0) {
        //-99 should be counted as 1, but -100 as 2
        count += Math.abs(Math.floor((position-1) / BASE));
    } else {
        //99 should be counted as 0, but 100 as 1
        count += Math.abs(Math.floor(position / BASE));
    }
    //if it was already 0 and went to the left, we cannot count it
    if((position < 0) && (accumulator.position === 0)) {
        count--;
    }

    //if final position is 0, we should count it
    count += (position === 0) ? 1 : 0;

    position = position % BASE;
    position = position < 0 ? position + BASE : position;
    
    return {
        position : position,
        count : count
    };
}

function solveProblem(inputArray) {
    const initialValue = {
        position : 50,
        count : 0
    }
    let result = inputArray.reduce(rotatePass0, initialValue);
    return result.count;
}

function main(fileName) {
    const fs = require('node:fs');
    let data = null;
    try {
        data = fs.readFileSync(fileName, 'utf8');
    } catch (err) {
        console.error(err);
        return;
    }
    let sequence = data.split("\n");
    
    let resultPassword = solveProblem(sequence);
    console.log("The password: " + resultPassword);
}


main("input1.test");
main("input2.test");
