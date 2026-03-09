//Node.js supports the CommonJS module format by default
class Matrix {
    #matrix = [];
    #rowLength = 0;
    #columnLength = 0;

    constructor(rows, columns) {
        rows = rows ? rows : 0;
        columns = columns ? columns : 0;
        this.#matrix = new Array(rows);
        for(let i = 0; i < rows; i++) {
            this.#matrix[i] = new Array(columns);
        }

        this.#rowLength = rows;
        this.#columnLength = columns;
    }

    setMatrix(matrix) {
        this.#matrix = matrix;

        this.#rowLength = matrix && matrix.length ? matrix.length : 0;
        this.#columnLength = matrix && matrix[0] && matrix[0].length ? matrix[0].length : 0;
    }

    getMatrix() {
        return this.#matrix;
    }

    getValue(x, y) {
        if(x < 0 || x > this.#rowLength - 1) return -1;
        if(y < 0 || y > this.#columnLength - 1) return -1;
        return this.#matrix[x][y];
    }

    setValue(x, y, value) {
        if(x < 0 || x > this.#rowLength - 1) return -1;
        if(y < 0 || y > this.#columnLength - 1) return -1;
        this.#matrix[x][y] = value;
        return 0;
    }

    toString() {
        return this.#matrix.map(function(row) {
            return row.join("");
        }).join("\n");
    }

    toInfoString() {
        return "Rows: " + this.#rowLength + ", Columns: " + this.#columnLength;
    }

    get rows() {
        return this.#rowLength;
    }
    get columns() {
        return this.#columnLength;
    }
}

module.exports = {Matrix};
