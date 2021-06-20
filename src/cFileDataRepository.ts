import path from 'path';
import { getPromise, readDir, readFile } from './util';
import { IFileObject, IHTML5Data } from './iFile'

export default class FileDataRepository{
  private db: IHTML5Data = {
    css: {
      extensions: ['.css'],
      data: []
    },
    html: {
      extensions: ['.html', '.htm'],
      data: []
    },
    js: {
      extensions: ['.js'],
      data: []
    }
  };

  private validExtensions: Array<string> = this.db.css.extensions.concat(this.db.html.extensions, this.db.js.extensions);

  /**
   *  
   * Reads the HTML5 files from the given directory
   * and puts the data in the corresponding class array.
   *
   * @param {string} directory
   * @return {*} 
   * @memberof FileDataRepository
   */
  async getHTML5DataFromDirectory(directory: string = './'){
    // Read the directory
    const [files, error] = await getPromise(readDir(directory, { encoding: 'utf-8' }));
    if (error)
      return [null, error];
    
    const fileStrings = <Array<string>>files;

    await Promise.all(fileStrings.map(async (fileStr) => {

      //Split the string into properties
      const fileObj = <IFileObject>{
        name: path.parse(fileStr).name, 
        ext: path.parse(fileStr).ext,
        path: path.resolve(directory, fileStr)
      };

      //Skip this iteration if the file extension is not HTML5.
      if (!this.validExtensions.includes(fileObj.ext))
        return;
      
      //Read the file data
      const [data, error] = await getPromise(readFile(fileObj.path, 'UTF-8'));
      if (error)
        throw error;
      
      switch (fileObj.ext){
        case this.validExtensions[0]: this.db.css.data.push(data); break;
        case this.validExtensions[1]: case this.validExtensions[2]: this.db.html.data.push(data); break;
        case this.validExtensions[3]: this.db.js.data.push(data); break;
      }
    }))
    .catch((error: Error) => {
      return [null, error];
    });

    return [this.getHTML5Data(), null];
  }

  /**
   *
   *
   * @return {*}  {IFileDatas}
   * @memberof FileDataRepository
   */
  getHTML5Data(): IHTML5Data{
    return this.db;
  }
}