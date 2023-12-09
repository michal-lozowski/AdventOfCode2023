const fs = require('fs');

fs.readFile("realinput.txt", 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const inputText = data;
    let inputArray = inputText.split("\r\n");
    
    let counter = 0;

    for (let i = 0; i < inputArray.length; i++) {
        
        const patternRed = /((1[3-9])|(2[0-9])) red/;
        const patternGreen = /((1[4-9])|(2[0-9])) green/;
        const patternBlue = /((1[5-9])|(2[0-9])) blue/;

        if ((!(patternRed.test(inputArray[i]))) && (!(patternGreen.test(inputArray[i]))) && (!(patternBlue.test(inputArray[i])))) {
            console.log("A good game found! Game ID: " + (i+1))
            counter = counter + (i+1);
            console.log("Current counter state: " + counter)
        }
    };
    console.log("Final Sum: " + counter);
});
