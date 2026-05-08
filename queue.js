export { Queue }

class Queue {
    constructor() {
        this.items = []
    }

    enqueue(item) {
        this.items.push(item)
    }

    dequeue() {
        return this.isEmpty() ? null : this.items.shift()
    }

    isEmpty() {
        return this.items.length === 0
    }
}