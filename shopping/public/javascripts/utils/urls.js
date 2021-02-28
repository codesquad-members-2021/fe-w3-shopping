const server = (json) => `http://localhost:3000${json}`;

export const urls = {
  event: server("/event.json"),
  mileageList: server("/mileageList.json"),
  mallEventList: server("/mallEventList.json"),
  hotdeal: server("/hotdeal.json"),
  keyword: server("/keyword.json"),
  howRelate: server("/how__relate.json"),
  howSame: server("/how__same.json"),
  partners: server("/partners.json"),
};
