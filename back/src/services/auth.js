import jwt from 'jsonwebtoken';
import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto'
import * as db from '../services/db.js'

const login = async (req, res) => {
	const { email, password } = req.body

	const user = await db.getUserByEmail(email)
	if (!user)
		return res.status(401).send()

	const [salt, key] = user.password.split(':')
	const hashedBuffer = scryptSync(password, salt, 64)
	const keyBuffer = Buffer.from(key, 'hex')
	if (!timingSafeEqual(hashedBuffer, keyBuffer))
		return res.status(401).send()

	const token = jwt.sign({ foo: 'bar' }, process.env.BACK_AUTH_SECRET)

	return res.status(200).json({ uid: user.uid, token })
}

const register = async (req, res) => {
	const { name, email, password } = req.body

	const user = await db.getUserByEmail(email)
	if (user)
		return res.status(409).send()

	const salt = randomBytes(16).toString('hex')
	const hashedPassword = scryptSync(password, salt, 64).toString('hex')
	const dbPassword = `${salt}:${hashedPassword}`

	db.addUser(name, email, dbPassword)

	return res.status(201).send()
}

const resetPassword = async (req, res) => {
	const { email } = req.body

	const user = await db.getUserByEmail(email)
	if (!user)
		return res.status(401).send()

	const token = randomBytes(16).toString('hex')

	db.resetPasswordToken(user.id, token)

	const resetLink = `${process.env.BACK_RESET_LINK_BASE}?token=${token}`;
	const payload = {
		service_id: process.env.BACK_EMAILJS_SERVICE_ID,
		template_id: process.env.BACK_EMAILJS_TEMPLATE_ID,
		user_id: process.env.BACK_EMAILJS_PUBLIC_KEY,
		template_params: {
			to_email: user.email,
			reset_link: resetLink,
		}
	}

	try {
		const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		})
		if (!response.ok) {
			const errorData = await response.text()
			console.error('EmailJS error:', errorData)
			return res.status(500).send('Failed to send email')
		}
		return res.status(200).send()
	} catch (err) {
		console.error('Error sending email:', err)
		return res.status(500).send('Server error')
	}
}

export {
	login,
	register,
	resetPassword
}
