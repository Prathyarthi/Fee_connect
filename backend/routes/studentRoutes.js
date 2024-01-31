import express from 'express'
import { createStudent, getAllStudents, getStudentById } from '../controllers/studentController.js'
import { adminMiddleware, isLoggedIn } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post("/createStudent", isLoggedIn, adminMiddleware('ADMIN'), createStudent);
router.get("/getAllStudents", isLoggedIn, adminMiddleware('ADMIN'), getAllStudents);
router.get("/getStudentById/:id", isLoggedIn, getStudentById);

export default router    