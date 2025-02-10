import { Schema, model } from 'mongoose' 

const courseSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Course name is required'],
            unique: true,
            maxLength: [25, `Can't be overcome 25 characters`]
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            maxLength: [100, `Can't be overcome 100 characters`]
        },
        teacher: {
            type: Schema.Types.ObjectId,
            ref: 'Teacher', 
            required: [true, 'Teacher is required']
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
) 

export default model('Course', courseSchema)