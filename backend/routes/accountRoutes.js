import express from 'express'
import { createFees, getAllFeeDetails, getBalance } from '../controllers/accountController.js'
import { isLoggedIn } from '../middlewares/userMiddleware.js'

const router = express.Router()

router.get('/getBalance', isLoggedIn, getBalance)
router.post('/createFees', isLoggedIn, adminMiddleware('ADMIN'), createFees);
router.get('/getAllFeeDetails', getAllFeeDetails);

export default router