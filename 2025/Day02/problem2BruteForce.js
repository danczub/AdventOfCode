function processRange(start, end) {
    let result = 0;
    
    for(let num = start; num <= end; num++) {
        const numStr = String(num);
        const numStrLength = numStr.length;

        for(let patternLength = 1; patternLength <= numStrLength / 2; patternLength++) {
            if((numStrLength % patternLength) === 0) {
                const pattern = numStr.slice(0, patternLength);
                let valid = true;

                //we need to check every chunk of numStr if it's identical with potencial pattern
                for(let i = 1; i < (numStrLength / patternLength); i++) {
                    valid = valid && (pattern === numStr.slice(i * patternLength, (i + 1) * patternLength));
                }
                if(valid) {
                    result += num;
                    //make sure not to count number twice if it contains two different patterns
                    break;
                }
            }
        }
    }
    return result;
}

function solveProblem(inputArray) {
    let result = 0;
    for(let input of inputArray) {
        const range = input.split("-");
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

    let startTime = new Date();
    let resultSum = solveProblem(sequence);
    let processingTime = (new Date()).getTime() - startTime.getTime();
    console.log("The resultSum: " + resultSum);
    console.log("Processing time: " + processingTime);
}

main("input1.test");
main("input2.test");
