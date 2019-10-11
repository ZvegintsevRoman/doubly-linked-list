const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        let node = new Node(data);
        if (!this._head) {
            this._head = node;
            this._tail = node;
        } else {
            let temp = this._tail;
            this._tail = node;
            node.prev = temp;
            temp.next = node;
        }
        this.length++;
        return this;
    }

    head() {
        if (this._head) return this._head.data;
        return null;
    }

    tail() {
        if (this._tail) return this._tail.data;
        return null;
    }

    at(index) {
        let current = this._head;
        let pos = 0;
        while (pos != index) {
            current = current.next;
            pos++;
        }
        return current.data;
    }

    insertAt(index, data) {
        let node = new Node(data);
        if (index === this.length) return !!this.append(node);
        let current = this._head;
        let pos = 0;

        while (pos != index) {
            current = current.next;
            pos++;
        }

        let temp = current;
        let prev = temp.prev;
        prev.next = node;
        node.next = temp;
        node.prev = prev;
        temp.next = current;
        this.length++;

        return this;
    }

    isEmpty() {
        return this.length === 0 ? true : false; 
    }

    clear() {       
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        let current = this._head;
        let pos = 1;
        if (index == 1) {
            this._head = this._head.next;
            this._head.prev = null;
        } else {
            while (current) {
                current = current.next;
                if ( current == this._tail ) {
                    this._tail = this._tail.prev;
                    this._tail.next = null;
                } else if (pos == index) {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                    this.length--;
                    break;
                }
                pos++;
            }
        }
        return this;
    }

    reverse() {
        let current = this._head;
        let prev = null;
        let next = null;
        while (current) {
            next = current.next;
            current.next = prev;
            current.prev = next;
            prev = current;
            current = next;
        }
        this._tail = this._head;
        this._head = prev;
        return this;
    }

    indexOf(data) {
        let current = this._head;
        let pos = 0;
        while (current) {
            if (data === current.data) return pos;
            current = current.next;
            pos++;
        }        
        return -1;
    }
}

module.exports = LinkedList;
