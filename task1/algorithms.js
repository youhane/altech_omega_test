// *
// * *
// * * *
// * * * *
// * * * * *
function triangleA(n){
    console.log("\nTriangle A")
    for (let i = 1; i <= n; i++) {
        let row = '';
        for (let j = 1; j <= i; j++) {
            row += '* ';
        }
        console.log(row);
    }
}

// * * * * *
// * * * *
// * * *
// * *
// *
function triangleB(n){
    console.log("\nTriangle B")
    for (let i = n; i >= 1; i--) {
        let row = '';
        for (let j = 1; j <= i; j++) {
            row += '* ';
        }
        console.log(row);
    }
}

//         *
//       * *
//     * * *
//   * * * *
// * * * * *
function triangleC(n){
    console.log("\nTriangle C")
    for (let i = 1; i <= n; i++) {
        let row = '';
        for (let j = 1; j <= n; j++) {
            if (j <= n - i) {
                row += '  ';
            } else {
                row += '* ';
            }
        }
        console.log(row);
    }
}

//     *
//    * *
//   * * *
//  * * * *
// * * * * *
function triangleD(n){
    console.log("\nTriangle D")
    for (let i = 1; i <= n; i++) {
        let row = '';
        for (let j = 1; j <= n; j++) {
            if (j <= n - i) {
                row += ' ';
            } else {
                row += '* ';
            }
        }
        console.log(row);
    }
}

triangleA(5)
triangleB(5)
triangleC(5)
triangleD(5)

// Write Fibonacci Sequence as an array
function fibonacci(n){
    console.log("\nFibonacci")
    let fib = [0, 1];
    for (let i = 2; i <= n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    console.log(fib);
}

fibonacci(10)

// Reverse array function
function reverseArray(arr){
    console.log("\nReverse Array")
    let newArr = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        newArr.push(arr[i]);
    }
    console.log(newArr);
}

reverseArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

// Count Ocurrences of Duplicates and Print Them
function countDuplicates(arr){
    console.log("\nCount Duplicates")
    let duplicates = {};
    for (let i = 0; i < arr.length; i++) {
        if (duplicates[arr[i]] === undefined) {
            duplicates[arr[i]] = 1;
        } else {
            duplicates[arr[i]]++;
        }
    }
    // print the duplicates
    for (let key in duplicates) {
        if (duplicates[key] > 1) {
            console.log(key + " = " + duplicates[key]);
        }
    }
}

countDuplicates([1,1, 3, 5, 2, 3, 3, 4, 6, 7, 7, 7, 7])

// Find Largest and Smallest Number in an Array
function findMaxMin(arr){
    console.log("\nFind Max and Min")
    let max = arr[0];
    let min = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i]
        }
        if (min > arr[i]) {
            min = arr[i]
        }
    }
    console.log("Largest: " + max);
    console.log("Smallest: " + min);
}

findMaxMin([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])