import httpStatus from 'http-status';
import { JsonplaceholderService } from '../services';

const handleGetPosts = async (req, res, next) => {
  try {
    const { page, size } = req.query;
    const posts = await JsonplaceholderService.getPosts(page, size);

    return res.status(httpStatus.OK).json({ length: posts.length, current: page, prev: page - 1, next: page + 1, posts });
  } catch (error) {
    next(error);
  }
};

export default { handleGetPosts };
