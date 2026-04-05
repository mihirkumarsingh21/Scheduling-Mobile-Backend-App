import Joi from "joi";

export const providerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  category: Joi.string()
  .uppercase()
    .valid("DOCTOR", "BARBER", "TRAINER")
    .required(),
  image: Joi.string().uri().optional(),
  description: Joi.string().max(200).optional(),
});

