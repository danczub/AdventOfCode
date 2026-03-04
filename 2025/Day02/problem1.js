function processRange(start, end) {
    let result = 0;
    for(let num = start; num <= end; num++) {
        let numStr = "" + num;
        //must have even number of digits
        if(numStr.length % 2 === 0) {
            if(numStr.slice(0, numStr.length / 2) === numStr.slice(numStr.length / 2)) {
                result += num;
            }
        }
    }
    return result;
}

function solveProblem(inputArray) {
    let result = 0;
    for(input of inputArray) {
        range = input.split("-");
        result += processRange(Number(range[0]), Number(range[1]));
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
    let sequence = data.split(",");
    
    let resultSum = solveProblem(sequence);
    console.log("The resultSum: " + resultSum);
}

main("input1.test");
main("input2.test");