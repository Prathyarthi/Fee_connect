import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    balance: {
        type: Number,
        required: true
    },
    firstName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    lastName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    feeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
    },
    amountPaid: {
        type: Number,
        default: 0,
        // required: true,
    },
    paymentDate: {
        type: Date,
        default: Date.now,
    },
}, { timeseries: true });

export const Payment = mongoose.model('Payment', paymentSchema);