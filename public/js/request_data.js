import {
   LoaderFromJson
} from "./data_loader.js";

export class RequestData {
   constructor(requestUrl, requestInfo, value) {
      this.requestUrl = requestUrl;
      this.requestInfo = requestInfo;
      this.value = value;
      this.request();
   }

   request() {
      return new LoaderFromJson(this.requestUrl, this.requestInfo, this.value)
   }
}