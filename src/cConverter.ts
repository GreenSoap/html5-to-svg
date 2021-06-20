import { IHTML5Data } from './iFile';
import { writeFile, getPromise } from './util';

export interface IConverterOptions{
  outPath?: string,
  width?: string,
  height?: string
}

export default class Converter{
  /**
   *
   *
   * @param {IHTML5Data} db
   * @param {IConverterOptions} options
   * @return {*} 
   * @memberof Converter
   */
  async getSVGFromHTML5Data(db: IHTML5Data, options: IConverterOptions){
    const outPath = (options.outPath == undefined) ? '/output.svg' : options.outPath;

    const svg = `
    <!-- Created with html5-to-svg (https://github.com/greensoap/html5-to-svg-->
    <svg xmlns="http://www.w3.org/2000/svg">
      <script>${db.js.data}</script>
      <style>${db.css.data}</style>
      <foreignObject x="0" y="0" width="100%" height="100%">
        <main id="generated-svg-html" xmlns="http://www.w3.org/1999/xhtml" xmlns:xlink="http://www.w3.org/1999/xlink">
          ${db.html.data}
        </main>
      </foreignObject>
    </svg>`.replace(/[\s](?=[^a-z\>]*?(?:\<|$))/g, '');

    const [success, error] = await getPromise(writeFile(outPath, svg));
    return (error) ? [null, error] : [svg, null];
  }
}