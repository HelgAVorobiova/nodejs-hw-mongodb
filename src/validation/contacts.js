import Joi from 'joi';
import { contactTypeList } from '../constants/contacts.js';

export const contactAddShema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'any.required': 'You need to write down the name',
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters',
    'string.max': 'Name must be at most 20 characters',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Phone number must be at least 3 characters',
    'string.max': 'Phone number must be at most 20 characters',
  }),
  email: Joi.string().min(3).max(20).messages({
    'string.min': 'Email must be at least 3 characters',
    'string.max': 'Email must be at most 20 characters',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...contactTypeList),
});

export const contactUpdateShema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters',
    'string.max': 'Name must be at most 20 characters',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.min': ' Phone number must be at least 3 characters',
    'string.max': 'Phone number must be at most 20 characters',
  }),
  email: Joi.string().min(3).max(20).messages({
    'string.min': 'Email must be at least 3 characters',
    'string.max': 'Email must be at most 20 characters',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...contactTypeList),
});
