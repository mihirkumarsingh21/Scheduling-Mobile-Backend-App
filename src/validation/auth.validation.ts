import Joi from "joi";
import { emailSchema, nameSchema, passwordSchema } from "./common.validation.js";

export const signupSchema = Joi.object({
  name: nameSchema.required().messages({
    "any.required": "Name is required",
  }),

  email: emailSchema.required().messages({
    "any.required": "Email is required",
  }),

  password: passwordSchema.required().messages({
    "any.required": "Password is required",
  }),
});

export const loginSchema = Joi.object({
  email: emailSchema.required().messages({
    "any.required": "Email is required",
  }),

  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});


export const forgotPasswordSchema = Joi.object({
  email: emailSchema,
});

export const resetPasswordSchema = Joi.object({
  token: Joi.string().required().messages({
    "string.empty": "Token is required",
  }),

  newPassword: passwordSchema,
});