import * as fs from 'fs';

export const logger = (val:any) => {
  console.log(val);
}

export const readFileLineByLine = (pathToFile: string) => {
  const arr = fs.readFileSync(pathToFile).toString().split('\n');
  return arr.filter((entry) => entry !== '');
}