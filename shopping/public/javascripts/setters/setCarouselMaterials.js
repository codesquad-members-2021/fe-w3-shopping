export default function setCarouselMaterials(slideContents, buttonClassName, specifics, startNum) {
  return new Promise((resolve, reject) => {
    const buttons = document.querySelector(`.${buttonClassName}`);
    const { slideList, slideWidth } = specifics;
    const carouselMaterials = { slideContents, buttons, slideList, slideWidth, startNum };
    resolve(carouselMaterials);
  });
}
