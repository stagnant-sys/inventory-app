const Item = require('../models/item');
const Category = require('../models/category');

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");


// GET request for creating category
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send('Not implemented: GET category create.')
});


// POST request for creating category
exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send('Not implemented: POST category create.')
});


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


// GET request for category detail
exports.category_detail = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented: GET category ${req.params.id} detail.`)
});


// GET request for list of all categories
exports.category_list = asyncHandler(async (req, res, next) => {
  res.send('Not implemented: GET category list.')
});
