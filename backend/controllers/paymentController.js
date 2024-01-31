import { Payment } from "../models/paymentModel";
import { Student } from "../models/studentModel";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const getAllPayments = asyncHandler(async (req, res, next) => {
    const payments = Payment.find({})

    if (!payments) {
        throw new ApiError(400, "Couldn't find payments")
    }

    return res.json(
        new ApiResponse(200, payments, "Payments fetched successfully!")
    )
})


const paymentDetailsById = asyncHandler(async (req, res) => {

    const studentId = req.params.studentId

    const isValidStudent = await Student.findById(studentId)
    if (!isValidStudent) {
        throw new ApiError(400, "Student is not present")
    }

    const payment = await Payment.find({
        studentId
    }).populate('studentId',)




    // const { studentId } = req.params;

    // const isValidStudent = await Student.exists({ _id: studentId });
    // if (!isValidStudent) {
    //     throw new ApiError(400, 'Invalid studentId');
    // }

    // const payments = await Payment.find({ student: studentId }).populate('student', 'firstName lastName');
    // return res.json(new ApiResponse(200, payments, 'Payments for the student fetched successfully'));
})


export {
    getAllPayments,
    paymentDetailsById
}