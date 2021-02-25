/* --------------------------------------------------------------------- */
/* -----▶︎▶︎▶︎ Main 클래스: 프로그램을 시작시키고, 클래스들 간의 매개체가 된다. ◀︎◀︎◀︎-------*/
/* --------------------------------------------------------------------- */

/*
- [ ] Template 클래스 생성해서 templating으로 DOM 채우기 (첫화면)
*/

import { FileReader } from "./fileReader.js";

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
