// routes/teacherRoutes.js
import express from 'express' 
import { register, login, createCourse, editCourse, deleteCourse, getTeacherCourses } from '../teacher/teacher.controller.js' 

const api = express.Router() 

api.post(
    '/register', 
    register
)

api.post(
    '/login', 
    login
)

api.post(
    '/:id/courses', 
    createCourse
) 

api.put(
    '/:id/update/:courseId', 
    editCourse
) 

api.delete(
    '/:id/delete/:courseId', 
    deleteCourse
) 

api.get(
    '/:id/courses', 
    getTeacherCourses
) 

export default api 