#! /usr/bin/env node
import yargs, { Argv } from "yargs";
import ConversionController from './cConversionController';


const args = yargs
  .scriptName('html5-to-svg')
  .example('$0 --dir "./foo" --out "./bar.svg"', 'Bakes the conents of the HTML, CSS and JS files from ./foo into bar.svg')
  .option('out', {
    alias: 'O',
    type: 'string',
    description: 'The output path of the SVG. Defaults to ./out.svg',
    default: '/output.svg',
    demandOption: true
  })
  .option('dir', {
    alias: 'D',
    type: 'string',
    description: 'Path to the directory containing the HTML, CSS and JS you want to bake into the SVG. Defaults to root',
    default: './',
    demandOption: true
  })
  .alias('H', 'help')
  .alias('V', 'version')
  .help()
  .epilog('https://github.com/greensoap/html5-to-svg')
  .argv

async function run(){
  const arge = await args;

  const conversionController = new ConversionController();
  
  const [svg, error] = await conversionController.createSVGByDirectory(arge.dir, {
    outPath: arge.out
  })

  console.log((error) ? error : `Success, SVG created from ${arge.dir} at ${arge.out}`);
}

run();