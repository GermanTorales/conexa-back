import httpStatus from 'http-status';
import { JsonplaceholderService } from '../services';

const handleGetPosts = async (req, res, next) => {
  try {
    const { page, size } = req.query;
    const data = await JsonplaceholderService.getPosts(page, size);
    const prev = page ? page - 1 : null;

    return res.status(httpStatus.OK).json({ length: data.length, current: page, prev, next: page + 1, data });
  } catch (error) {
    next(error);
  }
};

const handleGetPhotos = async (req, res, next) => {
  try {
    const { page, size } = req.query;
    const data = await JsonplaceholderService.getPhotos(page, size);
    const prev = page ? page - 1 : null;

    return res.status(httpStatus.OK).json({ length: data.length, current: page, prev, next: page + 1, data });
  } catch (error) {
    next(error);
  }
};

export default { handleGetPosts, handleGetPhotos };
