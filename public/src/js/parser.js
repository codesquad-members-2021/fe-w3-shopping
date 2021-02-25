export const slideParser = (data) => data.map((v) => v.imgurl);

export const moreParser = (data) =>
  data.map((v) => {
    return { imgurl: v.imgurl, title: v.text2, info: v.text };
  });
