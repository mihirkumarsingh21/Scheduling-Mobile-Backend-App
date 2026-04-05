import Joi from "joi";

export const appointmentSchema = Joi.object({
  timeSlot: Joi.date().iso().required(),

  gender: Joi.string()
    .uppercase()
    .valid("MALE", "FEMALE", "OTHER")
    .required(),

  reason: Joi.string().max(200).optional(),
});