import fs from 'fs';
import { promisify } from 'util';

const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
/**
 *
 * Wrapper function for promises to avoid try/catch.
 * 
 * @param {Promise<any>} promise
 * @return {[any, Error]} 
 */
async function getPromise(promise: Promise<any>): Promise<any>{
  try {
    const data = await promise;
    return [data, null];
  } catch (error){
    return [null, error];
  }
}

export {
  getPromise,
  readDir,
  readFile,
  writeFile
}
