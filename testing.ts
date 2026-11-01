// Testing
// Your name[s] here.

// Super simple testing "framework" by Lea: this will print the results of tests in a (hopefully) easy-to-read way. You should not modify this function.
interface Function { // apparently TS doesn't include this by default, which is a little wild
  readonly name: string;
}
function test<I,O>(functionToTest:(input:I)=>O & {name:string}, input: I, intendedOutput: O) : boolean {
    // check the actual output
    let actualOutput : O = functionToTest(input);

    // check whether that output matches the intended one
    let passing : boolean = intendedOutput == actualOutput;

    // print it out, with some formatting for readability
    if (passing) console.log(functionToTest.name+"("+JSON.stringify(input)+"): "+actualOutput+" ✅");
    else console.log(functionToTest.name+"("+JSON.stringify(input)+"): "+actualOutput+" ❌ (intended output: "+intendedOutput+")");

    return passing;
}

// To use the test function, you call it with: 1. the name of the function to test, 2. what input (argument) to test with, and 3. what output (return value) *should* happen. See line 42 for an example.


// ============================ isPalindrome ====================================

// This function should check whether the input is a palindrome. 
// If it is, it should return true. 
// If it isn't, it should return false.
// If it is impossible to tell, it should return undefined.
// function isPalindrome(input: any): any {
//     let reversed = '';
//     for (let i = 0; i < input.length; i++) {
//         reversed = input[i] + reversed;
//     }
//     return input == reversed;
// }

// ------------- Tests for isPalindrome ----------------------- 
// TODO: write more test cases for isPalindrome.
// At least three should be failing (tests for which the "should" and "actual" results are different) with the above code. 
test(isPalindrome, "racecar", true);

//MJ + Elizabeth Tests
test(isPalindrome, "bug", false); //example, passes
test(isPalindrome, "level", true); //example, passes
test(isPalindrome, 101, true); //example, passes
test(isPalindrome, true, undefined);// example, passes
test(isPalindrome, "", true); // example, passes
test(isPalindrome, null, undefined); // example, passes
test(isPalindrome, ["r", "a", "r"], undefined); // example, passes

test(isPalindrome, "Elizabeth", true); //example, fails
test(isPalindrome, "taco cat", true);  //example, fails
test(isPalindrome, "Was it a rat I saw?", true); //example, fails


// ------------- Improved isPalindrome code ------------------- 
// TODO: Comment out the original isPalindrome above. Write an improved version of isPalindrome for which the tests all pass. Remember that the improved version should have actual types [that is, not "any"] for the argument and return values.

function isPalindrome(input: unknown): boolean | undefined { //input must be a string now. adding undefined here so the function can correctly return "undefined" if 
    if (typeof input !== "string" && typeof input !== "number") { // now it can only be a number or a string. i chose to allow numbers since 121 seemed like it should be counted *shrug*
        return undefined; //if it isn't a string or number, it is undefined
    }
    let text = String(input).toLowerCase(); //turn the input into a string (so 12321 -> "12321") also turns to lowercase to "Racecar" still counts
    let reversed = ""; //now use the same from above to let reversed be an empty string at the moment

    for (let i = 0; i < text.length; i++) { //for loop iterates through the entire string
        reversed = text[i] + reversed;  //text[i] gets the letter/num at position i. Putting it before reversed adds that character to the front 
    }
    return text === reversed; //if it is not undefined, then return the boolean result
}

// ============================== countVowels ==================================
// This function should return the number of vowels in the input. 
// function countVowels(input: any): number {
//     let input = String(input); //turns the input into a string, even if there are numbers
//     let count = 0;
//     input = input.toLowerCase(); //this works as long as u make sure to case the input to all lowercase, since that's what the if statement checks for
//     for (let i = 0; i < input.length; i++) {
//         if (input[i] === 'a' || input[i] === 'e' || input[i] === 'i' || input[i] === 'o' || input[i] === 'u') {
//             count++;
//         }
//     }
//     return count;
// }

// ------------- Tests for countVowels: --------------------------
// TODO: write more test cases for countVowels.
// At least three should be failing (tests for which the "should" and "actual" results are different) with the above code. 
test(countVowels, "banana", 3); // example; passes

