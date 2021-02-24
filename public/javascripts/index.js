import _ from "./util.js";
import BodyControl from "./index/BodyControl.js";
import DataManager from "./index/DataManager.js"

const dataManager = new DataManager();
new BodyControl(dataManager).init();