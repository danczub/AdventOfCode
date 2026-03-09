//Node.js supports the CommonJS module format by default
const fs = require('node:fs');

let data = null;

function readFile(fileName) {
    try {
        this.data = fs.readFileSync(fileName, 'utf8');
    } catch (err) {
        console.error(err);
        return;
    }

    this.data = this.data.replaceAll("\r", "");
}

function getData() {
    return this.data;
}
function getLines() {
    return this.data.split("\n");
}
function clearData() {
    this.data = null;
}

module.exports = {readFile, getData, getLines, clearData};
