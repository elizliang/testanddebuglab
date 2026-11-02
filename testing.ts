// Testing
// Elizabeth Hudak and Makaela Jarnagin

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
//Always worked
test(isPalindrome, "racecar", true);
test(isPalindrome, "12321", true);
test(isPalindrome, "été", true);
test(isPalindrome, "", true);

//failed in first version
test(isPalindrome, "race car", true); //according to palindrome logic that we found, spaces should not count so this should be a palindrome
test(isPalindrome, "RaceCar", true); //we decided capitalization should definiteley not interrupt the palindrome
test(isPalindrome, "😇😇", true); //the first didn't account for emojis
test(isPalindrome, "A man, a plan, a canal: Panama!", true); //also apparently puntuation doesn't count so we fixed that

//limbo:
test(isPalindrome, "!<:<!", true); //while we thought that "<>??><" should count as a palindrome, we couldn't find a way without cheating to productively discriminate between symbol patterns and punctuation in sentence like palindromes like the panama one. 
//Ultimately we thought it would be more important to ignore symbols. This passes as true, but only bc the function turns it into an empty string

// ------------- Improved isPalindrome code ------------------- 
// TODO: Comment out the original isPalindrome above. Write an improved version of isPalindrome for which the tests all pass. Remember that the improved version should have actual types [that is, not "any"] for the argument and return values.

function isPalindrome(input: unknown): boolean | undefined { //keeping input as unknown so that we can handle different inputs in different ways (rejecting vs. converting to string).
    const normalized = String(input).normalize('NFC').toLowerCase().replace(/[^\p{L}\p{N}]/gu, ''); //we looked up how to handle emojis and other unicode characters and discovered these ways to standardize inputs for comparison
    // we don't 100% know what these work (what is Canonical Decomposition, followed by Canonical Composition ahh), but we know normalize allows characters "to produce a form of the string that will be the same for all canonically equivalent strings." (MDN) so we can support accent marks
    // to.LowerCase just turns everything lowercase so Aka reads as a palindrome. This one we knew. 
    // .replace(/[^\p{L}\p{N}]/gu, '') is something we just looked up to find a way to handle puntuation and spaces.

    const characters = Array.from(normalized); //okay then we can split into Unicode code points (for emojis, etc) and turn it into an array for comparison
     return normalized === characters.reverse().join(''); // now we can just reverse the characters, join them into a string, and compare
}

// ============================== countVowels ==================================
// This function should return the number of vowels in the input. 
// function countVowels(input: any): any {
//     let count = 0;
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
test(countVowels, 1234, undefined); //wait orginally we wanted this to come back as 0 but we changed it to only accept strings.  
test(countVowels, "Elizabeth", 4); //failed in first version bc it was case sensitive (didn't count caps as vowels)
test(countVowels, "MJ", 0);
test(countVowels, true, undefined); //failed in first version 
test(countVowels, "", 0); 
test(countVowels, "rhythms", 0); 
test(countVowels, "     ", 0); 
test(countVowels, "123!? 🦊", 0); 
test(countVowels, "café", 2); //failed in first version bc of accents
test(countVowels, "naïve", 3);//failed in first version bc of accents
test(countVowels, "AEIOU", 5);//failed in first version bc it was case sensitive (didn't count caps as vowels)
test(countVowels, "rhythm", 0);
test(countVowels, "", 0);

// ------------- Improved countVowels code -----------------------
// TODO: Comment out the original countVowels above. Write an improved version of countVowels for which the tests all pass. Remember that the improved version should have actual types [that is, not "any"] for the argument and return values.
function countVowels(input: string): number | undefined { //now it only accepts a string, which we thought was fair and is cleaner than accepting a bunch of types and having to make difficult discrimination (eliz thought of arrays and stuff which we could stringify but then that's not fair bc if you had the boolean true, it shouldnt be counted as two vowels since that's not the point of a boolean value)
   if (typeof input !== 'string') { // At first, we thought we return undefined to handle this, but thought this message was more helpful to theoretical users
        return undefined;
    }
    const text = String(input).toLowerCase().normalize("NFD"); //convert the string input to lowercase (since lowercase vowels is what the for loop checks for) and normalize with NFD like we did in the palindrome function to allow accented vowels to count
    let count = 0; 

    for (const letter of text) {
        if ("aeiou".includes(letter)) { //elizabeth got annoyed at how long the previous if statement was, so she shortened it with .includes 
            count++;
        }
    }
    return count;
} 

// ============================== checkIfSorted ==================================
//This function should check whether a list is in order (e.g. numbers are sorted from low to high). 
// let checkIfSorted : (list: any) => any = (list) => {
//     for (let i = 0; i < list.length-1; i++) {
//         if (!(list[i] < list[i+1])) { // if item i is not less than item i+1...
//             return false;
//         }
//     }
//     return true;
// }
// ------------- Tests for checkIfSorted: --------------------------
// TODO: write more test cases for checkIfSorted.
// At least three should be failing (tests for which the "should" and "actual" results are different) with the above code. 
test(checkIfSorted, [1,2,3], true); // example; passes

//MJ + Elizabeth Tests
test(checkIfSorted, [1, 2, 3], true); 
test(checkIfSorted, [-8, -3, 0], true);
test(checkIfSorted, [1, 1, 2], true);// failed on first try
test(checkIfSorted, [7, 7, 7], true); // failed on first try
test(checkIfSorted, [3, 2, 1], false);
test(checkIfSorted, [1, 5, 2], false);
test(checkIfSorted, [], true);
test(checkIfSorted, [42], true);
test(checkIfSorted, true, undefined); // failed on first try
test(checkIfSorted, 123, undefined); // failed on first try
test(checkIfSorted, "123", undefined); // failed on first try
test(checkIfSorted, [1, "two", 3], undefined); // failed on first try
test(checkIfSorted, [1, false, 3], undefined); // failed on first try
test(checkIfSorted, [2, 4, 6, 8], true);
test(checkIfSorted, [3, 3, 3], true); // failed on first try

// ------------- Improved checkIfSorted code -----------------------
// TODO: Comment out the original checkIfSorted above. Write an improved version of checkIfSorted for which the tests all pass. Remember that the improved version should have actual types [that is, not "any"] for the argument and return values.
function checkIfSorted(list: unknown): boolean | undefined { //so we can return undefined if someone inputs a different type, the list is unknown for now
    // also changed the the syntax because the order didn't work before
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
}

// ========================= Credits =======================================
// As always: list any resources you used to complete this homework, such as your peers, online or printed documentation, text sources, TAs, office hours.

// Elizabeth had been very familiar with a lot of these little puzzles from freshman year CS lab class 🫠 so it was actually helpful and she could teach MJ along the way.
// Also, Elizabeth used this resource to figure out how to shorten the contains vowels functionhttps://www.geeksforgeeks.org/typescript/typescript-array-includes-method/
// Other resources:
// https://schalkneethling.com/posts/unicode-character-class-escapes-a-javascript-hidden-superpower/
//https://www.ituonline.com/it-glossary/palindrome/
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize help understand normalizing