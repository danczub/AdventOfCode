const InputFile = require('../../tools/InputFile.js');
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
        visitedMatrix : matrix,
        startPosition : startPosition
    };
}

function dfs(visitedMatrix, pathCountMatrix, x, y) {
    if(x < 0 || x >= visitedMatrix.rows) return 1;
    if(y < 0 || y >= visitedMatrix.columns) return 0;

    let result;
    let currentValue = visitedMatrix.getValue(x, y);
    if (VISITED_CODES.indexOf(currentValue) !== -1) {
        return pathCountMatrix.getValue(x, y);
    }

    //mark as visited
    visitedMatrix.setValue(x, y, currentValue + 1);
            
    if (currentValue === SPLITTER_CODE) {
        result = dfs(visitedMatrix, pathCountMatrix, x, y - 1) + dfs(visitedMatrix, pathCountMatrix, x, y + 1);
    } else {
        result = dfs(visitedMatrix, pathCountMatrix, x + 1, y);
    }
    pathCountMatrix.setValue(x, y, result);
    return result;
}

function solve(inputData) {
    let {visitedMatrix, startPosition} = readProblem(inputData);
    
    let pathCountMatrix = new Matrix(visitedMatrix.rows, visitedMatrix.columns);
    
    let result = dfs(visitedMatrix, pathCountMatrix, startPosition[0], startPosition[1]);
    
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

main(["input1.test", "input2.test"]);
