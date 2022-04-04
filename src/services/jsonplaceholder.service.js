import axios from 'axios';
import { config } from '../config';

const getPosts = async (page = 0, size = 10) => {
  const posts = await axios.get(`${config.JsonplaceholderUrl}/posts`);

  return posts.data.slice(page * size, (page + 1) * size);
};

const getPhotos = async (page = 0, size = 10) => {
  const photos = await axios.get(`${config.JsonplaceholderUrl}/photos`);

  return photos.data.slice(page * size, (page + 1) * size);
};

export default { getPosts, getPhotos };
