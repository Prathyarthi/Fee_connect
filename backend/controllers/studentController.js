import zod from 'zod'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Student } from '../models/studentModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const createSchema = zod.object({
    semester: zod.number(1),
    usn: zod.string(10),
    department: zod.string(),
    phone: zod.string(10)
})


const createStudent = asyncHandler(async (req, res, next) => {
    const { semester, usn, department, phone } = req.body;

    const createSchemaParsed = createSchema.safeParse(req.body)

    if (!createSchemaParsed.success) {
        return next(new ApiError('All fields are required!', 400))
    }

    const student = await Student.create({
        semester,
        usn,
        department,
        phone
    })

    const studentExists = await Student.findOne({
        usn
    })

    if (studentExists) {
        return next(new ApiError('Student already exists!', 400))
    }

    if (!student) {
        return next(new ApiError("Couldn't create student", 400));
    }

    return next(new ApiResponse("Student created successfully!", 200))
})

const getAllStudents = asyncHandler(async (req, res, next) => {
    const students = await Student.find({})

    if (!students) {
        return next(new ApiError('Could not fetch all students!', 400))
    }

    return next(new ApiResponse('User fetched successfully', 200, students))
})

export {
    createStudent,
    getAllStudents
}