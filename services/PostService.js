const Joi = require('joi');
const { BlogPost, User, Categorie } = require('../models');
const { errorHandling, existingCategory } = require('../utils');

const schemaCreatePost = Joi.object({
  title: Joi.required(),
  content: Joi.required(),
  categoryIds: Joi.required(),
});

const createPost = async (title, content, categoryIds, userId) => {
  const { error } = schemaCreatePost.validate({ title, content, categoryIds });

  if (error) {
    throw errorHandling(400, error.details[0].message);
  }

  const existing = await existingCategory(categoryIds);

  console.log(existing);

  if (!existing) {
    throw errorHandling(400, '"categoryIds" not found');
  }

  const newPost = await BlogPost.create({ title, content, userId });

  const { updated: _, published: __, ...UserWithoutTime } = newPost.dataValues;

  return UserWithoutTime;
};

const getAllPost = async () => {
  const posts = await BlogPost.findAll({ include: [
    { model: User, as: 'user', attributes: { excludes: ['password'] } },
    { model: Categorie, as: 'categories', through: { attributes: [] } },
  ] });

  return posts;
};

module.exports = {
  createPost,
  getAllPost,
};