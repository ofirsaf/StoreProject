import Joi from "joi-browser";
const validateRegister = {
  name: Joi.string().min(2).max(255).required(),
  email: Joi.string().min(6).max(64).email().required(),
  password: Joi.string().min(8).max(1024).required(),
  isBiz: Joi.boolean().required(),
  confirmPassword: Joi.ref("password"),
};
export default validateRegister;
