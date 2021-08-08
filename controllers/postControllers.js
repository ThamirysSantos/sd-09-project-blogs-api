const postServices = require('../services/postServices');

const created = 201;

const createNewPost = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const newPost = { title, content, categoryIds };
    const email = req.user;
    console.log(req, 'REQQQQQ---------');
    const postCreated = await postServices.createNewPost(newPost, email);
    return res.status(created).json(postCreated);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createNewPost,
};