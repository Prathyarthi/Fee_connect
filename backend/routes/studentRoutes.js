import express from 'express'
import { createStudent, getAllStudents, getStudentById } from '../controllers/studentController.js'
import { adminMiddleware, authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post("/createStudent", authMiddleware, adminMiddleware('ADMIN'), createStudent);
router.get("/getAllStudents", authMiddleware, adminMiddleware('ADMIN'), getAllStudents);
router.get("/getStudentById/:id", authMiddleware, getStudentById);

export default router    