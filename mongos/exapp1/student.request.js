const Joi = require("joi");

const schema = Joi.object().keys({
  _id: Joi.string().optional(),
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(3).max(30).required(),
  age: Joi.number().min(0).max(200).required(),
  city: Joi.string().valid(
    ...["Dhaka", "Chittagong", "Rajshahi", "Khulna", "Sylhet"]
  ),
});

const validate = (data) => {
  const result = schema.validate(data);
  return result;
};

module.exports = { validate };
