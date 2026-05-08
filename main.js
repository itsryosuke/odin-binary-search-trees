import { Tree } from "./bst.js";

let array = [1, 7, 69, 23, 4, 9, 4, 3, 80, 7, 9, 67, 8, 5, 67]
let test = new Tree(array);
console.log(test.isBalanced())
prettyPrint(test.root)

// Print out all elements in level, pre, post, and in order
let printArray = []
test.levelOrderForEach((item) => printArray.push(item))
console.log(printArray)
printArray = []
test.preOrderForEach((item) => printArray.push(item))
console.log(printArray)
printArray = []
test.postOrderForEach((item) => printArray.push(item))
console.log(printArray)
printArray = []
test.inOrderForEach((item) => printArray.push(item))
console.log(printArray)
// Print out all elements in level, pre, post, and in order

test.insert(167)
test.insert(120)
test.insert(190)
console.log(test.isBalanced())
prettyPrint(test.root)
test.reBalance()
console.log(test.isBalanced())
prettyPrint(test.root)

// Print out all elements in level, pre, post, and in order
printArray = []
test.levelOrderForEach((item) => printArray.push(item))
console.log(printArray)
printArray = []
test.preOrderForEach((item) => printArray.push(item))
console.log(printArray)
printArray = []
test.postOrderForEach((item) => printArray.push(item))
console.log(printArray)
printArray = []
test.inOrderForEach((item) => printArray.push(item))
console.log(printArray)
// Print out all elements in level, pre, post, and in order

function prettyPrint(node, prefix = '', isLeft = true) {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}