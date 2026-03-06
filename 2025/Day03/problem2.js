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

function getMaxJoltage
(input) {
    let leftIndex = 0;
    let rightIndex = input.length - 12;

    //find max combination of 12 digits
    let resultString = "";
    for(let i  = 0; i < 12; i++) {
        let getMaxDigitResult = getMaxDigit(input, leftIndex, rightIndex);
        resultString = resultString + String(getMaxDigitResult.maxDigit);
        leftIndex = getMaxDigitResult.maxDigitPosition + 1;
        rightIndex++;
    }

    return Number(resultString);
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