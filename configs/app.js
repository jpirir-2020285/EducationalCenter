
'use estrict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import studentRoutes from '../src/student/student.routes.js'
import teacherRoutes from '../src/teacher/teacher.routes.js'
import courseRoutes from '../src/course/course.routes.js'

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app) => {
    app.use('/student', studentRoutes)
    app.use('/teacher', teacherRoutes)
    app.use('/courses', courseRoutes)
}
 

export const initServer = async()=>{
    const app = express()
    try{
        configs(app) 
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}
