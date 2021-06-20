import FileDataRepository from './cFileDataRepository';
import Converter, {IConverterOptions} from './cConverter';

export default class ConversionController{
  private fileDataRepository: FileDataRepository;
  private converter: Converter;

  constructor(){
    this.fileDataRepository = new FileDataRepository();
    this.converter = new Converter();
  }

  async createSVGByDirectory(directory: string, options: IConverterOptions){
    const [html5data, error] = await this.fileDataRepository.getHTML5DataFromDirectory(directory);
    if (error) 
      return [null, error];

    const [svg, error2] = await this.converter.getSVGFromHTML5Data(html5data, options);
    if (error2)
      return [null, error2];

    return [svg, null];
  }
}