const fs = require('fs');

fs.readFile("realinput.txt", 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const inputText = data;
    let inputArray = inputText.split("\r\n");
    inputArray = inputArray.map(inputLine => {
        let charactersArray = [...inputLine];
        //console.log("Current Characters Array: " + charactersArray);

        const numberMap = {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9
        };

        /* 
        Iterates through the input line, storing each character in 'charactersBucket'
        Checks if a spelled digit is at the end of 'charactersBucket'
        If found, replaces the pre-last letter with the digit in 'charactersArray' 
        The last character remains unchanged to handle overlaps, e.g., 'eighthree'
        */

        let charactersBucket = "";
        for (i = 0; i < charactersArray.length; i++) {
            charactersBucket = charactersBucket + charactersArray[i];
            //console.log("Characters Bucket: " + charactersBucket);
            let spelledDigit = "";
            for (j = charactersBucket.length - 1; j >= 0; j--) {

                spelledDigit = charactersBucket[j] + spelledDigit;
                //console.log("Spelled Digit: " + spelledDigit);
                if (numberMap.hasOwnProperty(spelledDigit)) {
                    charactersArray.splice(i - 1, 1, numberMap[spelledDigit])
                    //console.log("Characters Array After Splice: " + charactersArray);
                }
            }
        }


        /* 
        firstDigit == 12345 means no real first digit has been stored in it yet
        */

        let lastDigit;
        let firstDigit = 12345;
        for (let i = 0; i < charactersArray.length; i++) {
            const characterInQuestion = charactersArray[i];
            if ((!isNaN(characterInQuestion))) lastDigit = characterInQuestion;
            if (firstDigit == 12345 && (!isNaN(characterInQuestion))) {
                firstDigit = characterInQuestion;
            };
            //console.log("First Digit: " + firstDigit + " Last Digit: " + lastDigit)
        }
        charactersArray = firstDigit.toString() + lastDigit.toString();
        console.log(charactersArray);
        return charactersArray;
    });


    let finalCounter = 0;
    for (let i = 0; i < inputArray.length; i++) {
        finalCounter = finalCounter + parseInt(inputArray[i]);
    }
    console.log("Final Sum: " + finalCounter);
});