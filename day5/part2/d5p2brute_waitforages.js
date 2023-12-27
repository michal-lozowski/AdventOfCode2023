const fs = require('fs');

fs.readFile("realinput.txt", 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const inputText = data
    const inputLines = inputText.split("\r\n");

    function mapNavigatorBackwards(startValue, destinationRangeStart, sourceRangeStart, rangeLength) {
        let outputArray = [];
        let mappedValue = startValue;
        outputArray[0] = mappedValue;
        outputArray[1] = false;
        if ((startValue >= destinationRangeStart) && (startValue <= (destinationRangeStart + rangeLength - 1))) {
            rangeStartDifference = Math.abs(sourceRangeStart - destinationRangeStart)
            mappedValue = (destinationRangeStart > sourceRangeStart) ? startValue - rangeStartDifference : startValue + rangeStartDifference
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

    maps[6] = maps[6].sort((a, b) => a[0] - b[0]);

    let lowestLocation;
    let seedRange = [];
    let correspondingSeed;
    let locationFound = false;
    for (let k = 0; k < maps[6].length; k++) {
        for (let j = maps[6][k][0]; j < maps[6][k][0] + maps[6][k][2]; j++) {
            console.log("current location number: ", j)
            lowestLocation = j;
            let XToY = j;
            let mapNavigatorOutput = [];
            for (let n = maps.length - 1; n >= 0; n--) {
                let map = maps[n];
                for (let i = 0; i < map.length; i++) {
                    mapNavigatorOutput = mapNavigatorBackwards(XToY, map[i][0], map[i][1], map[i][2])
                    XToY = mapNavigatorOutput[0]
                    if (mapNavigatorOutput[1]) break
                }
            }
            for (let l = 0; l < seeds.length; l += 2) {
                if ((XToY >= seeds[l]) && (XToY < seeds[l] + seeds[l + 1])) {
                    locationFound = true;
                    correspondingSeed = XToY;
                    seedRange[0] = seeds[l]
                    seedRange[1] = seeds[l + 1]
                }
            }
            if (locationFound == true) break


            if (locationFound == true) break
        }
    }

    if (locationFound) console.log("found! ", lowestLocation, " ", correspondingSeed, " ", seedRange[0], " ", seedRange[1])

})