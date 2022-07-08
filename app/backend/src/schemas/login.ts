import * as Joi from 'joi';

const loginSchema = Joi.object({
  // email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  // password: Joi.string().min(6).required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export default loginSchema;
