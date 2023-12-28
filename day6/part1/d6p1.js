const fs = require('fs');

fs.readFile("realinput.txt", 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const inputText = data
    const inputLines = inputText.split("\r\n");

    raceTime = inputLines[0].match(/\d+/g).map(element => parseInt(element))
    raceRecord = inputLines[1].match(/\d+/g).map(element => parseInt(element))
    allWaysToWin = []

    for (let i = 0; i < raceTime.length; i++) {
        let waysToWin = 0
        for (let j = 0; j <= raceTime[i]; j++) {
            if ((j * (raceTime[i] - j)) > raceRecord[i]) waysToWin++
        }
        allWaysToWin.push(waysToWin);
    }

    let output = allWaysToWin[0]
    for (let i = 1; i < allWaysToWin.length; i++) {
        output = output * allWaysToWin[i]
    }

    console.log(output)

})