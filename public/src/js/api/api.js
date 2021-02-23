const request = (url, option = {}) => {
  return fetch(url)
    .then((res) => {
      if (!res.ok) return new Error(res.status);
      return res;
    })
    .catch((err) => console.error(err));
};

export const getBannerImage = (bannerId) => {
  return request(`/server_img/banner/${bannerId}.png`);
};

export const getHotItemImage = (itemId) => {
  return request(`/server_img/hotItem/${itemId}.jfif`);
};


export const getImage = (url) => {
  return fetch(url)
    .then((res) => {
      if (!res.ok) return new Error(res.status);
      return res;
    })
    .catch((err) => console.log(err));
};
