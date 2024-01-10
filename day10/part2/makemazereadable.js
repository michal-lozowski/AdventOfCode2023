const fs = require('fs');
fs.readFile("testinput.txt", 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const inputText = data
    let inputLines = inputText.split("\r\n")

inputLines = inputLines.map(line => [...line])
for (let i = 0; i < inputLines.length; i++) {
    for (let j = 0; j < inputLines[i].length; j++) {
        if (inputLines[i][j] === "J") inputLines[i][j] = "┘"
        if (inputLines[i][j] === "7") inputLines[i][j] = "┐"
        if (inputLines[i][j] === "F") inputLines[i][j] = "┌"
        if (inputLines[i][j] === "L") inputLines[i][j] = "└"
    }
}

inputLines = inputLines.map(line => line.reduce((accumulator, currentValue) => accumulator + currentValue))
inputLines = inputLines.reduce((accumulator, currentValue) => accumulator + "\r\n" + currentValue)

fs.writeFile('output.txt', inputLines, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return;
    }
    console.log('Content written to file successfully.');
  });
});