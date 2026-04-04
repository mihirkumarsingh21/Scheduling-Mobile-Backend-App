import Joi from "joi";

export const nameSchema = Joi.string()
  .min(3)
  .max(50)
  .pattern(/^[A-Za-z\s]+$/)
  .required()
  .messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.pattern.base": "Name should contain only letters",
  });

export const emailSchema = Joi.string()
  .email({ tlds: { allow: false } }) 
  .required()
  .messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  });

export const passwordSchema = Joi.string()
  .min(6)
  .max(20)
  .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/)
  .required()
  .messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "string.pattern.base":
      "Password must contain at least one letter and one number",
  });