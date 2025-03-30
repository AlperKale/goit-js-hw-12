import axios from 'axios';

const API_KEY = '49461257-d92cdcbbc0ac75fcae3d36a6d';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(inputValue, page) {
  const { data } = await axios(BASE_URL, {
    params: {
      key: API_KEY,
      q: inputValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 15,
    },
  });

  return data;
}