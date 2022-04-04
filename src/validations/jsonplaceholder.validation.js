import Joi from 'joi';

export const getPosts = {
  query: Joi.object().keys({
    page: Joi.number().default(0),
    size: Joi.number().default(10),
  }),
};

export const getPhotos = {
  query: Joi.object().keys({
    page: Joi.number().default(0),
    size: Joi.number().default(10),
  }),
};
