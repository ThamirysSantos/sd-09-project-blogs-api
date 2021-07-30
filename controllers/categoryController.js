const rescue = require('express-rescue');
const validateToken = require('../middlewares/validateToken');
const categoryService = require('../services/categoryService');

const httpStatus = require('../middlewares/httpStatus');

const createCategory = [
  
  validateToken,
  rescue(async (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: '"name" is required' });
    }
    const category = await categoryService.createCategory(name);
    return res.status(httpStatus.CREATED).json(category);
  }),
];

const getAllCategories = [
  validateToken,
  rescue(async (_req, res) => {
    const categories = await categoryService.getAllCategories();
    return res.status(httpStatus.OK).json(categories);
  }),
];

module.exports = {
  createCategory,
  getAllCategories,
};