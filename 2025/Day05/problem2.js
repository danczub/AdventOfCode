const InputFile = require('../../tools/InputFile.js');

const EMPTY = ".";
const PAPER = "@";
const MAX_FILLED_ADJECNT_CELLS = 3;

function getFreshCount(freshRangeList) {
    let result = 0;

    //sort the ranges by start
    let countedMax = 0;
    freshRangeList.sort(function (a, b) {
        return a.start - b.start;
    });

    for(let range of freshRangeList) {
        let currentRangeCount = Math.max(0, range.end - Math.max(countedMax + 1, range.start) + 1);
        result += currentRangeCount;
        
        countedMax = Math.max(range.end, countedMax);
    }
    
    return result;
}

function solve(inputData) {
    //process the file
    let inputLines = inputData.split("\n");
    let ranges = new Array();
    let ids = new Array();
    let processRanges = true;

    for(let inputLine of inputLines) {
        if(processRanges && inputLine === "") {
            processRanges = false;
        }
        if(processRanges) {
            let lineSplit = inputLine.split("-");
            ranges.push({
                start : Number(lineSplit[0]), 
                end : Number(lineSplit[1])
            });
        } else {
            ids.push(Number(inputLine));
        }
    }

    let freshCount = getFreshCount(ranges);
    return freshCount;
}

function main(fileNameList) {
    for(let fileName of fileNameList) {
        InputFile.readFile(fileName);
        let inputData = InputFile.getData();
        InputFile.clearData();
        
        console.log("File: " + fileName + ", Result: " + solve(inputData));
    }
}

main(["input1.test", "input2.test"]);
