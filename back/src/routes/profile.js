import express from 'express';
import upload from '../middleware/upload.js';
import { validateProfileUpdate } from '../middleware/validate.js';
import { update } from '../controllers/profile.js'

const router = express.Router()

router.patch(
    '/update',
    upload.single('avatar'),
    validateProfileUpdate,
    update
)

export default router
