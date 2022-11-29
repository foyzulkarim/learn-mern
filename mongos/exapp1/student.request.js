const Joi = require("joi");
const { BANGLADESH_CITIES } = require("./constant");

const schema = Joi.object().keys({
  _id: Joi.string().optional(),
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(3).max(30).required(),
  age: Joi.number().strict().min(0).max(200).required(),
  city: Joi.string().valid(...BANGLADESH_CITIES),
});

const validate = (data) => {
  const validationResult = schema.validate(data);
  // console.log("validate: ", validationResult);
  return true;
  // return validationResult;
};

module.exports = {
  validate,
};
