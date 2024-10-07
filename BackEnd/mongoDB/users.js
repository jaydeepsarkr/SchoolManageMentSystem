const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  gender: {
    type: String,
    required: true,
    minlength: 4,
  },
  address: {
    type: String,
    trim: true,
    maxlength: 50,
  },
  mobile: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("users", userSchema);

// Joi schema for validation
const validateUser = (userData) => {
  const schema = Joi.object({
    name: Joi.string().trim().max(20).required(),
    email: Joi.string().email().trim().required().lowercase(),
    gender: Joi.string().min(4).required(),
    address: Joi.string().trim().max(20).optional(),
    mobile: Joi.number().required(),
  });

  return schema.validate(userData);
};

const loginSignupSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  signupDate: {
    type: Date,
    default: Date.now,
  },
});

const LoginSignup = mongoose.model("loginsignups", loginSignupSchema);

const validateLoginSignup = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().required().lowercase(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports = { User, validateUser, LoginSignup, validateLoginSignup };
