import zod from 'zod'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Student } from '../models/studentModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { Payment } from '../models/paymentModel.js';

const createSchema = zod.object({
    semester: zod.number(1),
    usn: zod.string(10),
    department: zod.string(),
    phone: zod.string(10),
    seat: zod.string()
})


const createStudent = asyncHandler(async (req, res, next) => {
    const { semester, usn, department, phone, seat } = req.body;
    try {
    const createSchemaParsed = createSchema.safeParse(req.body)

    if (!createSchemaParsed.success) {
        throw new ApiError(400, "All fields are required")
    }

    const student = await Student.create({
        semester,
        usn,
        department,
        phone,
        seat
    })

    const studentExists = await Student.findOne({
        usn
    })

    // if (studentExists) {
    //     throw new ApiError(400, "Student already exists")
    // }

    if (!student) {
        throw new ApiError(400, "Couldn't create student")
    }

    await Payment.create({
        studentId:student._id,
        balance: 1 + Math.random() * 10000,
        // amountPaid
    })

    return res.json(
        new ApiResponse(200, "Student created successfully")
    )
    } catch (error) {
        console.log(error);  
        throw new ApiError(500, "Something went wrong", error)
    }
})

const getAllStudents = asyncHandler(async (req, res, next) => {
    const students = await Student.find({})

    if (!students) {
        throw new ApiError(400, 'Could not fetch all students!')
    }

    return res.json(
        new ApiResponse(200, students, "Students fetched successfully")
    )
})

const getStudentById = asyncHandler(async (req, res, next) => {
    const studentId = req.params.id
    console.log(studentId);

    try {
        const student = await Student.findById(studentId)

        console.log(student);
        if (!student) {
            throw new ApiError(400, "Student not found!")
        }

        return res.status(200).json(
            new ApiResponse(200, student, "Student details fetched!")
        )
    } catch (error) {
        console.log(error);
        throw new ApiError(400, "Something went wrong")
    }
})


export {
    createStudent,
    getAllStudents,
    getStudentById
}