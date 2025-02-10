
import express from 'express' 
import { createCourse  } from '../course/course.controller.js' 

const api = express.Router() 

api.post(
    '/register', 
    createCourse
)

export default api 