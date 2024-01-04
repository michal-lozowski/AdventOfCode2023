const fs = require('fs');

fs.readFile("realinput.txt", 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const inputText = data
    const inputLines = inputText.split("\r\n")
    const inputValues = inputLines.map(line => line.split(" ").map(element => parseInt(element)))

    function differences(values) {
        let differencesArray = []
        for (let i = 0; i < values.length - 1; i++) {
            differencesArray.push(values[i + 1] - values[i])
        }
        return differencesArray
    }

    function predictor(values) {
        if (differences(values).filter(element => element === 0).length === differences(values).length)
            return values[0]
        else return (values[0] - predictor(differences(values)))
    }

    let finalSum = 0
    inputValues.forEach(line => {
        finalSum += predictor(line)
    })

    console.log(finalSum)

})