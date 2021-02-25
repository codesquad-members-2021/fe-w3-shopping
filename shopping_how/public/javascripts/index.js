import Painter from "./painter.js";

class Main {
    constructor(painter){
        this.painter = painter;
        this.init()
    }
    init(){
        this.painter.renderUI();
    }
}

const PAINTER = new Painter();
const MAIN = new Main(PAINTER);
