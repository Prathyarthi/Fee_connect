import express from 'express'
import { adminMiddleware, isLoggedIn } from '../middlewares/authMiddleware'
import { getAllPayments, payFee, paymentDetailsById } from '../controllers/paymentController';

const router = express.Router()

router.get('/getAllPayments', isLoggedIn, adminMiddleware, getAllPayments);
router.get('/paymentDetailsById/:studentId', isLoggedIn, paymentDetailsById)
router.get('/payFee', isLoggedIn, payFee)

export default router