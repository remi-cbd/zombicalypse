import express from 'express';
import { validateLogin, validateRegister, validateResetPassword } from '../middleware/validate.js';
import { login, register, resetPassword } from '../controllers/auth.js'

const router = express.Router()

router.post('/login', validateLogin, login)
router.post('/register', validateRegister, register)
router.post('/resetPassword', validateResetPassword, resetPassword)

export default router
