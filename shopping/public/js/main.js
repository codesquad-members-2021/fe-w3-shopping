import { _ } from './util.js'
import { Slide } from './slide.js'
import { ImageLoader } from './image_loader.js'

const selectors = {
    wrapper: _.$('.slide--wrapper'),
    slideItems: _.$A('.slide--item'),
    leftButton: _.$('.left-button'),
    rightButton: _.$('.right-button'),
    scrollButtons : _.$A('.scroll-button'),
    seeMore: _.$('.main__see-more-button'),
    secondContent : _.$('.main__2nd-content')
}

fetch("http://localhost:3000/planningEvent.json")
    .then(response => response.json())
    .then(json => {
        new ImageLoader(selectors, json)
        new Slide(selectors)
    });
