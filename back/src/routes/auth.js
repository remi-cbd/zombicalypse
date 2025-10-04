import express from 'express';
import { login, register, resetPassword } from '../services/auth.js'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.post('/request-password-reset', resetPassword)

export default router
