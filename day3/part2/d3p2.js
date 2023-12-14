const fs = require('fs');

fs.readFile("realinput.txt", 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const inputText = data;
    let inputLines = inputText.split("\r\n");

    let numberPattern = /\d{1,3}/
    let numbersPattern = /\d+/g
    let gearPattern = /\*/g
    let counter = 0;

    for (let i = 0; i < inputLines.length; i++) {
        let foundGearPosition;
        while ((gearMatch = gearPattern.exec(inputLines[i])) != null) {
            foundGearPosition = parseInt(gearMatch.index)
            foundGearLeftBorder = (foundGearPosition == 0) ? foundGearPosition : foundGearPosition - 1
            foundGearRightBorder = (foundGearPosition == inputLines[i].length - 1) ? foundGearPosition : foundGearPosition + 1

            function findWholeNumber(digitPosition, direction, iValue) {
                let wholeNumber = "";
                if ((direction == "right") && !(Number.isInteger(parseInt(inputLines[iValue][foundGearPosition]))) && (Number.isInteger(parseInt(inputLines[iValue][foundGearRightBorder])))) {
                    for (let k = digitPosition; ((k <= digitPosition + 2) && (k < inputLines[iValue].length)); k++) {
                        if (Number.isInteger(parseInt(inputLines[iValue][k]))) wholeNumber = wholeNumber.concat(inputLines[iValue][k])
                        else break
                    }
                } else {
                    if ((direction == "left") && !(Number.isInteger(parseInt(inputLines[iValue][foundGearPosition]))) && (Number.isInteger(parseInt(inputLines[iValue][foundGearLeftBorder])))) {
                        for (let k = digitPosition; ((k >= digitPosition - 2) && (k >= 0)); k--) {
                            if (Number.isInteger(parseInt(inputLines[iValue][k]))) wholeNumber = (inputLines[iValue][k]) + wholeNumber
                            else break
                        }
                    } else {
                        if ((direction == "leftright") && (Number.isInteger(parseInt(inputLines[iValue][foundGearPosition])))) {
                            let wholeNumberRight = ""
                            let wholeNumberLeft = ""
                            let wholeNumberCentral = "";
                            for (let k = digitPosition; ((k <= digitPosition + 2) && (k <= inputLines[iValue].length)); k++) {
                                if (Number.isInteger(parseInt(inputLines[iValue][k]))) wholeNumberRight = wholeNumberRight.concat(inputLines[iValue][k])
                                else break
                            }
                            for (let k = digitPosition; ((k >= digitPosition - 2) && (k >= 0)); k--) {
                                if (Number.isInteger(parseInt(inputLines[iValue][k]))) wholeNumberLeft = (inputLines[iValue][k]) + wholeNumberLeft
                                else break
                            }
                            for (let k = digitPosition-1; ((k <= digitPosition + 1) && (k <= inputLines[iValue].length)); k++) {
                                if (Number.isInteger(parseInt(inputLines[iValue][k]))) wholeNumberCentral = wholeNumberCentral.concat(inputLines[iValue][k])
                                else break
                            }
                            wholeNumberRight = parseInt(wholeNumberRight)
                            wholeNumberLeft = parseInt(wholeNumberLeft)
                            wholeNumberCentral = parseInt(wholeNumberCentral)
                            if (isNaN(wholeNumberRight)) wholeNumberRight = 0
                            if (isNaN(wholeNumberLeft)) wholeNumberLeft = 0
                            if (isNaN(wholeNumberCentral)) wholeNumberCentral = 0
                            console.log("right : ", wholeNumberRight, "left: ", wholeNumberLeft, "central: ", wholeNumberCentral)
                            wholeNumber = Math.max(wholeNumberRight, wholeNumberLeft, wholeNumberCentral)
                        } else return NaN;
                    }
                }
                wholeNumber = parseInt(wholeNumber);
                if (Number.isInteger(wholeNumber)) {
                    console.log("whole number: ", wholeNumber)
                    return wholeNumber
                } else return "";
            }


            let partNumbersAdjacentToGear = []
            if (i == 0) {
                partNumbersAdjacentToGear.push(findWholeNumber(foundGearLeftBorder, "left", i))
                partNumbersAdjacentToGear.push(findWholeNumber(foundGearRightBorder, "right", i))
                partNumbersAdjacentToGear.push(findWholeNumber(foundGearLeftBorder, "left", i + 1))
                partNumbersAdjacentToGear.push(findWholeNumber(foundGearRightBorder, "right", i + 1))
                partNumbersAdjacentToGear.push(findWholeNumber(foundGearPosition, "leftright", i + 1))
            } else {
                if (i == inputLines.length - 1) {
                    partNumbersAdjacentToGear.push(findWholeNumber(foundGearLeftBorder, "left", inputLines.length - 1))
                    partNumbersAdjacentToGear.push(findWholeNumber(foundGearRightBorder, "right", inputLines.length - 1))
                    partNumbersAdjacentToGear.push(findWholeNumber(foundGearLeftBorder, "left", inputLines.length - 2))
                    partNumbersAdjacentToGear.push(findWholeNumber(foundGearRightBorder, "right", inputLines.length - 2))
                    partNumbersAdjacentToGear.push(findWholeNumber(foundGearPosition, "leftright", inputLines.length - 2))
                } else {
                    partNumbersAdjacentToGear.push(findWholeNumber(foundGearPosition, "leftright", i - 1))
                    partNumbersAdjacentToGear.push(findWholeNumber(foundGearLeftBorder, "left", i - 1))
                    partNumbersAdjacentToGear.push(findWholeNumber(foundGearRightBorder, "right", i - 1))
                    partNumbersAdjacentToGear.push(findWholeNumber(foundGearLeftBorder, "left", i))
                    partNumbersAdjacentToGear.push(findWholeNumber(foundGearRightBorder, "right", i))
                    partNumbersAdjacentToGear.push(findWholeNumber(foundGearLeftBorder, "left", i + 1))
                    partNumbersAdjacentToGear.push(findWholeNumber(foundGearRightBorder, "right", i + 1))
                    partNumbersAdjacentToGear.push(findWholeNumber(foundGearPosition, "leftright", i + 1))
                }
            }
            partNumbersAdjacentToGear = partNumbersAdjacentToGear.filter(element => Number.isInteger(element))
            if (partNumbersAdjacentToGear.length == 2) {
                counter = counter + (partNumbersAdjacentToGear[0] * partNumbersAdjacentToGear[1]);
            }
        }
    }
    console.log("Final Sum: " + counter);
})
