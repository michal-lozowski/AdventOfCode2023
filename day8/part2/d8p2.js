const { match } = require('assert');
const { count } = require('console');
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
        nodes.push(inputLines[i].match(/\w{3}/g)[0])
        edges.push(inputLines[i].match(/\w{3}/g).slice(1))
    }

    let nodesA = nodes.filter(element => /\w{2}A/.test(element))
    let nodesZ = nodes.filter(element => /\w{2}Z/.test(element))

    let freq = {}
    nodesZ.forEach(element => freq[element] = 0)

    let stepCounter = 0
    while (stepCounter < 60000) {
        for (let i = 0; i < movingInstructions.length; i++) {
            for (let j = 0; j < nodesA.length; j++) {
                if (movingInstructions[i] === "L") nodesA[j] = edges[nodes.indexOf(nodesA[j])][0]
                if (movingInstructions[i] === "R") nodesA[j] = edges[nodes.indexOf(nodesA[j])][1]
            }
            stepCounter++
            if (nodesA.filter(element => /\w{2}Z/.test(element)).length === 1) {
                let matchedElement = nodesA.filter(element => /\w{2}Z/.test(element))
                if (freq[matchedElement] === 0) {
                    freq[matchedElement] = stepCounter
                }
            }
        }
    }

    function gcd(a, b) {
        if (b === 0) {
            return a;
        } else {
            return gcd(b, a % b);
        }
    }

    function lcm(a, b) {
        return (a * b) / gcd(a, b);
    }

    let output = Object.values(freq).reduce((accumulator, currentValue) => lcm(accumulator, currentValue), 1)
    
    console.log(output)
})