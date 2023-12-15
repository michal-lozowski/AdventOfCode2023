const fs = require('fs');

fs.readFile("realinput.txt", 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const inputText = data;
    let inputLines = inputText.split("\r\n");

    let finalCounter = 0;

    let cardCopies = [];
    for (let i = 1; i <= inputLines.length; i++) {
        cardCopies[i] = 1;
    }

    let cardNumber = 0;
    inputLines.forEach(element => {
        let pipeEncountered = false;
        let winningNumbers = [];
        let numberBucket = "";
        let matches = 0;
        for (let i = 0; i < element.length; i++) {
            if (element[i] === "|") pipeEncountered = true
            if (Number.isInteger(parseInt(element[i]))) {
                numberBucket = numberBucket + element[i]
            }
            if (element[i] === ":") {
                cardNumber = parseInt(numberBucket);
                numberBucket = "";
            }
            if ((!pipeEncountered) && (numberBucket.length > 0) && !Number.isInteger(parseInt(element[i]))) {
                winningNumbers.push(parseInt(numberBucket))
                numberBucket = ""
            }
            if (pipeEncountered && (numberBucket.length > 0) && (!Number.isInteger(parseInt(element[i])) || (i === element.length - 1))) {
                if (winningNumbers.includes(parseInt(numberBucket))) matches++
                numberBucket = ""
            }
        }
        for (let i = cardNumber + 1; i <= cardNumber + matches; i++) {
            cardCopies[i] = cardCopies[i] + (1 * cardCopies[cardNumber])
        }
    })
    cardCopies.forEach (element => {
        finalCounter = finalCounter + element    
    })
    console.log(finalCounter)
})