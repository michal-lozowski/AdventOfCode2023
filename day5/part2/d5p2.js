const fs = require('fs');

fs.readFile("realinput.txt", 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const inputText = data
    const inputLines = inputText.split("\r\n");

    function rangeMapper(seedRangeStart, seedRangeEnd, destinationRangeStart, sourceRangeStart, mapRangeLength) {
        let outputArray = []
        let mappedDestinationRangeStart
        let mappedDestinationRangeEnd

        let sourceRangeEnd = sourceRangeStart + mapRangeLength - 1

        let validSourceRangeStart
        let validSourceRangeEnd

        if ((!(sourceRangeStart > seedRangeEnd)) && (!(sourceRangeEnd < seedRangeStart))) {
            if (sourceRangeStart >= seedRangeStart) validSourceRangeStart = sourceRangeStart
            else validSourceRangeStart = seedRangeStart
            if (sourceRangeEnd < seedRangeEnd) validSourceRangeEnd = sourceRangeEnd
            else validSourceRangeEnd = seedRangeEnd
        } else return outputArray

        sourceDestinationDifference = sourceRangeStart - destinationRangeStart;
        mappedDestinationRangeStart = validSourceRangeStart - sourceDestinationDifference
        mappedDestinationRangeEnd = validSourceRangeEnd - sourceDestinationDifference
        outputArray.push(mappedDestinationRangeStart, mappedDestinationRangeEnd)

        let unmappedRangeAStart
        let unmappedRangeAEnd
        let unmappedRangeBStart
        let unmappedRangeBEnd

        if ((validSourceRangeStart === seedRangeStart) && (validSourceRangeEnd < seedRangeEnd)) {
            unmappedRangeAStart = validSourceRangeEnd + 1
            unmappedRangeAEnd = seedRangeEnd
            outputArray.push(unmappedRangeAStart, unmappedRangeAEnd)
        }
        if ((validSourceRangeEnd === seedRangeEnd) && (validSourceRangeStart > seedRangeStart)) {
            unmappedRangeAStart = seedRangeStart
            unmappedRangeAEnd = validSourceRangeStart - 1
            outputArray.push(unmappedRangeAStart, unmappedRangeAEnd)
        }
        if ((validSourceRangeStart > seedRangeStart) && (validSourceRangeEnd < seedRangeEnd)) {
            unmappedRangeAStart = seedRangeStart
            unmappedRangeAEnd = validSourceRangeStart - 1
            unmappedRangeBStart = validSourceRangeEnd + 1
            unmappedRangeBEnd = seedRangeEnd
            outputArray.push(unmappedRangeAStart, unmappedRangeAEnd, unmappedRangeBStart, unmappedRangeBEnd)
        }

        return outputArray;

    }


    const seeds = inputLines[0].split(" ").slice(1).map(element => parseInt(element))
    let maps = inputText.split(":").slice(2).map(element => element.split("\r\n"))
    maps = maps.map(element => element.filter(subelement => Number.isInteger(parseInt(subelement[0]))))
    maps = maps.map(element => element.map(subelement => subelement.split(" ")))
    maps = maps.map(element => element.map(subelement => subelement.map(subsubelement => parseInt(subsubelement))))

    let mappedRanges = [[], [], [], [], [], [], [], []];

    for (let i = 0; i < seeds.length; i += 2) {
        let seedRangeStart = seeds[i]
        let seedRangeEnd = seeds[i] + seeds[i + 1] - 1
        mappedRanges[0].push(seedRangeStart, seedRangeEnd)
        for (let j = 0; j < maps.length; j++) {
            let map = maps[j];
            for (let k = 0; k < map.length; k++) {
                let outputArray = []
                let numberOfRangesToGoThrough = mappedRanges[j].length
                for (l = 0; l < numberOfRangesToGoThrough; l += 2) {
                    outputArray = rangeMapper(mappedRanges[j][l], mappedRanges[j][l + 1], map[k][0], map[k][1], map[k][2])
                    if (outputArray.length > 0) {
                        mappedRanges[j + 1].push(outputArray[0], outputArray[1])
                        mappedRanges[j][l] = NaN
                        mappedRanges[j][l + 1] = NaN
                    }
                    if (outputArray.length > 2) outputArray.slice(2).forEach(element => mappedRanges[j].push(element))
                }
                mappedRanges[j] = mappedRanges[j].filter(num => Number.isInteger(num))
                if (k === map.length - 1) {
                    mappedRanges[j].filter(num => Number.isInteger(num)).forEach(element => mappedRanges[j + 1].push(element))
                }
            }
        }
    }

    let lowestLocation = 999999999999999;
    for (let i = 0; i < mappedRanges[mappedRanges.length - 1].length; i += 2) {
        if (mappedRanges[mappedRanges.length - 1][i] < lowestLocation) {
            lowestLocation = mappedRanges[mappedRanges.length - 1][i]
        }
    }
    console.log(lowestLocation)

})