import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
	const WHITELIST = [
		"/auth/login",
		"/auth/register",
		"/auth/request-password-reset"
	]

	try {
		if (WHITELIST.includes(req.url))
			return next()

		const decoded = jwt.verify(req.header.token, process.env.BACK_AUTH_SECRET)
		req.user = { uuid: decoded.uuid }

		return next()
	} catch(err) {
		return res.status(401).send()
	}
}

export default isAuthenticated
