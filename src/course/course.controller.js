import Course from '../course/course.model.js' 

export const createCourse = async (req, res) => {
    try {
        const { name, description, teacherId } = req.body 
        if (!teacherId) 
            return res.status(400).json({ message: 'ID_Teacher not found' }) 
        const newCourse = new Course({
            name,
            description,
            teacher: teacherId, 
        }) 
        await newCourse.save() 
        res.status(201).json({
            message: 'Course created successfully',
            course: newCourse,
        }) 
    } catch (err) {
        console.error(err) 
        res.status(500).json({ message: 'Error creating course' }) 
    }
} 