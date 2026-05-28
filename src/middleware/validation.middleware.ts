import { Request, Response, NextFunction } from 'express';
import Joi, { Schema } from 'joi';

export const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: true });
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      res.status(400).json({
        success: false,
        message: `Validation Error: ${errorMessage}`,
      });
      return;
    }
    next();
  };
};

// Send Message Validation Schema
export const sendMessageSchema = Joi.object({
  sender_id: Joi.string().required().messages({
    'any.required': 'sender_id is required',
    'string.empty': 'sender_id cannot be empty',
  }),
  receiver_id: Joi.string().required().messages({
    'any.required': 'receiver_id is required',
    'string.empty': 'receiver_id cannot be empty',
  }),
  message: Joi.string().required().messages({
    'any.required': 'message content is required',
    'string.empty': 'message content cannot be empty',
  }),
});

// Update User Profile Validation Schema
export const updateUserSchema = Joi.object({
  name: Joi.string().optional().allow(''),
  phone: Joi.string().optional().allow(''),
  mobilenumber: Joi.string().optional().allow(''),
  mobileNumber: Joi.string().optional().allow(''),
});
