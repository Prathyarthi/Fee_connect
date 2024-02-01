const mongoose = require('mongoose');

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
        required: true,
    },
    amountPaid: {
        type: Number,
        required: true,
    },
    paymentDate: {
        type: Date,
        default: Date.now,
    },
});

export const Payment = mongoose.model('Payment', paymentSchema);