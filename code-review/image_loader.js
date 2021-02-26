import {_} from './util.js'

export class ImageLoader{
    constructor(selectors, json){
        this.slideItems = selectors.slideItems;
        this.seeMore = selectors.seeMore;
        this.secondContent = selectors.secondContent
        this.mileageList = json.mileageList;
        this.mallEventList = json.mallEventList;
        this.init()
    }

    init(){
        this.renderSlide()
        this.render2ndContent()
        _.E(this.seeMore, 'click', this.render2ndContent.bind(this))
    }

    renderSlide(){
        this.slideItems.forEach((v,i) => {
            v.innerHTML = `<img src="${this.mileageList[i].imgurl}" alt="slide${i}">`
        });
    }

    render2ndContent(){
        const index = new Array(4).fill().map(()=>this.getRandomNumber(this.mallEventList.length-1))
        const template = `<ul class="_2nd-content--list">
        <li>
          <img src="${this.mallEventList[index[0]].imgurl}" alt="">
          <div class="_2nd-content--title">${this.mallEventList[index[0]].text}</div>
          <div class="_2nd-content--description">${this.mallEventList[index[0]].text2}</div>
        </li>
        <li>
          <img src="${this.mallEventList[index[1]].imgurl}" alt="">
          <div class="_2nd-content--title">${this.mallEventList[index[1]].text}</div>
          <div class="_2nd-content--description">${this.mallEventList[index[1]].text2}</div>
        </li>
        <li>
          <img src="${this.mallEventList[index[2]].imgurl}" alt="">
          <div class="_2nd-content--title">${this.mallEventList[index[2]].text}</div>
          <div class="_2nd-content--description">${this.mallEventList[index[2]].text2}</div>
        </li>
        <li>
          <img src="${this.mallEventList[index[3]].imgurl}" alt="">
          <div class="_2nd-content--title">${this.mallEventList[index[3]].text}</div>
          <div class="_2nd-content--description">${this.mallEventList[index[3]].text2}</div>
        </li>
      </ul>`
      this.secondContent.innerHTML += template
    }

    getRandomNumber(max){
        return Math.floor(Math.random()*(max+1))
    }

}