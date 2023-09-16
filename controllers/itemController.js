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
  res.send('Not implemented: GET create item')
});


// POST request for creating item
exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send('Not implemented: POST create item')
});


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