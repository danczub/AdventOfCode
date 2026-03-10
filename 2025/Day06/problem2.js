const InputFile = require('../../tools/InputFile.js');

const ADD = "+";
const MULTIPLY = "*";
const EMPTY_CHAR = " ";

function removeAdditionalWhitespaces(str) {
    return str.replace(/\s+/g,' ').trim();
}

function readProblem(inputData) {
    let inputLineList = inputData.split("\n");
    
    let operationList = new Array();
    let operationsLine = removeAdditionalWhitespaces(inputLineList[inputLineList.length - 1]);
    for(let c of operationsLine) {
        if(c !== EMPTY_CHAR) {
            operationList.push(c);
        }
    }
    
    //prepare problemList array of arrays
    let problemList = new Array(operationList.length);
    for(let i = 0; i < problemList.length; i++) {
        problemList[i] = new Array();
    }
    
    //process input problem list
    //we need to read it top-to-bottom, left to right
    let problemIndex = 0;
    let currentNumber = 0;

    for(let columnIndex = 0; columnIndex < inputLineList[0].length; columnIndex++) {
        currentNumber = 0;
        //process column
        for(let rowIndex = 0; rowIndex < inputLineList.length - 1; rowIndex++) {
            let c = inputLineList[rowIndex][columnIndex];
            if(c !== EMPTY_CHAR) {
                currentNumber = currentNumber * 10 + Number(c);
            }
        }
        //check if it's a empty column (separator) */
        if(currentNumber === 0) {
            problemIndex++;
        } else {
            problemList[problemIndex].push(currentNumber);
        }
    }
    
    return {
        problemList : problemList,
        operationList : operationList
    }
}
function add(a, b) {
    return a + b;
}
function multiply(a, b) {
    return a * b;
}

function solve(inputData) {
    let {problemList, operationList} = readProblem(inputData);
    let result = 0;
    for(let i = 0; i < problemList.length; i++) {
        let problemResult = problemList[i][0];
        let operationFunction = operationList[i] === ADD ? add : multiply;
        for(let j = 1; j < problemList[i].length; j++) {
            problemResult = operationFunction(problemResult, problemList[i][j]);
        }
        
        result += problemResult;
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

main(["input1.test", "input2.test"]);
