import { Payment } from "../models/paymentModel.js";
import { Student } from "../models/studentModel.js";
import { User } from "../models/userModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const getAllPayments = asyncHandler(async (req, res, next) => {
    try {
        const payments = await Payment.find({})

        if (!payments) {
            throw new ApiError(400, "Couldn't find payments")
        }

        return res.json(
            new ApiResponse(200, payments, "Payments fetched successfully!")
        )
    } catch (error) {
        console.log(error);
        throw new ApiError(400, "Something went wrong", error)
    }
})


const paymentDetailsById = asyncHandler(async (req, res) => {

    const studentId = req.params.studentId

    const isValidStudent = await Student.findById(studentId)
    if (!isValidStudent) {
        throw new ApiError(400, "Student is not present")
    }

    const payment = await Payment.find({
        studentId
    }).populate('studentId', "firstName", "lastName")

    return res.json(
        new ApiResponse(200, payment, "Payment details fetched successfully!")
    )
})


const payFee = asyncHandler(async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction()

    const { amount, to } = req.body;

    const fromAccount = await Student.findOne({
        userId: req.userId
    }).session(session)

    if (!fromAccount || !fromAccount.balance < amount) {
        await session.abortTransaction();
        throw new ApiError(400, "Insufficient balance or no account present!")
    }

    const toAccount = await User.findOne({
        userId: to
    }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        throw new ApiError(400, "Invalid account")
    }

    await Payment.updateOne({
        userId: req.userId,
    }, {
        $inc: {
            balance: -amount
        }
    }).session(session)


    await Payment.updateOne({
        userId: to,
    }, {
        $inc: {
            balance: amount
        }
    }).session(session)

    await session.commitTransaction();
    return res.json(
        new ApiResponse(200, "Tranfer successfull!s")
    )
})


export {
    getAllPayments,
    paymentDetailsById,
    payFee
}