import * as fs from 'fs';
const locationFile: string = "C:/Users/Marco/Desktop/Advent of code/file.txt";
export interface IformatObject {
    [key: string]: string[][];
}

const readFile = async (path:string) : Promise<IformatObject> => {
    try {
        const file = fs.readFileSync(path,'utf-8');
        const formatFile = formatter(file);
        return formatFile;
    } catch (error) {
        console.log("error -> ",error);
        return {} as IformatObject;
    }
}

const formatter = (data:string) => {
    let file: string = data;
    const regex: RegExp = /\r\n|[;:]/gm;
    let replaceStrings: string = file.replace(regex,','); 
    replaceStrings = replaceStrings.replace(/^\s+/gm, '',);
    let formatStr = formatString(replaceStrings);
    return formatStr;
}

const formatString = (string:string): IformatObject => {
    let obj: IformatObject = {} as IformatObject;
    let splitString: string[] = string.split(',');
    let prevIdGame : string = '';
    
    if (splitString && splitString.length > 0) {
        for (let i = 0; i < splitString.length; i++) {
            let lengthString: number = splitString[i].length;
            let endCharIsNum: number = parseInt(splitString[i][lengthString - 1]);
            let isNumber: boolean = !isNaN(endCharIsNum);
            let countIdGame: string = splitString[i][lengthString - 1];
            let value:string = splitString[i].replace(/^\s+/g, '');
            if(isNumber) {
                obj[countIdGame] = [];
                prevIdGame = countIdGame;
            } else {
                obj[prevIdGame].push(value.split(' '));
            }
        }
    }

    return obj;
}

const predictGame = (value:IformatObject):number => {
    const predict = 0;
    for(const key in value) {
        const subArr = value[key];
        if(subArr && subArr.length > 0) {
            for(let i = 0; i < subArr.length; i++) {
                let bag = subArr[i];
                if(bag && bag.length > 0) {
                    console.log(isPossible(parseInt(bag[0]),bag[1]))
                }
            }
        }
    }
    
    return predict;
}

const isPossible = (value:number,color:string) => {
    const valueException = {
        blue: 14,
        green: 13,
        red:12 
    };

    if(value < valueException[color]) {
        return true;
    }

    return false;
}

const main = async () => {
    const data: Promise<IformatObject> = readFile(locationFile);
    const response:IformatObject = await data;
    predictGame(response);
}

main();