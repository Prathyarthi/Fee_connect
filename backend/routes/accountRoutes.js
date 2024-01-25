import express from 'express'
import { getBalance } from '../controllers/accountController.js'
import { authMiddleware } from '../middlewares/userMiddleware.js'

const router = express.Router()

router.get('/getBalance', authMiddleware, getBalance)

export default router