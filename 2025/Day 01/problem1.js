/*
 The safe has a dial with only an arrow on it; 
 around the dial are the numbers 0 through 99 in order. 
 As you turn the dial, it makes a small click noise as it reaches each number.
*/
function rotate(start, change, base) {
    let position = (start + change) % base;
    return position < 0 ? position + base : position;
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
        position = rotate(position, change, base);
        
        result += position === 0 ? 1 : 0;
    }
    console.log("The password: " + result);
}


main("input1.test");
main("input2.test");

