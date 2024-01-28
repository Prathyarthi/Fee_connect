import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'paid'],
        default:'unpaid'
    }
})

export const Account = mongoose.model('Account', accountSchema)