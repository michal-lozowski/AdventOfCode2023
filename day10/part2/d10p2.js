const fs = require('fs');
fs.readFile("realinput.txt", 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const inputText = data
    let inputLines = inputText.split("\r\n")

    startingPoint = []
    for (let i = 0; i < inputLines.length; i++) {
        for (let j = 0; j < inputLines[i].length; j++) {
            if (inputLines[i][j] === "S") startingPoint.push(i, j)
        }
    }

    function whereToGoNext(entrySide, symbol) {
        if (symbol === "|") return (entrySide === "north") ? "south" : "north"
        if (symbol === "-") return (entrySide === "east") ? "west" : "east"
        if (symbol === "L") return (entrySide === "north") ? "east" : "north"
        if (symbol === "J") return (entrySide === "west") ? "north" : "west"
        if (symbol === "7") return (entrySide === "south") ? "west" : "south"
        if (symbol === "F") return (entrySide === "south") ? "east" : "south"
    }

    function startSymbolConverter(north, south, west, east) {
        let possibleConnectors = []
        if (north === "|" || north === "F" || north === "7") possibleConnectors.push("|", "L", "J")
        if (south === "|" || south === "L" || south === "J") possibleConnectors.push("|", "7", "F")
        if (west === "-" || west === "L" || west === "F") possibleConnectors.push("-", "7", "J")
        if (east === "-" || east === "7" || east === "J") possibleConnectors.push("-", "L", "F")
        let connector
        let connectorsMap = {}
        possibleConnectors.forEach(element => {
            connectorsMap[element] = (!connectorsMap[element]) ? 1 : (connectorsMap[element] + 1)
        })
        for (let i = 0; i < possibleConnectors.length; i++) {
            if (connectorsMap[possibleConnectors[i]] === 2) {
                connector = possibleConnectors[i]
                break
            }
        }
        return connector
    }

    function directionToCoordinates(direction, currentCoordinates) {
        let line = currentCoordinates[0]
        let column = currentCoordinates[1]
        if (direction === "north") {
            if (line - 1 >= 0)
                return [line - 1, column]
            else return null
        }
        if (direction === "south") {
            if (line + 1 <= inputLines.length)
                return [line + 1, column]
            else return null
        }
        if (direction === "west") {
            if (column - 1 >= 0)
                return [line, column - 1]
            else return null
        }
        if (direction === "east") {
            if (column + 1 <= inputLines[0].length)
                return [line, column + 1]
            else return null
        }
    }

    function directionFromStart(startCoordinates) {
        let northCoordinates = directionToCoordinates("north", startCoordinates)
        let southCoordinates = directionToCoordinates("south", startCoordinates)
        let westCoordinates = directionToCoordinates("west", startCoordinates)
        let eastCoordinates = directionToCoordinates("east", startCoordinates)

        let north = "", south = "", west = "", east = ""

        if (northCoordinates) north = inputLines[northCoordinates[0]][northCoordinates[1]]
        if (southCoordinates) south = inputLines[southCoordinates[0]][southCoordinates[1]]
        if (westCoordinates) west = inputLines[westCoordinates[0]][westCoordinates[1]]
        if (eastCoordinates) east = inputLines[eastCoordinates[0]][eastCoordinates[1]]

        let symbol = startSymbolConverter(north, south, west, east)
        if (symbol === "|") return "north"
        if (symbol === "-") return "east"
        if (symbol === "L") return "north"
        if (symbol === "J") return "north"
        if (symbol === "7") return "south"
        if (symbol === "F") return "south"
    }

    function directionFlipper(direction) {
        if (direction === "west") return "east"
        if (direction === "east") return "west"
        if (direction === "north") return "south"
        if (direction === "south") return "north"
    }

    let reachedCoordinates = startingPoint
    let entrySide
    let reachedSymbol = "S"
    let nextDirection = directionFromStart(startingPoint)
    let nextCoordinates = directionToCoordinates(nextDirection, reachedCoordinates)
    let counter = 0

    let mapWithLoop = inputLines.map(line => [...line])
    mapWithLoop = mapWithLoop.map(element => element.map(subelement => subelement = "#"))

    do {
        reachedCoordinates = nextCoordinates
        entrySide = directionFlipper(nextDirection)
        reachedSymbol = inputLines[reachedCoordinates[0]][reachedCoordinates[1]]
        mapWithLoop[reachedCoordinates[0]][reachedCoordinates[1]] = reachedSymbol
        nextDirection = whereToGoNext(entrySide, reachedSymbol)
        nextCoordinates = directionToCoordinates(nextDirection, reachedCoordinates)
        counter++
    } while (reachedSymbol !== "S")


    let insideElementsCounter = 0
    for (let i = 0; i < mapWithLoop.length; i++) {
        let counter = 0
        let fEncountered = false
        let lEncountered = false
        for (let j = 0; j < mapWithLoop[0].length; j++) {
            let currentSymbol = mapWithLoop[i][j]
            if (currentSymbol === "|") counter++
            if (currentSymbol === "F") fEncountered = true
            if (currentSymbol === "L") lEncountered = true
            if (fEncountered && currentSymbol === "7") {
                fEncountered = false
                counter += 2
            }
            if (fEncountered && currentSymbol === "J") {
                fEncountered = false
                counter++
            }
            if (lEncountered && currentSymbol === "J") {
                lEncountered = false
                counter += 2
            }
            if (lEncountered && currentSymbol === "7") {
                lEncountered = false
                counter++
            }
            if (currentSymbol === "#" && (counter % 2 === 1)) {
                mapWithLoop[i][j] = "I"
                insideElementsCounter++
            }
            if (currentSymbol === "#" && (counter % 2 === 0)) mapWithLoop[i][j] = "O"
        }
    }

    console.log(insideElementsCounter)

    /* mapWithLoop = mapWithLoop.map(line => [...line])
    for (let i = 0; i < mapWithLoop.length; i++) {
        for (let j = 0; j < mapWithLoop[i].length; j++) {
            if (mapWithLoop[i][j] === "J") mapWithLoop[i][j] = "┘"
            if (mapWithLoop[i][j] === "7") mapWithLoop[i][j] = "┐"
            if (mapWithLoop[i][j] === "F") mapWithLoop[i][j] = "┌"
            if (mapWithLoop[i][j] === "L") mapWithLoop[i][j] = "└"
        }
    }

    mapWithLoop = mapWithLoop.map(line => line.reduce((accumulator, currentValue) => accumulator + currentValue))
    mapWithLoop = mapWithLoop.reduce((accumulator, currentValue) => accumulator + "\r\n" + currentValue)

    fs.writeFile('IOoutput.txt', mapWithLoop, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return;
        }
        console.log('Content written to file successfully.');
    }); */
})