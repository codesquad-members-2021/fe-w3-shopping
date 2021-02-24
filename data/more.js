const more1 = require('./more/more1.json');
const more2 = require('./more/more2.json');
const more3 = require('./more/more3.json');
const more4 = require('./more/more4.json');
const more5 = require('./more/more5.json');

const moreData = [...more1.contents, ...more2.contents, ...more3.contents, ...more4.contents, ...more5.contents];

module.exports = moreData;