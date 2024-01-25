import express from 'express'
import { getUser, signin, signup } from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/getUser', authMiddleware, getUser)

export default router