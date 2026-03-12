//Node.js supports the CommonJS module format by default
class Queue {
    #queue = null;
    #offset = null;

    constructor() {
        this.#queue = new Array();
        this.#offset = 0;
    }

    enqueue(element) {
        this.#queue.push(element);
    }
    push(element) {
        this.enqueue(element);
    }

    dequeue() {
        if(this.#queue.length === 0) return null;
        const result = this.#queue[this.#offset];
        this.#offset++;

        //if offset is bigger than half of the queue length, reindex
        if(this.#offset * 2 > this.#queue.length) {
            this.#queue = this.#queue.slice(this.#offset);
            this.#offset = 0;
        }
        return result;
    }

    pop() {
        return this.dequeue();
    }

    size() {
        return this.#queue.length - this.#offset;
    }
}

module.exports = {Queue};
