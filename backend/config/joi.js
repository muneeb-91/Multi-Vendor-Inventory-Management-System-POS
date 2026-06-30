import JoiBase from "joi";

export const joi = JoiBase.defaults((schema) =>
  schema.messages({
    "any.required": "{{#label}} is required",
    "any.only": "{{#label}} is invalid",
  })
);