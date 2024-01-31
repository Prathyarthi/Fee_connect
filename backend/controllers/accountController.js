import { Account } from "../models/accountModel.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getBalance = async (req, res) => {
    const account = Account.findOne({
        userId: req._id
    })

    res.status(200).json({
        success: true,
        balance: account.balance
    })
}

const createFees = asyncHandler(async (req, res) => {

    const { seat, amount } = req.body;

    try {
        const newFee = await Account.create({
            seat,
            amount
        });

        if (!newFee) {
            throw new ApiError(400, "Couldn't create fee")
        }

        return res.json(
            new ApiResponse(200, newFee, "Fee created successfully!")
        )
    } catch (error) {
        throw new ApiError(500, "Something went wrong!", error)
    }
});


const getAllFeeDetails = asyncHandler(async (req, res) => {
    const fees = await Account.find({})

    if (!fees) {
        throw new ApiError(400, "Failed to fetch fee details")
    }

    return res.json(
        new ApiResponse(200, fees, "Fee Details fetched successfully")
    )
})


export {
    getBalance,
    createFees,
    getAllFeeDetails
}