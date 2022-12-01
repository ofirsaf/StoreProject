const joi = require("joi");
const mongoose = require("mongoose");
const _ = require("lodash");
const { User } = require("./users");
const Joi = require("joi");

const prodSchema = new mongoose.Schema({
  prodTitle: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  prodDescription: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  prodQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  prodPrice: {
    type: Number,
    required: true,
    min: 0,
    max: 9_999_999_999,
  },
  prodImage: {
    type: String,
    minlength: 11,
    maxlength: 1024,
  },
  prodNumber: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 9_999_999_999,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Product = mongoose.model("product", prodSchema);

const prodjoiSchema = joi.object({
  prodTitle: joi.string().min(2).max(255).required(),
  prodDescription: joi.string().min(2).max(1024).required(),
  prodPrice: joi.number().min(0).max(9_999_999_999).required(),
  prodImage: Joi.string(),
  prodQuantity: joi.number().min(0).required(),
});

const generateProdNumber = async () => {
  while (true) {
    let randomNumber = _.random(100, 9_999_999_999);
    let prod = await Product.findOne({ prodNumber: randomNumber });
    if (!prod) {
      return String(randomNumber);
    }
  } //uuid
};

const validateProduct = (prod) => prodjoiSchema.validate(prod);

module.exports = {
  Product,
  validateProduct,
  generateProdNumber,
};
