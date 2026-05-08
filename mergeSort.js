export { sort };

function mergeSort(arr) {
    let sortedArray = [];
    if (arr.length <= 1) return arr

    else {
        let halfLength = Math.ceil(arr.length / 2);
        let leftSide = arr.slice(0, halfLength);
        let rightSide = arr.slice(halfLength);
        sortedArray = merge(mergeSort(leftSide), mergeSort(rightSide));
    }

    function merge(arr1, arr2) {
        let mergedArray = [];
        while (arr1.length > 0 || arr2.length > 0) {
            if (arr1.length == 0) {
                mergedArray.push(...arr2);
                break
            }
            else if (arr2.length == 0) {
                mergedArray.push(...arr1);
                break
            }
            else {
                if (arr1[0] <= arr2[0]) mergedArray.push(arr1.shift())
                    else mergedArray.push(arr2.shift())
            }
        }
        return mergedArray
    }

    return sortedArray
}

function removeDuplicates(array) {
    if(array.length == 0 || array.length == 1) return array
    let newArray = [];
    newArray.push(array[0]);
    for(let i = 1; i < array.length; i++) {
        if(!newArray.includes(array[i])) {
            newArray.push(array[i])
        }
    }
    return newArray
}

function sort(array) {
    return removeDuplicates(mergeSort(array));
}