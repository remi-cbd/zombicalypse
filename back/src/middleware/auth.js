import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
	const WHITELIST = [
		"/auth/login",
		"/auth/register",
		"/auth/request-password-reset"
	]

	console.log(`req.url = ${req.url}`)
	if (WHITELIST.includes(req.url))
		return next()

	const token = req.cookies.authToken
	if (!token)
		return res.status(401).send()

	try {
		const decoded = jwt.verify(token, process.env.BACK_AUTH_SECRET)
		req.user = decoded.user
		return next()
	} catch (error) {
		console.log(`error: ${error}`)
		return res.status(401).send()
	}
}

export default isAuthenticated
