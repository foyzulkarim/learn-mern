const Joi = require("joi");
const { BANGLADESH_CITIES } = require("./constant");

const createSchema = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(3).max(30).required(),
  age: Joi.number().min(0).max(200).required(),
  city: Joi.string().valid(...BANGLADESH_CITIES),
});

const updateSchema = Joi.object().keys({
  _id: Joi.string().required(),
  name: Joi.string().min(3).max(30).optional(),
  phone: Joi.string().min(3).max(30).optional(),
  age: Joi.number().min(0).max(200).optional(),
  city: Joi.string().valid(...BANGLADESH_CITIES),
});

const validateCreate = (data) => {
  const validationResult = createSchema.validate(data);
  console.log("create validate: ", validationResult);
  return validationResult;
};

const validateUpdate = (data) => {
  const validationResult = updateSchema.validate(data);
  console.log("update validate: ", validationResult);
  return validationResult;
};

module.exports = {
  validateCreate,
  validateUpdate,
};
