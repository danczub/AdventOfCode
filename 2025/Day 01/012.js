/*
 The safe has a dial with only an arrow on it; 
 around the dial are the numbers 0 through 99 in order. As you turn the dial, it makes a small click noise as it reaches each number.
*/
function rotatePass0(start, change, base) {
    let position = (start + change);

    let count = 0
    if(position < 0) {
        //-99 should be counted as 1, but -100 as 2
        count = Math.abs(Math.floor((position-1) / base));
    } else {
        //99 should be counted as 0, but 100 as 1
        count = Math.abs(Math.floor(position / base));
    }
    //if it was already 0 and went to the left, we cannot count it
    if((position < 0) && (start === 0)) {
        count--;
    }

    count += (position === 0) ? 1 : 0;

    position = position % base;
    position = position < 0 ? position + base : position;
    
    return {
        position : position,
        count : count
    };
}

function main(fileName) {
    const fs = require('node:fs');
    let data = null;
    try {
        data = fs.readFileSync(fileName, 'utf8');
    } catch (err) {
        console.error(err);
        return;
    }
    let sequence = data.split("\n");
    
    let position = 50;
    let base = 100;

    let result = 0;

    for(input of sequence) {
        let change = (input[0] === "L" ? -1 : 1) * Number(input.slice(1));

        let functionResult = rotatePass0(position, change, base);
        position = functionResult.position;
        result += functionResult.count;
        //console.log("" + change + ":\t" + position + "\t" + result);
    }
    console.log("The password: " + result);
}


main("0111.txt");
main("0112.txt");

