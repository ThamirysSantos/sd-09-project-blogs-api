const BlogPostsServices = require('../services/BlogPostsServices');

const getAll = async (_req, res) => {
    try {
        const posts = await BlogPostsServices.getAll();
        return res.status(200).json(posts);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Ocorreu um erro' });
    }
};

const addPost = async (req, res) => {
    const post = await BlogPostsServices.addPost(req.body);
    if (post.message === undefined) {
        return res.status(201).json(post);
    }
    if (post.message === '"0" must be one of [1, 2]') {
        return res.status(400).json({ message: '"categoryIds" not found' });
    }
    return res.status(400).json(post);
};

module.exports = { getAll, addPost };