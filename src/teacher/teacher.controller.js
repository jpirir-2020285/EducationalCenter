// controllers/teacherController.js
import bcrypt from 'bcryptjs'
import Teacher from './teacher.model.js'
import Course from '../course/course.model.js'
import Student from '../teacher/teacher.model.js'

import mongoose from 'mongoose' 

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const existingUser = await Teacher.findOne({ email })
        if (existingUser) return res.status(400).json({ message: 'Email is already in use' })
        const hashedPassword = await bcrypt.hash(password, 10)
        const newTeacher = new Teacher({
            username,
            email,
            password: hashedPassword,
            role: 'TEACHER_ROLE',
        })
        await newTeacher.save()
        res.status(201).json({
            message: 'Teacher registered successfully',
            teacher: newTeacher,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error registering teacher' })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body 
        const teacher = await Teacher.findOne({ username }) 
        if (!teacher) 
            return res.status(404).json({ message: 'Teacher not found' }) 
        const isPasswordValid = await bcrypt.compare(password, teacher.password) 
        if (!isPasswordValid) 
            return res.status(401).json({ message: 'Invalid password' }) 
        res.status(200).json(
            {
                message: 'Login successful',
                teacher: {
                    username: teacher.username,
                    email: teacher.email,
                    role: teacher.role
                }
            }
        ) 
    } catch (err) {
        console.error(err) 
        res.status(500).json({ message: 'Error logging in' }) 
    }
} 

export const createCourse = async (req, res) => {
    try {
        const { name, description } = req.body 
        const  id = req.params. id

        const teacher = await Teacher.findById( id) 
        if (!teacher) 
            return res.status(404).json({ message: 'Teacher not found' }) 
        
        const newCourse = new Course(
            {
                name,
                description,
                teacher: id 
            }
        ) 
        await newCourse.save() 
        res.status(201).json({ message: 'Course created successfully', course: newCourse }) 
    } catch (err) {
        console.error(err) 
        res.status(500).json({ message: 'Error creating course' }) 
    }
} 

export const editCourse = async (req, res) => {
    try {
        const { courseId } = req.params 
        const { name, description } = req.body 
        const  id = req.params. id
        const course = await Course.findById(courseId) 
        if (!course) 
            return res.status(404).json({ message: 'Course not found' }) 
        if (course.teacher.toString() !==  id) 
            return res.status(403).json({ message: 'You are not authorized to edit this course' }) 
        course.name = name || course.name 
        course.description = description || course.description 
        await course.save() 
        res.status(200).json({ message: 'Course updated successfully', course }) 
    } catch (err) {
        console.error(err) 
        res.status(500).json({ message: 'Error updating course' }) 
    }
} 

export const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params 
        const  id = req.params. id
        const course = await Course.findById(courseId) 
        if (!course) return res.status(404).json({ message: 'Course not found' }) 
        if (course.teacher.toString() !==  id) return res.status(403).json({ 
            message: 'You are not authorized to delete this course' 
        }) 
        const updatedStudents = await Student.updateMany(
            { courses: new mongoose.Types.ObjectId(courseId) },
            { $pull: { courses: new mongoose.Types.ObjectId(courseId) } }
        ) 
        console.log('Updated Students:', updatedStudents)
        await Course.findByIdAndDelete(courseId) 
        res.status(200).json({ message: 'Course deleted successfully' }) 
    } catch (err) {
        console.error(err) 
        res.status(500).json({ message: 'Error deleting course' }) 
    }
} 

export const getTeacherCourses = async (req, res) => {
    try {
        const  id = req.params. id 
        const teacher = await Teacher.findById( id) 
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' }) 
        const courses = await Course.find({ teacher:  id }) 
        res.status(200).json({ courses }) 
    } catch (err) {
        console.error(err) 
        res.status(500).json({ message: 'Error fetching courses' }) 
    }
} 