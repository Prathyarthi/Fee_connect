import mongoose, { Schema } from 'mongoose'

const studentSchema = new Schema({
    firstName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lastName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN', 'STUDENT'],
        default: 'USER',
    },
    semester: {
        type: String,
        required: true
    },
    usn: {
        type: String,
        required: true,
        length: 10,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    phone: {
        tytype: String,
        required: true,
        length: 10
    }
}, { timestamps: true })


export const Student = mongoose.model('Student', studentSchema) 