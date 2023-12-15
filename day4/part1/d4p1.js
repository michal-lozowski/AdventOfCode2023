const fs = require('fs');

fs.readFile("realinput.txt", 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const inputText = data;
    let inputLines = inputText.split("\r\n");

    let numbersPattern = /\d+/g
    let finalCounter = 0;

    inputLines.forEach(element => {
        let colonEncountered = false;
        let pipeEncountered = false;
        let winningNumbers = [];
        let numberBucket = "";
        let counter = 0;
        for (let i = 0; i < element.length; i++) {
            if (element[i] === ":") colonEncountered = true
            if (element[i] === "|") pipeEncountered = true
            if (colonEncountered && Number.isInteger(parseInt(element[i]))) {
                numberBucket = numberBucket + element[i]
            }
            if ((!pipeEncountered) && (numberBucket.length > 0) && !Number.isInteger(parseInt(element[i]))) {
                winningNumbers.push(parseInt(numberBucket))
                numberBucket = ""
            }
            if (pipeEncountered && (numberBucket.length > 0) && (!Number.isInteger(parseInt(element[i])) || (i === element.length - 1))) {
                if (winningNumbers.includes(parseInt(numberBucket))) {
                    if (counter === 0) {
                        counter = 1
                    } else {
                        counter = counter * 2
                    }
                }
                numberBucket = ""
            }
        }
        finalCounter = finalCounter + counter
    })
console.log(finalCounter)
})