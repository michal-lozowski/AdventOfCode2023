const fs = require('fs');

fs.readFile("realinput.txt", 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const inputText = data
    const inputLines = inputText.split("\r\n");

    let movingInstructions = inputLines[0]
    let nodes = []
    let edges = []
    for (let i = 2; i < inputLines.length; i++) {
        nodes.push(inputLines[i].match(/[A-Z]{3}/g)[0])
        edges.push(inputLines[i].match(/[A-Z]{3}/g).slice(1))
    }

    let currentNode = "AAA"
    let stepCounter = 0
    
    //let walkedNodes = [currentNode]
    while (currentNode !== "ZZZ") {
        for (let i = 0; i < movingInstructions.length; i++) {
            /* if (i === 0) {
                if (walkedNodes.includes(currentNode)) console.log("here we go again")
                 else walkedNodes.push(currentNode)
            } */
            if (movingInstructions[i] === "L") currentNode = edges[nodes.indexOf(currentNode)][0]
            if (movingInstructions[i] === "R") currentNode = edges[nodes.indexOf(currentNode)][1]
            stepCounter++
            console.log(stepCounter)
            if (currentNode === "ZZZ") {
                console.log("found! current i: ", i)
                break
            }
        }
    }

    console.log(stepCounter)

})