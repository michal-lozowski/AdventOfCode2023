const fs = require('fs');

fs.readFile("realinput.txt", 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const inputText = data;
    let inputLines = inputText.split("\r\n");
    
    let finalSum = 0;
    for (let i = 0; i < inputLines.length; i++) {
        
        const patternRed = /(([0-9])|(1[0-9])|(2[0-9])) red/g;
        const patternGreen = /(([0-9])|(1[0-9])|(2[0-9])) green/g;
        const patternBlue = /(([0-9])|(1[0-9])|(2[0-9])) blue/g;

        let maxRedFound = 1;
        let maxGreenFound = 1;
        let maxBlueFound = 1;

        while ((match = patternRed.exec(inputLines[i])) !== null) {
            matchedNumber = match[1];
            if (parseInt(matchedNumber) > maxRedFound) maxRedFound = matchedNumber
        }
        
        while ((match = patternGreen.exec(inputLines[i])) !== null) {
            matchedNumber = match[1];
            if (parseInt(matchedNumber) > maxGreenFound) maxGreenFound = matchedNumber
        }
        
        while ((match = patternBlue.exec(inputLines[i])) !== null) {
            matchedNumber = match [1];
            if (parseInt(matchedNumber) > maxBlueFound) maxBlueFound = matchedNumber
        }

        //console.log (maxRedFound, maxGreenFound, maxBlueFound)
        finalSum = (finalSum + (maxRedFound*maxGreenFound*maxBlueFound)) 

    };
    console.log("Final Sum: " + finalSum);
});
