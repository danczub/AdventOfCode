const InputFile = require('../../tools/InputFile.js');
const {Point} = require('../../tools/Point.js');

function readProblem(inputData) {
    let inputLineList = inputData.split("\n");

    let pointArray = new Array();
    let id = 0;
    for(let line of inputLineList) {
        let coordinates = line.split(",");
        let point = new Point(Number(coordinates[0]), Number(coordinates[1]), Number(coordinates[2]), id++);
        pointArray.push(point);
    }

    return pointArray;

}

function solve(inputData, inputParameter) {
    let pointArray = readProblem(inputData);
    let distanceArray = new Array();
    
    //count distance between every pair
    for(let i  = 0; i < pointArray.length; i++) {
        for(let j = i + 1; j < pointArray.length; j++) {
            distanceArray.push({
                pointA : pointArray[i],
                pointB : pointArray[j],
                distance : Point.getDistance(pointArray[i], pointArray[j])
            });
        }
    }

    //sort by shortest distance
    distanceArray.sort(function(itemA, itemB) {
        return itemA.distance - itemB.distance;
    });

    //array that points to the root of the group
    let connectionArray = new Array(pointArray.length);
    connectionArray.fill(-1);
    
    var findRoot = function(elementIndex) {
        let result = elementIndex;
        while (connectionArray[result] !== -1) {
            result = connectionArray[result];
        }
        return result;
    };

    //map containing sets of connected points. root element is map index
    let groupMap = new Map();

    //make X shortest connections
    for(let i = 0; i < inputParameter; i++) {
        let pair = distanceArray[i];
        let pointA = pair.pointA;
        let pointB = pair.pointB;

        //get root
        let rootAid = findRoot(pointA.id);
        let rootBid = findRoot(pointB.id);

        //already connected
        if (rootAid === rootBid) continue;

        //connect trees
        connectionArray[rootBid] = rootAid;
        if(!groupMap.get(rootAid)) {
            groupMap.set(rootAid, new Set([rootAid]));
        }
        if(!groupMap.get(rootBid)) {
            groupMap.set(rootBid, new Set([rootBid]));
        }
        groupMap.set(rootAid, groupMap.get(rootAid).union(groupMap.get(rootBid)));
        groupMap.delete(rootBid);
    }
    
    let groupSizes = new Array();
    for(let set of groupMap.values()) {
        groupSizes.push(set.size);
    }
    groupSizes.sort(function(a, b) {
        return b - a;
    });
    
    let result = 1;
    
    for(let i = 0; i < Math.min(3, groupSizes.length); i++) {
        result = result * groupSizes[i];
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
    {fileName : "input1.test", input : 10}, 
    {fileName : "input2.test", input : 1000}
]);
