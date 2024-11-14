// models/menuItem.js
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  id : {type : Number, required:true},
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: {type : String},
  imageURL: { type: String } // Optional field for item images
});

const Menuitem = mongoose.model('Menuitem', menuItemSchema);

module.exports = Menuitem;
