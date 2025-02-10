import { Schema, model } from 'mongoose'

const userSchema = Schema(
    {
        name: { 
            type: String, 
            required: true, 
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        role: {
            type: String,
            enum: ['STUDENT_ROLE', 'TEACHER_ROLE'],
            default: 'TEACHER_ROLE',
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export default model('Teacher', userSchema)