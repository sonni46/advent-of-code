const fs = require('fs');

const numberWords = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
};

const percorsoFile = 'C:/Users/sonni/Desktop/advent of code/1/file2.txt'

const leggiFile = (percorso) => {
    try {
        const dati = fs.readFileSync(percorso, 'utf-8');
        const arr = dati.replace(/\r?\n/g, ',').split(',');
        return arr;
    } catch (errore) {
        console.error('Errore durante la lettura del file:', errore);
        return [];
    }
};

const calibration = (arr) => {
    let result = 0;
    for (let i = 0; i < arr.length ; i++) {
        let foundNunbers = [];
        let line = converter(arr[i]);
        let StringLength = line.length;
        for (let j = 0; j < StringLength; j++) {
            if(!isNaN(parseInt(line[j]))) {
                foundNunbers.push(line[j]);
            }
        }
        if(foundNunbers.length > 0) result += parseInt(foundNunbers[0] + foundNunbers[foundNunbers.length -1]);
        
    }
    console.log(result)
}

const converter = (line) => {
    let newStr = line;
    Object.keys(numberWords).forEach(num => {
        newStr = newStr.replaceAll(num,num[0] + numberWords[num] + num[num.length - 1]);
    })
    return newStr;
}

// const converter = (sting) => {
//     let result = 0;
//     let stringMatch = [];
//     if(sting != '' && sting != undefined && sting.length > 2) {
//         Object.keys(numberWords).some((el) => {
//             let regex = new RegExp(el,'gm');
//             let match = sting.match(regex);
//             if (match && match .length > 0) {
//                 stringMatch.push(...match);
//                 return true;
//             }
//         });
//         if (stringMatch.length > 0) {
//             for (let i = 0; i < stringMatch.length; i++) {
//                 let number = stringMatch[i];
//                 if (number || number === 'zero') {
//                     result += numberWords[number];
//                 }
//             }
//         }
//         return result ? parseInt(result) : null;
//     }
// }

const main = async () => {
    const arr = await leggiFile(percorsoFile);
    // const arr = ['two1nine',
    //     'eightwothree',
    //     'abcone2threexyz',
    //     'xtwone3four',
    //     '4nineeightseven2',
    //     'zoneight234',
    //     '7pqrstsixteen'];

    let number = calibration(arr);
    console.log(number);
};

main()