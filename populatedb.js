#! /usr/bin/env node

console.log(
  'This script populates some test items and categories to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require('./models/category');

const items = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description) {
  const category = new Category({name: name, description: description})
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function itemCreate(index, name, description, category, price, number_in_stock, image) {
  const itemdetail = {
    name: name,
    description: description,
    category: category,
    price: price,
    number_in_stock: number_in_stock,
    image: image
  };
  if (category) itemdetail.category = category;

  const item = new Item(itemdetail);
  await item.save()
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log('Adding categories...');
  await Promise.all([
    categoryCreate(0, "Animaux", "Peluches d'animaux"),
    categoryCreate(1, "Végétaux", "Peluche de fruits, légumes et plantes"),
    categoryCreate(2, "Nourriture", "Peluches en forme de nourriture"),
  ])
};

async function createItems() {
  console.log('Adding items...');
  await Promise.all([
    itemCreate(0, 'Silly Sushi', 'Jellycat Peluche Silly Sushi California 11cm', categories[2], 21, 2, "https://www.planethappy.ch/resize/0670983113440_2_8176264462906.jpg/500/500/True/jellycat-peluche-silly-sushi-california-11cm.jpg"),
    itemCreate(1, 'Burger', 'Jellycat Peluche Amuseable Burger - 11x11x11cm', categories[2], 33, 1, 'https://www.planethappy.ch/resize/a2bu_8138764465226.jpg/500/500/True/jellycat-peluche-amuseable-burger-11x11x11cm.jpg'),
    itemCreate(2, 'Ricky Grenouille', '', categories[0], 29, 3, 'https://www.planethappy.ch/resize/0670983133899_2_7551264522383.jpg/500/500/True/jellycat-ricky-grenouille-de-pluie-13x17cm.jpg'),
    itemCreate(3, 'Wavelly Baleine Bleue', 'Jellycat Peluche Wavelly Baleine Bleue - 5x15x6cm', categories[0], 15, 2, 'https://www.planethappy.ch/resize/wav6b_8138764469768.jpg/500/500/True/jellycat-peluche-wavelly-baleine-bleue-5x15x6cm.jpg'),
  ])
}
