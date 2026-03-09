const InputFile = require('../../tools/InputFile.js');
const {Matrix} = require('../../tools/Matrix.js');

const EMPTY = ".";
const PAPER = "@";

const EMPTY_CODE = 0;
const PAPER_CODE = 1;
const TO_REMOVE_CODE = 2;

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
        line = line.replaceAll(EMPTY, String(EMPTY_CODE));
        line = line.replaceAll(PAPER, String(PAPER_CODE));
        return line.split("").map(function(item) {
            return Number(item);
        });
    }));

    //for each cell check if adjacent cells are filled
    //mark the ones to be removed as 2
    let result = 0;
    let removedInStep = 0;
    
    do {
        removedInStep = 0;
        for(let row = 0; row < matrix.rows; row++) {
            for(let column = 0; column < matrix.columns; column++) {
                if(matrix.getValue(row, column) > EMPTY_CODE && getFilledAdjentCellsNumber(row, column, matrix) <= MAX_FILLED_ADJECNT_CELLS) {
                    matrix.setValue(row, column, TO_REMOVE_CODE);
                }
            }
        }

        //more expensive approach as we need to travel the matrix twice,
        //but memory-efficent
        for(let row = 0; row < matrix.rows; row++) {
            for(let column = 0; column < matrix.columns; column++) {
                if(matrix.getValue(row, column) === TO_REMOVE_CODE) {
                    matrix.setValue(row, column, EMPTY_CODE);
                    removedInStep++;
                }
            }
        }

        result += removedInStep;
    } while(removedInStep > 0);
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
