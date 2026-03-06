function processRange(start, end) {
    let patternSet = new Set();

    //we need to check every pottential pattern length
    for(let patternLength = 1; patternLength <= (String(end).length / 2); patternLength++) {
        let pattern = "1".padEnd(patternLength, "0");
        
        while(pattern.length <= patternLength) {
            let fullPattern = pattern + pattern;
            while(Number(fullPattern) < start) {
                fullPattern += pattern;
            }
            
            while(Number(fullPattern) <= end) {
                patternSet.add(Number(fullPattern));
                fullPattern += pattern;
            }
            
            pattern = String(Number(pattern) + 1);
        }
    }

    let result = 0;
    for(let patternItem of patternSet) {
        result += patternItem;
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