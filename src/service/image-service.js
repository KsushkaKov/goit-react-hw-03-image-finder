import axios from 'axios';

const API_KEY = '31491040-c2125b003247a5f99763e28c8';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImages = async (query, page) => {
  const params = {
    q: query,
    page: page,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  };
  const { data } = await axios.get(`${axios.defaults.baseURL}`, { params });

  //   const totalPages = Math.ceil(data.totalHits / params.per_page);
  return data;
};
