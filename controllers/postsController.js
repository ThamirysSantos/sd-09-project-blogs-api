const { newCategory, getCategories, newPost, getPosts } = require('../services/postsServices');

const createCategory = async (req, res, _next) => {
  const category = req.body;
  const token = req.headers.authorization;
  const data = { category, token };

  const create = await newCategory(data);

  if (create.status) return res.status(create.status).json({ message: create.message });
  return res.status(201).json(create);
};

const getAllCategories = async (req, res, _next) => {
  const token = req.headers.authorization;

  const categoriesList = await getCategories(token);

  if (categoriesList.status) {
    return res.status(categoriesList.status)
    .json({ message: categoriesList.message });
  }

  return res.status(200).json(categoriesList);
};

const createPost = async (req, res, _next) => {
  const postData = req.body;
  const token = req.headers.authorization;
  
  const create = await newPost(postData, token);
  if (create.status) return res.status(create.status).json({ message: create.message });

return res.status(201).json(create);
 };

 const getAllPosts = async (req, res, _next) => {
  const token = req.headers.authorization;

  const allPosts = await getPosts(token);
  if (allPosts.status) return res.status(allPosts.status).json({ message: allPosts.message });

  return res.status(200).json(allPosts);
 };

module.exports = {
  createCategory,
  getAllCategories,
  createPost,
  getAllPosts,
};