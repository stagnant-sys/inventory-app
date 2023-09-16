const Item = require('../models/item');
const Category = require('../models/category');

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// GET request for list of all items
exports.items_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({})
    .sort({ name: 1 })
    .populate("category")
    .exec();
  res.render("items_list", { title: 'All items', items_list: allItems })
});


// GET request for item detail
exports.item_detail = asyncHandler(async (req, res, next) => {
  const item_detail = await Item.findById(req.params.id).populate("category").exec();
  res.render("item_detail", { title: 'Item detail', item_detail: item_detail })
});


// GET request for creating item
exports.item_create_get = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}).exec();
  res.render('item_form', { title: 'Create item', allCategories });
});


// POST request for creating item
exports.item_create_post = [
  body("name", "Name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description")
    .optional({ values : "falsy"})
    .trim()
    .escape(),
  body("category", "Category must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must be defined")
    .isInt()
    .trim()
    .escape(),
  body("number_in_stock", "Number in stock must be defined")
    .isInt()
    .trim()
    .escape(),
  body("image")
    .optional({ values: "falsy "})
    .trim(),
    
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
      image: req.body.image,
    })

    if (!errors.isEmpty()) {
      const allCategories = await Category.find({}).exec(); 
      res.render("item_form", {
        title: "Create item",
        item: item,
        allCategories: allCategories,
        selected_category: item.category._id,
        errors: errors.array(),
      });
      return;
    } else {
      await item.save();
      res.redirect(item.url);
    }
  })
]

// GET request to delete item
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented: GET delete item ${req.params.id}`)
});


// POST request to delete item
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented: POST delete item ${req.params.id}`)
});


// GET request to update item
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented: GET update item ${req.params.id}`)
});


// POST request to update item
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented: POST update item ${req.params.id}`)
});