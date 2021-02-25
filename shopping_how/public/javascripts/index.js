import { FileReader } from "./painter.js";

class Main {
    constructor(fileReader){
        this.fileReader = fileReader;
        this.init()
    }
    init(){
        this.fileReader.getFileData();
    }
}

const FILEREADER = new FileReader();
const MAIN = new Main(FILEREADER);
