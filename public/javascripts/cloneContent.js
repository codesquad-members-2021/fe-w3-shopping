const $carousel = document.querySelector(".item__carousel-wrap");
const cloneContent = () => {
  console.log(3);
  const clonedFirstChild = $carousel.firstElementChild.cloneNode(true);
  clonedFirstChild.id = "firstClone";
  const clonedLastChild = $carousel.lastElementChild.cloneNode(true);
  clonedLastChild.id = "lastClone";
  $carousel.insertBefore(clonedFirstChild, null);
  $carousel.insertBefore(clonedLastChild, $carousel.firstElementChild);
};

export default cloneContent;
