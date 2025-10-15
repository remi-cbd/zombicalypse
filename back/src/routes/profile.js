import express from 'express';
import upload from '../middleware/upload.js';
import { validateProfileUpdate } from '../middleware/validate.js';
import { get, update } from '../controllers/profile.js'

const router = express.Router()

router.get('/', get)
router.patch(
    '/update',
    upload.single('avatar'),
    validateProfileUpdate,
    update
)

export default router
