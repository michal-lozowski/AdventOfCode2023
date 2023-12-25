const fs = require('fs');

fs.readFile("realinput.txt", 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const inputText = data
    const inputLines = inputText.split("\r\n");

    function mapNavigator(startValue, destinationRangeStart, sourceRangeStart, rangeLength) {
        let outputArray = [];
        let mappedValue = startValue;
        outputArray[0] = mappedValue;
        outputArray[1] = false;
        if ((startValue >= sourceRangeStart) && (startValue <= (sourceRangeStart + rangeLength - 1))) {
            rangeStartDifference = Math.abs(sourceRangeStart - destinationRangeStart)
            mappedValue = (sourceRangeStart > destinationRangeStart) ? startValue - rangeStartDifference : startValue + rangeStartDifference
            outputArray[0] = mappedValue
            outputArray[1] = true;
        }
        return outputArray;
    }

    const seeds = inputLines[0].split(" ").slice(1).map(element => parseInt(element))
    let maps = inputText.split(":").slice(2).map(element => element.split("\r\n"))
    maps = maps.map(element => element.filter(subelement => Number.isInteger(parseInt(subelement[0]))))
    maps = maps.map(element => element.map(subelement => subelement.split(" ")))
    maps = maps.map(element => element.map(subelement => subelement.map(subsubelement => parseInt(subsubelement))))

    let lowestLocation;
    for (let k = 0; k < seeds.length; k++) {
        let XToY = seeds[k]
        let mapNavigatorOutput = [];
        maps.forEach(map => {
            for (let i = 0; i < map.length; i++) {
                mapNavigatorOutput = mapNavigator(XToY, map[i][0], map[i][1], map[i][2])
                XToY = mapNavigatorOutput[0]
                if (mapNavigatorOutput[1]) break
            }
        })
        if (lowestLocation == undefined) lowestLocation = XToY
        if (XToY < lowestLocation) lowestLocation = XToY
    }

    console.log(lowestLocation)

})