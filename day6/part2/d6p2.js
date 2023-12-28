const fs = require('fs');

fs.readFile("realinput.txt", 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const inputText = data
    const inputLines = inputText.split("\r\n");

    let raceTime = ""
    let raceRecord = ""
    inputLines[0].match(/\d+/g).forEach(element => raceTime = raceTime + element)
    inputLines[1].match(/\d+/g).forEach(element => raceRecord = raceRecord + element)
    raceTime = parseInt(raceTime)
    raceRecord = parseInt(raceRecord)

    let lowestWinningButtonTime
    let longestWinningButtonTime
    for (let i = 0; i < raceTime; i++) {
        if (i * (raceTime - i) > raceRecord) {
            lowestWinningButtonTime = i
            break
        }
    }
    for (let i = raceTime; i > 0; i--) {
        if (i* (raceTime - i) > raceRecord) {
            longestWinningButtonTime = i
            break
        }
    }

    console.log(longestWinningButtonTime - lowestWinningButtonTime + 1) 

})