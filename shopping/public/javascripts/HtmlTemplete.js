const listHTML = (imgurl, text, text2) => {
  return `<li class="shoppinglist">
            <img src="${imgurl}">
            <strong>
                ${text}
            </strong>
            <span>
                ${text2}
            </span>
        </li>`;
};

export default listHTML;
