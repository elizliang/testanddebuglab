// Debugging
// Elizabeth Hudak

// =============== printNumbers ============================
let printNumbers : () => void = () => {
    for (let i=0; i<10; i++) {
        if (i==0) { //the if statement previously lacked a comparison operator and assigned i to 0 meaning that it would run forever. 
            console.log("Zero!");
        }
        else {
            console.log(i);
        }
    }
}

// Intended console output:
    // Zero!
    // 1
    // 2
    // 3
    // 4
    // 5
    // 6
    // 7
    // 8
    // 9
    // 10
// Intended console output:
    // 0
    // 0
    // 0
    // 0
    // 0
    // 0
    // [forever]
// Tip: hit ctrl-c to stop Node from running.
printNumbers();


// =============== announceFriendshipWith ============================
let announceFriendshipWith: (friend: string) => void = (friendName) => {
    console.log("My best friend is " + friendName + "!"); //changed this to a print statement with the variable friendName instead of hard coding it at the beginning of the file.
};

// Intended console output:
    // My best friend is Dylan!
announceFriendshipWith("Dylan");

// Intended console output:
    // My best friend is Robin!
announceFriendshipWith("Robin");


// =============== countItemsInList ============================
let countItemsInList : (list: Array<string>, targetItem: string) => number = (list, targetItem) => {
    let count: number = 0; //moved count out of the for loop so it doesn't just reset every time. 
    //let found : boolean = false; you don't need this found boolean. you can just use the count to determine if the targetItem isn't in the list since it will be 0 anyway
    for (let i = 0; i < list.length; i++) {
            if (list[i] === targetItem) {
                count++;
            }
        }

        if (count === 0) { //now instead of returning a boolean, it just checks if the count counted zero matches.
            console.log("Checked " + list.length + " items and couldn't find " + targetItem + ".");
        }
        return count;
    };


// Intended console output:
    // Checked 3 items and couldn't find cheese.
countItemsInList(["bread", "peanut butter", "jelly"], "cheese");


// ============= containsDuplicates =========================
let containsDuplicates : (list: Array<string | number | boolean>) => boolean = (list) => {
    for (let i=0; i<list.length; i++) { // for each thing in the list...
        let thisThing = list[i];
        for (let j=0; j<i; j++) { // J can't be <= i because it lets an item be compared with itself since they're working from the same exact list.
            let thatThing = list[j];
            if (thisThing == thatThing) { 
                return true;
            }
        }
    }
    return false;
}

// Intended console output:
    // true
console.log(containsDuplicates([1,1,3]));

// Intended console output:
    // false
console.log(containsDuplicates([1,2,3]));

