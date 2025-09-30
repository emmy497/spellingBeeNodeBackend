import joi from "joi";

export const registerValidationSchema = joi.object({
  username: joi.string().min(2).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(30).required(),
});


export const loginValidationSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(30).required(),
});