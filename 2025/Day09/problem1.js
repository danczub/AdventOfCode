const InputFile = require('../../tools/InputFile.js');
const {Point} = require('../../tools/Point.js');

function readProblem(inputData) {
    let inputLineList = inputData.split("\n");

    let pointArray = new Array();
    let id = 0;
    for(let line of inputLineList) {
        let coordinates = line.split(",");
        let point = new Point(Number(coordinates[0]), Number(coordinates[1]), null, id++);
        pointArray.push(point);
    }

    return pointArray;

}

function solve(inputData, inputParameter) {
    let result = 0;
    let pointArray = readProblem(inputData);

    for(let i = 0; i < pointArray.length - 1; i++) {
        for(let j = i + 1; j < pointArray.length; j++) {
            let area = Point.get2DArea(pointArray[i], pointArray[j]);
            result  = Math.max(result, area);
        }
    }
    
    return result;
}

function main(inputList) {
    for(let input of inputList) {
        InputFile.readFile(input.fileName);
        let inputData = InputFile.getData();
        InputFile.clearData();
        
        let startTime = new Date();
        let solution = solve(inputData, input.input);
        let executionTime = (new Date()).getTime() - startTime.getTime();
        console.log("File: " + input.fileName + ", Result: " + solution + ", Execution time: " + executionTime);
    }
}

main([
    {fileName : "input1.test", input : null},
    {fileName : "input2.test", input : null}
]);
