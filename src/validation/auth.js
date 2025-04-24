import Joi from 'joi';
import { emailRegexp } from '../constants/auth.js';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters long',
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.empty': 'Email is required',
    'string.pattern.base':
      'Email must be a valid address like example@mail.com',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.empty': 'Email is required',
    'string.pattern.base':
      'Email must be a valid address like example@mail.com',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
});
export const requestResetEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.empty': 'Email is required',
    'string.pattern.base':
      'Email must be a valid address like example@mail.com',
  }),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});