import express from 'express';
import { JsonplaceholderController } from '../../controllers';
import { auth, validate } from '../../middlewares';
import { getPhotos, getPosts } from '../../validations';

const router = express.Router();

router.use('/jsonplaceholder', router);

router.get('/posts', auth(), validate(getPosts), JsonplaceholderController.handleGetPosts);
router.get('/photos', auth(), validate(getPhotos), JsonplaceholderController.handleGetPhotos);

export default router;
