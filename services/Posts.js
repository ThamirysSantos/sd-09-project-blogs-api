const { BlogPost, User, Category } = require('../models');

const {
  RequestValidator,
  CategoriesValid,
  CustomError,
} = require('../middlewares');
const postSchema = require('../schemas/postSchema');

const addPost = async (postInfo, userInfo) => {
  RequestValidator(postSchema, postInfo);
  const { categoryIds, ...otherPostInfo } = postInfo;
  await CategoriesValid(categoryIds);
  try {
    const newPost = await BlogPost.create(otherPostInfo, userInfo);
    const { published, updated, ...newPostInfo } = newPost;
    return newPostInfo;
  } catch (err) {
    throw new CustomError('Internal error server', 500);
  }
};

const getAllPosts = async () => {
  try {
    const allPosts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Category, as: 'categories' },
      ],
    });
    return allPosts;
  } catch (err) {
    throw new CustomError('Internal error server', 500);
  }
};

const getPostById = async (id) => {
  const postById = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { excludes: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!postById) throw new CustomError('Post does not exist', 404);
  return postById;
};

module.exports = {
  addPost,
  getAllPosts,
  getPostById,
};
