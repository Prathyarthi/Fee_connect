import express from 'express'
import { adminMiddleware, isLoggedIn } from '../middlewares/authMiddleware.js'
import { getAllPayments, payFee, paymentDetailsById } from '../controllers/paymentController.js';

const router = express.Router()

router.get('/getAllPayments', isLoggedIn, adminMiddleware, getAllPayments);
router.get('/paymentDetailsById/:studentId', isLoggedIn, paymentDetailsById)
router.post('/payFee', isLoggedIn, payFee)

export default router