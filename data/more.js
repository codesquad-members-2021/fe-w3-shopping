const more1 = require('./json/more1.json');
const more2 = require('./json/more2.json');
const more3 = require('./json/more3.json');
const more4 = require('./json/more4.json');
const more5 = require('./json/more5.json');

const moreData = [...more1.contents, ...more2.contents, ...more3.contents, ...more4.contents, ...more5.contents];

module.exports = moreData;