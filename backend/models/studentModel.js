import mongoose, { Schema } from 'mongoose'

const studentSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    firstName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    lastName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    email: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    usn: {
        type: String,
        required: true,
        unique: true,
    },
    department: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        length: 10
    },
    seat: {
        type: String,
        required: true,
        enum: ["MANAGEMENT", "KCET", "COMED-K", "OTHER"],
        default: "MANAGEMENT"
    }
}, { timestamps: true })


export const Student = mongoose.model('Student', studentSchema) 