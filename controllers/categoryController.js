const Item = require('../models/item');
const Category = require('../models/category');

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");


// GET request for list of all categories
exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({})
    .sort({ name: 1 })
    .exec();
  res.render('categories_list', { title: 'All Categories', allCategories: allCategories });
});


// GET request for category detail
exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, itemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);
  if (category === null) {
    const err = new Error('Category not found');
    err.status = 404;
    return next(err);
  }
  res.render('category_detail', { title: 'Category', category, itemsInCategory });
});


// GET request for creating category
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render('category_form', { title: 'Create category' });
});


// POST request for creating category
exports.category_create_post = [
  body('name', 'Name must contain at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('description', 'Description must contain at least 5 characters')
    .trim()
    .isLength({ min: 5 })
    .escape(),
    
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({ name: req.body.name, description: req.body.description })

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Create category',
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      const categoryExists = await Category.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (categoryExists) {
        res.redirect(categoryExists.url);
      } else {
        await category.save();
        res.redirect(category.url);
      }
    }
  })
];


// GET request to delete category
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented: GET category ${req.params.id} delete.`)
});


// POST request to delete category
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented: POST category ${req.params.id} delete.`)
});


// GET request to update category
exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented: GET category ${req.params.id} update.`)
});


// POST request to update category
exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented: POST category ${req.params.id} update.`)
});