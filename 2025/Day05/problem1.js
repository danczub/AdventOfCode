const InputFile = require('./../../tools/InputFile.js');

const EMPTY = ".";
const PAPER = "@";
const MAX_FILLED_ADJECNT_CELLS = 3;

function getFreshCount(freshRangeList, idList) {
    let result = 0;

    //sort the sets by end
    freshRangeList.sort(function (a, b) {
        return a.end - b.end;
    });
    //sort the ids
    idList.sort(function(a, b) {
        return a - b;
    });

    //with sorted elements, checking is easiert
    let rangeStartIndex = 0;
    for(let idIndex = 0; idIndex < idList.length; idIndex++) {
        let id = idList[idIndex];
        //if id if higher than the range, move set index
        while(rangeStartIndex < freshRangeList.length 
            && id > freshRangeList[rangeStartIndex].end) {
                rangeStartIndex++;
            }
        for(let rangeIndex = rangeStartIndex; rangeIndex < freshRangeList.length; rangeIndex++) {
            if(id >= freshRangeList[rangeIndex].start) {
                result++;
                break;
            }
        }
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

    let freshCount = getFreshCount(ranges, ids);
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
