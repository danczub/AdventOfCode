const InputFile = require('../../tools/InputFile.js');
const {Queue} = require('../../tools/Queue.js');
const {Matrix} = require('../../tools/Matrix.js');

const START_CHAR = "S";
const EMPTY_CHAR = ".";
const SPLITTER_CHAR = "^";

const START_CODE = 8;
const START_VISITED_CODE = 9;
const EMPTY_CODE = 1;
const EMPTY_VISITED_CODE = 2;
const SPLITTER_CODE = 3;
const SPLITTER_VISITED_CODE = 4;

const VISITED_CODES = [START_VISITED_CODE, EMPTY_VISITED_CODE, SPLITTER_VISITED_CODE];

let CHAR_TO_CODE = {};
CHAR_TO_CODE[START_CHAR] = START_CODE;
CHAR_TO_CODE[EMPTY_CHAR] = EMPTY_CODE;
CHAR_TO_CODE[SPLITTER_CHAR] = SPLITTER_CODE;

function readProblem(inputData) {
    let inputLineList = inputData.split("\n");

    let rows = inputLineList.length;
    let columns = inputLineList[0].length;
    let matrix = new Matrix(rows, columns);
    let startPosition = [-1, -1];

    for(let rowIndex = 0; rowIndex < rows; rowIndex++) {
        for(let columnIndex = 0; columnIndex < columns; columnIndex++) {
            let currentChar = inputLineList[rowIndex][columnIndex];
            if(currentChar === START_CHAR) {
                startPosition = [rowIndex, columnIndex];
            }
            matrix.setValue(rowIndex, columnIndex, CHAR_TO_CODE[currentChar]);
        }
    }
    return {
        matrix : matrix,
        startPosition : startPosition
    };

}

function solve(inputData) {
    let {matrix, startPosition} = readProblem(inputData);
    
    let result = 0;
    let toCheckQueue = new Queue();
    toCheckQueue.push(startPosition);

    //we should count number of visited splitters
    while(toCheckQueue.size() > 0) {
        let currentPosition = toCheckQueue.pop();
        let checkNextPath = false;
        
        while(!checkNextPath) {
            //check for out of range for columns
            if(currentPosition[1] < 0 || currentPosition[1] >= matrix.columns) {
                checkNextPath = true;
                continue;
            }
            
            //if we reached the bottom line - finish
            if(currentPosition[0] >= matrix.rows) {
                checkNextPath = true;
                continue;
            }
            
            let currentValue = matrix.getValue(currentPosition[0], currentPosition[1]);
            //check if already visited
            if (VISITED_CODES.indexOf(currentValue) !== -1) {
                checkNextPath = true;
                continue;
            }
            //mark as visited
            matrix.setValue(currentPosition[0], currentPosition[1], currentValue + 1);
            
            if (currentValue === SPLITTER_CODE) {
                result++;
                //take the left path, enqueue the right path
                toCheckQueue.push([currentPosition[0], currentPosition[1] - 1]);
                currentPosition[1]++;
            } else {
                //move down
                currentPosition[0]++;
            }
        }
    }

    return result;
}

function main(fileNameList) {
    for(let fileName of fileNameList) {
        InputFile.readFile(fileName);
        let inputData = InputFile.getData();
        InputFile.clearData();
        
        console.log("File: " + fileName + ", Result: " + solve(inputData));
    }
}

//main(["input1.test"]);
main(["input1.test", "input2.test"]);
