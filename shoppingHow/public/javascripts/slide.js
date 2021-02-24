function loadItems() {
  let datas = "";
  fetch("http://localhost:3000/homeContents.json")
    .then((response) => response.json())
    .then((data) => {
      datas = data.contents[0].eventContent.imgurl;
      console.log(datas);
      let slide = document.createElement("li");
      slide.innerHTML = `<img src=${datas}></img>`;
      document.querySelector(".slide_list").appendChild(slide);
    });
}

loadItems();
