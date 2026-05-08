import { sort } from "./mergeSort.js";
import { Queue } from "./queue.js";
export { Tree };

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.#buildTree(array);
    }

    #buildTree(array) {
        function recursiveBuild(arr, start, end) {
            if(start > end) return null

            let mid = Math.floor((start + end) / 2);
            let root = new Node(arr[mid]);

            root.left = recursiveBuild(arr, start, mid - 1);
            root.right = recursiveBuild(arr, mid + 1, end);

            return root
        }
        
        let sortedArray = sort(array);
        return recursiveBuild(sortedArray, 0, sortedArray.length - 1)
    }
    
    includes(value) {
        if(this.root === null) return false
        if(this.root.data === value) return true

        let current = this.root;

        while(current.data !== value) {
            if(value > current.data) {
                if(current.right === null) return false
                current = current.right
            }
            else {
                if(current.left === null) return false
                current = current.left
            }
        }
        return true
    }
    
    insert(value) {
        if(this.root === null) {
            this.root = new Node(value)
            return
        }
        let current = this.root;

        while(current.data !== value) {
            if(value > current.data) {
                if(current.right === null) current.right = new Node(value);
                current = current.right
            }
            else {
                if(current.left === null) current.left = new Node(value);
                current = current.left
            }
        }
    }

    deleteItem(value) {
        function getSuccessor(curr) {
            curr = curr.right;
            while (curr !== null && curr.left !== null) {
                curr = curr.left;
            }
                return curr;
        }
        
        function recursiveDelete(root, val) {
            if (root === null) return root;

            if(val > root.data) root.right = recursiveDelete(root.right, val);
            else if(val < root.data) root.left = recursiveDelete(root.left, val);
            else {
                if(root.left === null) return root.right
                if(root.right === null) return root.left

                const successor = getSuccessor(root);
                root.data = successor.data;
                root.right = recursiveDelete(root.right, successor.data);
            }
            return root
        }

        recursiveDelete(this.root, value);
    }

    levelOrderForEach(callback) {
        if(!callback) throw new Error("A callback function is required!")
        if(this.root === null) return

        let queue = new Queue;
        queue.enqueue(this.root);
        
        while(!queue.isEmpty()) {
            let current = queue.dequeue();
            callback(current.data);
            if(current.left !== null) queue.enqueue(current.left);
            if(current.right !== null) queue.enqueue(current.right);
        }
    }

    inOrderForEach(callback) {
        if(!callback) throw new Error("A callback function is required!")

        function recursiveForEach(root) {
            if(root === null) return
            recursiveForEach(root.left);
            callback(root.data);
            recursiveForEach(root.right);
        }

        recursiveForEach(this.root);
    }

    preOrderForEach(callback) {
        if(!callback) throw new Error("A callback function is required!")
            
        function recursiveForEach(root) {
            if(root === null) return
            callback(root.data);
            recursiveForEach(root.left);
            recursiveForEach(root.right);
        }

        recursiveForEach(this.root);
    }

    postOrderForEach(callback) {
        if(!callback) throw new Error("A callback function is required!")

        function recursiveForEach(root) {
            if(root === null) return
            recursiveForEach(root.left);
            recursiveForEach(root.right);
            callback(root.data);
        }

        recursiveForEach(this.root);
    }

    height(value) {
        if(this.root === null) return undefined
        let current = this.root;

        while(current.data !== value) {
            if(value > current.data) {
                if(current.right === null) return undefined
                current = current.right
            }
            else {
                if(current.left === null) return undefined
                current = current.left
            }
        }

        function recursiveHeight(root) {
            if(root === null) return -1

            let leftHeight = recursiveHeight(root.left);
            let rightHeight = recursiveHeight(root.right);

            return Math.max(leftHeight, rightHeight) + 1
        }

        return recursiveHeight(current);
    }

    depth(value) {
        if(this.root === null) return undefined
        let current = this.root;
        let counter = 0;

        while(current.data !== value) {
            if(value > current.data) {
                if(current.right === null) return undefined
                current = current.right
                counter++
            }
            else {
                if(current.left === null) return undefined
                current = current.left
                counter++
            }
        }

        return counter
    }

    isBalanced() {
        function recursiveBalance(root) {
            if (root === null) return 0

            let leftHeight = recursiveBalance(root.left);
            let rightHeight = recursiveBalance(root.right);

            if(leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) return -1
            
            return Math.max(leftHeight, rightHeight) + 1
        }
        return recursiveBalance(this.root) > 0
    }

    reBalance() {
        let array = [];
        this.inOrderForEach((item) => array.push(item));
        this.root = this.#buildTree(array);
    }
}