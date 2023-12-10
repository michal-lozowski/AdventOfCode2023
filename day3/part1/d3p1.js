const fs = require('fs');

fs.readFile("realinput.txt", 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const inputText = data;
    let inputLines = inputText.split("\r\n");

    let numberPattern = /\d+/
    let numbersPattern = /\d+/g
    let symbols = [];
    for (let i = 0; i < inputLines.length; i++) {
        let inputLine = [...inputLines[i]];
        for (let j = 0; j < inputLine.length; j++) {
            if ((inputLine[j] !== ".") && !(numberPattern.test(inputLine[j])) && !(symbols.includes(inputLine[j]))) {
                symbols.push(inputLine[j])
            }
        }
    }
    console.log(symbols)
    let counter = 0;
    for (let i = 0; i < inputLines.length; i++) {
        let foundNumber;
        let foundNumberStart;
        let foundNumberEnd;
        console.log("line: " + inputLines[i])
        while ((match = numbersPattern.exec(inputLines[i])) != null) {
            foundNumber = match[0]
            foundNumberStart = parseInt(match.index)
            foundNumberEnd = foundNumberStart + (foundNumber.length - 1)
            foundNumberLeftBorder = (foundNumberStart == 0) ? foundNumberStart : foundNumberStart - 1
            foundNumberRightBorder = (foundNumberEnd == inputLines[i].length - 1) ? foundNumberEnd : foundNumberEnd + 1
            for (k = foundNumberLeftBorder; k <= foundNumberRightBorder; k++) {
                if (i == 0) {
                    if (symbols.includes(inputLines[0][k])) counter = counter + parseInt(foundNumber)
                    else if (symbols.includes(inputLines[1][k])) counter = counter + parseInt(foundNumber)
                } else {
                    if (i == inputLines.length - 1) {
                        if (symbols.includes(inputLines[inputLines.length - 1][k])) counter = counter + parseInt(foundNumber)
                        else if (symbols.includes(inputLines[inputLines.length - 2][k])) counter = counter + parseInt(foundNumber)
                    } else {
                        if (symbols.includes(inputLines[i][k])) counter = counter + parseInt(foundNumber)
                        else if (symbols.includes(inputLines[i - 1][k])) counter = counter + parseInt(foundNumber)
                        else if (symbols.includes(inputLines[i + 1][k])) counter = counter + parseInt(foundNumber)
                    }
                }
            }
        }
    };
    console.log("Final Sum: " + counter);
});
