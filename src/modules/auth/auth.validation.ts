import Joi from 'joi'

export const signSchema = Joi.object({
	id: Joi.string().required(),
	password: Joi.string().min(6).required(),
})
