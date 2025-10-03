import express from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid'
import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto'

import db from '../db.js'
import { getUserByEmail } from '../services/auth.js';

const router = express.Router()

router.post('/login', async (req, res) => {
	const { email, password } = req.body

	const user = await getUserByEmail(email)
	if (!user)
		return res.status(400).send('unknown user')

	const [salt, key] = user.password.split(':')
	const hashedBuffer = scryptSync(password, salt, 64)
	const keyBuffer = Buffer.from(key, 'hex')
	if (!timingSafeEqual(hashedBuffer, keyBuffer))
		return res.status(401).send('login failed')

	const token = jwt.sign({ foo: 'bar' }, 'shhhhh')
	
	return res.status(200).send({ uid: user.uid, token })
})

router.post('/register', async (req, res) => {
	const { email, password } = req.body

	const user = await getUserByEmail(email)
	if (user)
	{
		res.status(400).send('email already used')
		return
	}

	const uid = uuidv4()

	const salt = randomBytes(16).toString('hex')
	const hashedPassword = scryptSync(password, salt, 64).toString('hex')
	const dbPassword = `${salt}:${hashedPassword}`

	await db.push("/users", [{
		uid: uid,
		email: email,
		password: dbPassword
    }], false)

	return res.status(200).send('user created')
})

export default router