// MJ and Eliz Tests
test(countVowels, 1234, 0); //example; passes
test(countVowels, "Elizabeth", 4); //example; passes
test(countVowels, "MJ", 0); //example; passes
test(countVowels, true, undefined); //example; passes
test(countVowels, "", 0); //example; passes
test(countVowels, "rhythms", 0); //example; passes
test(countVowels, "     ", 0); //example; passes
test(countVowels, "123!? 🦊", 0); //example; passes

test(countVowels, "café", 2); //example: fails
test(countVowels, "Subaru", 0); //example; fails
test(countVowels, "Makaela", 5); //example; fails

// ------------- Improved countVowels code -----------------------
// TODO: Comment out the original countVowels above. Write an improved version of countVowels for which the tests all pass. Remember that the improved version should have actual types [that is, not "any"] for the argument and return values.
function countVowels(input: unknown): number | undefined { // initially we thought it should just accept strings and numbers and just stringify them, but while testing we realized that the boolean true would then be read as 2 vowels. So we changed it to unknown and then will deal with cases later
    if (typeof input !== "string" && typeof input !== "number") { //it's later! now we can only accept strings and numbers instead of just stringifying everything
        return undefined; //otherwise it's undefined
    }
    let text = String(input).toLowerCase();//needs to turn to lowercase since that's what the for statement checks for
    let count = 0;

    for (let i = 0; i < text.length; i++) { // elizabeth was annoyed by the length of the previous if statement, so she shortened it with .includes
        if ("aeiou".includes(text[i])) {
            count++;
        }
    }
    return count;
} 

// ============================== checkIfSorted ==================================
// This function should check whether a list is in order (e.g. numbers are sorted from low to high). 
// let checkIfSorted : (list: any) => any = (list) => {
//     for (let i = 0; i < list.length-1; i++) {
//         if (!(list[i] < list[i+1])) { // if item i is not less than item i+1...
//             return false;
//         }
//     }
//     return true;
// }

// ------------- Improved checkIfSorted code -----------------------
// TODO: Comment out the original checkIfSorted above. Write an improved version of checkIfSorted for which the tests all pass. Remember that the improved version should have actual types [that is, not "any"] for the argument and return values.
let checkIfSorted = (list: unknown): boolean | undefined => { //so we can return undefined if someone inputs a different type, the list is unknwon for now
    if (!Array.isArray(list) || //return undefined if it isn't an array or contains a non-number.
        !list.every(item => typeof item === "number")) {
        return undefined;
    }
    for (let i = 0; i < list.length - 1; i++) {
        if (list[i] > list[i + 1]) { //changed the logic slightly to account for [1,1,2,3] to count as sorted. Now it only rejects a list when a number decreases.
            return false;
        }
    }

    return true;
};

// ------------- Tests for checkIfSorted: --------------------------
// TODO: write more test cases for checkIfSorted.
// At least three should be failing (tests for which the "should" and "actual" results are different) with the above code. 
test(checkIfSorted, [1,2,3], true); // example; passes
 
//MJ + Elizabeth Tests
test(checkIfSorted, [1, 2, 3], true); //passes
test(checkIfSorted, [-8, -3, 0], true);//passes
test(checkIfSorted, [1, 1, 2], true);//passes
test(checkIfSorted, [7, 7, 7], true);//passes
test(checkIfSorted, [3, 2, 1], false);//passes
test(checkIfSorted, [1, 5, 2], false);//passes
test(checkIfSorted, [], true);//passes
test(checkIfSorted, [42], true);//passes
test(checkIfSorted, true, undefined);//passes
test(checkIfSorted, 123, undefined);//passes
test(checkIfSorted, "123", undefined);//passes
test(checkIfSorted, [1, "two", 3], undefined);//passes
test(checkIfSorted, [1, false, 3], undefined);//passes

test(checkIfSorted, [2, 4, 6, 8], false); //fails
test(checkIfSorted, [3, 3, 3], false); //fails
test(checkIfSorted, "🦊", true); //fails

// ========================= Credits =======================================
// As always: list any resources you used to complete this homework, such as your peers, online or printed documentation, text sources, TAs, office hours.

// Elizabeth had been very familiar with a lot of these little puzzles from freshman year CS lab class 🫠 so it was actually helpful and she could teach MJ along the way.
// Also, Elizabeth used this resource to figure out how to shorten the contains vowels functionhttps://www.geeksforgeeks.org/typescript/typescript-array-includes-method/