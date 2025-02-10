import Student from '../student/student.model.js'
import Course from '../course/course.model.js'
import bcrypt from 'bcryptjs'

export const register = async (req, res) => {
    try {
        const { username, password, email } = req.body

        const existingStudent = await Student.findOne({ username })
        if (existingStudent)
            return res.status(400).json({ message: 'Username already exists' })
        const hashedPassword = await bcrypt.hash(password, 10)
        const newStudent = new Student({
            username,
            password: hashedPassword,
            email,
            role: 'STUDENT_ROLE'
        })
        await newStudent.save()
        res.status(201).json({
            message: 'Student registered successfully',
            student: {
                username: newStudent.username,
                email: newStudent.email,
                role: newStudent.role
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error registering student' })
    }
}


export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const student = await Student.findOne({ username })
        if (!student) 
            return res.status(404).json({ message: 'Student not found' })
        const isPasswordValid = await bcrypt.compare(password, student.password)
        if (!isPasswordValid) 
            return res.status(401).json({ message: 'Invalid password' })
        res.status(200).json(
            {
                message: 'Login successful',
                student: {
                    username: student.username,
                    email: student.email,
                    role: student.role
                }
            }
        )
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error logging in' })
    }
}


export const assignCourse = async (req, res) => {
    try {
        const id = req.params.id
        const { courseId } = req.body

        const student = await Student.findById(id)
        if (!student) 
            return res.status(404).json({ message: 'Student not found' })
        

        if (student.courses.includes(courseId)) 
            return res.status(400).json({ message: 'Already assigned to this course' })
        

        if (student.courses.length >= 3) 
            return res.status(400).json({ message: 'Cannot enroll in more than 3 courses' })

        const course = await Course.findById(courseId)
        if (!course)
            return res.status(404).json({ message: 'Course not found' })

        student.courses.push(courseId)
        await student.save()

        res.status(200).json({
            message: 'Course assigned successfully',
            student
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error assigning course' })
    }
}


export const update = async (req, res) => {
    try {
        const { id } = req.params
        const { username, email } = req.body

        const student = await Student.findById(id)
        if (!student) 
            return res.status(404).json({ message: 'Student not found', succes: false })
        
        if (student.role !== 'STUDENT_ROLE') 
            return res.status(403).json({ message: 'You cannot change the role' })
        
        if (email && email !== student.email) {
            const existingStudent = await Student.findOne({ email })
            if (existingStudent) {
                return res.status(400).json({ message: 'Email is already in use' })
            }
        }

        student.username = username || student.username
        student.email = email || student.email

        await student.save()

        res.status(200).json({
            message: 'Profile updated successfully',
            student: {
                username: student.username,
                email: student.email
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error updating profile', succes: false, err })
    }
}

export const eliminate = async (req, res) => {
    try {
        const { id } = req.params

        const student = await Student.findById(id)
        if (!student) 
            return res.status(404).json({ message: 'Student not found' })

        if (student.role !== 'STUDENT_ROLE') 
            return res.status(403).json({ message: 'You are not authorized' })

        await Student.findByIdAndDelete(id)

        res.status(200).json({ message: 'Profile deleted' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error deleting profile' })
    }
}