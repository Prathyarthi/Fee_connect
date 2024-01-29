import express from 'express'
import { getUser, logout, signin, signup } from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/getUser', authMiddleware, getUser)
router.post('/logout', authMiddleware, logout)

export default router