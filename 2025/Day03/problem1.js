function getMaxDigit(str, leftIndex, rightIndex) {
    let maxDigit = 0;
    let maxDigitPosition = rightIndex;

    for(let i = rightIndex; i >= leftIndex; i--) {
        if(Number(str[i]) >= maxDigit) {
            maxDigit = Number(str[i]);
            maxDigitPosition = i;
        }
    }
    
    return {
        maxDigit : maxDigit,
        maxDigitPosition : maxDigitPosition
    };
}

function getMaxJoltage(input) {
    let leftIndex = 0;
    let rightIndex = input.length - 2;

    let tens = getMaxDigit(input, leftIndex, rightIndex);
    let ones = getMaxDigit(input, tens.maxDigitPosition + 1, input.length - 1);

    let result = 10 * tens.maxDigit + ones.maxDigit;
    
    return result;
}

function solveProblem(inputArray) {
    let result = 0;
    for(let input of inputArray) {
        result += getMaxJoltage(input);
    }
    return result;
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
    let splitSequence = "\n";
    if(data.indexOf("\r") !== -1) {
        splitSequence = "\r\n";
    }
    let sequence = data.split(splitSequence);
    
    let resultSum = solveProblem(sequence);
    console.log("The joltage: " + resultSum);
}

main("input1.test");
main("input2.test");