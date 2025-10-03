
const isAuthenticated = (req, res, next) => {
	const WHITELIST = [
		"/auth/login",
		"/auth/register",
	]

	try {
		// Whitelist check
		if (WHITELIST.includes(req.url))
			return next()

		// Signature check
		jwt.verify(req.header.token, 'shhhhh')
		return next()

	} catch(err) {
		return res.status(401).send('Fuck you')
	}
}

export default isAuthenticated