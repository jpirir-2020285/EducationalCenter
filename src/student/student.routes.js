// routes/studentRoutes.js
import express from 'express'
import { register, login, assignCourse, update, eliminate  } from '../student/student.controller.js'

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
    '/:id/assign-course', 
    assignCourse
)

api.put(
    '/profile/:id', 
    update
)

api.delete(
    '/delete/:id', 
    eliminate
)

export default api