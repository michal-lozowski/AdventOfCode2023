const fs = require('fs');

fs.readFile("realinput.txt", 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const inputText = data
    const inputLines = inputText.split("\r\n");
    let handsAndBids = inputLines.map(element => element = element.split(" "))

    function determineHandType(hand) {
        let handType
        let labels = [[], []]
        for (let i = 0; i < hand.length; i++) {
            if (!labels[0].includes(hand[i])) {
                labels[0].push(hand[i])
                labels[1][labels[0].indexOf(hand[i])] = 1
            }
            else labels[1][labels[0].indexOf(hand[i])]++
        }
        if (labels[1].length === 5) handType = 0
        if (labels[1].length === 4) handType = 1
        if (labels[1].filter(element => element === 2).length === 2) handType = 2
        if (labels[1].length === 3 && labels[1].includes(3)) handType = 3
        if (labels[1].length === 2 && labels[1].includes(3)) handType = 4
        if (labels[1].length === 2 && labels[1].includes(4)) handType = 5
        if (labels[1].length === 1) handType = 6
        return handType
    }

    function numerifyLabel(label) {
        if (label === "T") return 10
        if (label === "J") return 11
        if (label === "Q") return 12
        if (label === "K") return 13
        if (label === "A") return 14
        return parseInt(label)
    }

    function compareHands(handA, handB) {
        if (determineHandType(handA) > determineHandType(handB)) return 1
        if (determineHandType(handA) < determineHandType(handB)) return -1
        if (determineHandType(handA) === determineHandType(handB)) {
            for (let i = 0; i < handA.length; i++) {
                if (numerifyLabel(handA[i]) > numerifyLabel(handB[i])) return 1
                if (numerifyLabel(handA[i]) < numerifyLabel(handB[i])) return -1
            }
            return 0
        }
    }

    
    handsAndBids.sort((a,b) => compareHands(a[0], b[0]))

    let output = 0
    for (let i = 0; i < handsAndBids.length; i++) {
        output += parseInt(handsAndBids[i][1]) * (i + 1)
    }

    console.log(output)

})