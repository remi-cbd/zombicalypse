import joi from 'joi'

// Schemas
const name = joi.string().min(2).max(80).pattern(/^[A-Za-z\s]+$/)
const email = joi.string().email()
const password = joi.string()
	.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]).{8,}$/)
	.message('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.')

// Middleware
const validateLogin = (req, res, next) => {
	const schema = joi.object({
		email: email.required(),
		password: password.required()
	})

	const { error } = schema.validate(req.body)
	if (error)
		return res.status(400).json({ error: error.details[0].message })

	next()
}

const validateRegister = (req, res, next) => {
	const schema = joi.object({
		name: name.required(),
		email: email.required(),
		password: password.required()
	}).unknown(true)

	const { error } = schema.validate(req.body)
	if (error)
		return res.status(400).json({ error: error.details[0].message })

	next();
}

const validateResetPassword = (req, res, next) => {
	const schema = joi.object({
		email: email.required(),
	})

	const { error } = schema.validate(req.body)
	if (error)
		return res.status(400).json({ error: error.details[0].message })

	next()
}

const validateProfileUpdate = (req, res, next) => {
	const schema = joi.object({
		name: name.optional()
	})

	const { error } = schema.validate(req.body)
	if (error)
		return res.status(400).json({ error: error.details[0].message })

	next()
}

export {
	validateLogin,
	validateRegister,
	validateResetPassword,
	validateProfileUpdate,
}