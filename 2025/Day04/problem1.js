const InputFile = require('../../tools/InputFile.js');
const {Matrix} = require('../../tools/Matrix.js');

const EMPTY = ".";
const PAPER = "@";
const MAX_FILLED_ADJECNT_CELLS = 3;

function getFilledAdjentCellsNumber(row, column, matrix) {
    let result = 0;

    for(let i = -1; i < 2; i++) {
        for(let j = -1; j < 2; j++) {
            //we want to skip "this" cell
            if(i === 0 && j === 0) continue;
            result += matrix.getValue(row + i, column + j) === 1 ? 1 : 0; 
        }
    }
    
    return result;
}

function solve(inputData) {
    //map input to matrix with values 0 (empty cell), 1 (cell with paper)
    let matrix = new Matrix();
    matrix.setMatrix(inputData.split("\n").map(function(line) {
        line = line.replaceAll(EMPTY, "0");
        line = line.replaceAll(PAPER, "1");
        return line.split("").map(function(item) {
            return Number(item);
        });
    }));

    //for each cell check if adjacent cells are filled
    let result = 0;
    for(let row = 0; row < matrix.rows; row++) {
        for(let column = 0; column < matrix.columns; column++) {
            if(matrix.getValue(row, column) > 0 && getFilledAdjentCellsNumber(row, column, matrix) <= MAX_FILLED_ADJECNT_CELLS) {
                result++;
            }
        }
    }

    return result;
}

function main(fileNameList) {
    for(let fileName of fileNameList) {
        InputFile.readFile(fileName);
        let inputData = InputFile.getData();;
        InputFile.clearData();
        
        console.log("File: " + fileName + ", Result: " + solve(inputData));
    }
}

main(["input1.test", "input2.test"]);
