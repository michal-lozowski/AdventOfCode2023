const fs = require('fs');

fs.readFile("testinput.txt", 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const inputText = data;
    let inputArray = inputText.split("\r\n");
    inputArray = inputArray.map(inputLine => {
        let charactersArray = [...inputLine];
        let lastDigit;
        let firstDigit = 12345;
        for (let i = 0; i < charactersArray.length; i++) {
            const characterInQuestion = charactersArray[i];
            if ((!isNaN(characterInQuestion))) lastDigit = characterInQuestion;
            if (firstDigit == 12345 && (!isNaN(characterInQuestion))) {
                firstDigit = characterInQuestion;
            };
            console.log("First Digit: " + firstDigit + " Last Digit: " + lastDigit)
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