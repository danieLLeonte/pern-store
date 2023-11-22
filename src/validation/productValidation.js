const Joi = require("joi");

const product = Joi.object().keys({
  name: Joi.string().min(3).max(40).required(),
  description: Joi.string().min(3).max(60).required(),
  price: Joi.number().min(1).required(),
  quantity: Joi.number().integer().min(1).required(),
});

module.exports = {
  product,
};
