import _ from "./utils.js";

export default class Slider {
    constructor(banner){
       
        this.inner_paging = _.$(".inner_paging",banner);
        this.btns = _.$A("button",this.inner_paging);

    }


}