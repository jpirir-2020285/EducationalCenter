
import { Schema, model } from 'mongoose'

const studentSchema = new Schema(
    {
        name: { 
            type: String, 
            required: true, 
        },
        username: { 
            type: String, 
            required: true, 
            unique: true 
        },
        password: { 
            type: 
            String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true 
        },
        role: { 
            type: String, 
            default: 'STUDENT_ROLE' 
        },
        courses: [{ 
            type: Schema.Types.ObjectId,
            ref: 'Course' 
        }]
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model('Student', studentSchema)