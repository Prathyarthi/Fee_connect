const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
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