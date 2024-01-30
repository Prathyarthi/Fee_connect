import mongoose, { Schema } from 'mongoose'

const studentSchema = new Schema({
    firstName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    lastName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    email: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
        type: String,
        required: true,
        length: 10
    }
}, { timestamps: true })


export const Student = mongoose.model('Student', studentSchema) 