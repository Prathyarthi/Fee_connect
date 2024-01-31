import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    seat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
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
        default: 'unpaid'
    }
})

export const Account = mongoose.model('Account', accountSchema)