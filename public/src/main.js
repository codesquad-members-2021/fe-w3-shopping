function loadItems() {
    return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);
}

function displayItems(items) {
    const mainStaticBox = document.querySelector('.static__img');
    // let static = items.filter(item => item.special === "best100");
    // console.log(static.image);
    // mainStaticBox.innerHTML = createHTMLString(static);
    // let static = items.map(item => item.category === "best100");
    // console.log(static);

    // if(item.special-category === "best100") {
    //     mainStaticBox.innerHTML = `<img src="${item.image}" alt="${item.category}" class="static__image" />`;
    // }
    mainStaticBox.innerHTML = items.map(item => createHTMLString(item));
}

function createHTMLString(item) {
    return `<img src="${item.image}" alt="${item.category}" class="static__image" />`;
}

loadItems()
  .then(items => {
    displayItems(items);
  })
  .catch(console.log);
