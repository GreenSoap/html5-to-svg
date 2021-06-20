interface IFileObject{
  name: string;
  ext: string;
  path: string;
}

interface IHTML5Data{
  css: {
    extensions: Array<string>,
    data: Array<string>
  },
  js: {
    extensions: Array<string>,
    data: Array<string>
  },
  html: {
    extensions: Array<string>,
    data: Array<string>
  }
}

export {
  IFileObject,
  IHTML5Data
}