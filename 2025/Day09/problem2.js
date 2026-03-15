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
    let pointArray = readProblem(inputData);
    
    //when the rectangle is inside the allowed area?
    //(1) when there are no top points inside of the rectangle
    //(2) when the random point inside of the rectangle is inside the allowed area
    //(3) no edges within the rectangle

    //get all possible rectangles and sort them by the area
    let potentialRectangleArray  = new Array();
    for(let i = 0; i < pointArray.length - 1; i++) {
        for(let j = i + 1; j < pointArray.length; j++) {
            let area = Point.get2DArea(pointArray[i], pointArray[j]);
            potentialRectangleArray.push({
                pointA : pointArray[i],
                pointB : pointArray[j],
                area : area
            });
        }
    }
    potentialRectangleArray.sort(function(a, b) {
        return b.area - a.area;
    });

     //check the point in polygon rule (number of intersections in example direction should be odd)
    //we will check direction: right (column = const)
    let isInside = function (checkX, checkY) {
        let intersectionCount = 0;
        for (let i = 0; i < pointArray.length; i++) {
            let pointA = pointArray[i];
            let pointB = pointArray[(i + 1) % pointArray.length];

            if (pointA.y === pointB.y
                && checkY < pointA.y
                && Math.min(pointA.x, pointB.x) < checkX
                && Math.max(pointA.x, pointB.x) > checkX) {
                intersectionCount++;
            }   
        }
        return (intersectionCount % 2 === 1);
    }
    
    //look for largest rectangle that is within the area
    for(let potentialRectangle of potentialRectangleArray) {
        let minX = Math.min(potentialRectangle.pointA.x, potentialRectangle.pointB.x);
        let maxX = Math.max(potentialRectangle.pointA.x, potentialRectangle.pointB.x);
        let minY = Math.min(potentialRectangle.pointA.y, potentialRectangle.pointB.y);
        let maxY = Math.max(potentialRectangle.pointA.y, potentialRectangle.pointB.y);
        
        //check for any points within the rectangle
        if(pointArray.some(function(item) {
            return item.x > minX && item.x < maxX && item.y > minY && item.y < maxY; 
        })) {
            continue;
        }
        //check if random point is in the allowed area
        if(!isInside(minX + 0.5, minY + 0.5)) continue;

        //check if there are any edges within the rectangle
        let edgeInside = false;
        for (let i = 0; (i < pointArray.length) && (!edgeInside); i++) {
            let pointA = pointArray[i];
            let pointB = pointArray[(i + 1) % pointArray.length];
            
            //horizontal edge
            if(pointA.x === pointB.x) {
                if(pointA.x > minX && pointA.x < maxX
                    && Math.min(pointA.y, pointB.y) <= minY 
                    && Math.max(pointA.y, pointB.y) >= maxY) {
                    edgeInside = true;
                }
            } else {
            //vertical edge
                if(pointA.y > minY && pointA.y < maxY
                    && Math.min(pointA.x, pointB.x) <= minX 
                    && Math.max(pointA.x, pointB.x) >= maxX) {
                    edgeInside = true;
                }
            }
        }
        if(edgeInside) continue;

        return potentialRectangle.area;
    
    }
    return -1;
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
