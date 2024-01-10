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

        let symbol = startSymbolConverter(north,south,west,east)
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

    do {
        reachedCoordinates = nextCoordinates
        entrySide = directionFlipper(nextDirection)
        reachedSymbol = inputLines[reachedCoordinates[0]][reachedCoordinates[1]]
        nextDirection = whereToGoNext(entrySide, reachedSymbol)
        nextCoordinates = directionToCoordinates(nextDirection, reachedCoordinates)
        counter++
    } while (reachedSymbol !== "S")

    console.log(counter / 2)

})