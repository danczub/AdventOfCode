//Node.js supports the CommonJS module format by default
class Point {
    #matrix = [];
    #x = null;
    #y = null;
    #z = null;
    #id = null;

    constructor(x, y, z, id) {
        this.#x = x;
        this.#y = y;
        this.#z = z;
        this.#id = id;
    }

    toString() {
        return `x = ${this.#x}, y = ${this.#y}, z = ${this.#z}, id = ${this.#id}`;
    }

    
    get x() {
        return this.#x;
    }
    get y() {
        return this.#y;
    }
    get z() {
        return this.#z;
    }
    get id() {
        return this.#id;
    }

    static getDistance(pointA, pointB) {
        return Math.sqrt((pointA.x - pointB.x) ** 2 + (pointA.y - pointB.y) ** 2 + (pointA.z - pointB.z) ** 2);
    }

    static get2DArea(pointA, pointB) {
        return (Math.abs(pointA.x - pointB.x) + 1) * (Math.abs(pointA.y - pointB.y) + 1);
    }

}

module.exports = {Point};
