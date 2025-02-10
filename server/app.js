    if (process.env.NODE_ENV !== 'production') {
        require('dotenv').config()
    }
    
    const cors = require("cors")
    const express = require('express')
    const cookieParser = require('cookie-parser');
    const app = express()
    const port = process.env.PORT || 3000
    const profileRouter = require('./modules/profile-module/routes')
    const classroomRouter = require('./modules/classroom-module/routes')
    const subjectRouter = require('./modules/subject-module/routes')
    const subjectClassRouter = require('./modules/subjectclass-module/routes')
    const userRouter = require('./modules/user-module/routes')
    const examinationRouter = require('./modules/examination-module/routes')
    const authenticationRouter = require('./modules/authentication-module/routes')
    const validationRouter = require('./modules/validation-module/routes')
    const routerRouter = require('./modules/router-module/routes')

    const authentication = require('./middlewares/authentication')
    const errorHandler = require('./middlewares/error-handler')
    
    app.use(cookieParser());
    app.use(cors({
        origin: [ 'http://localhost:5173' ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'User-X', 'User-Y', 'User-Agent', 'User-Z']
    }))
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    
    app.use(authenticationRouter)
    app.use(authentication)
    app.use(routerRouter)
    app.use(validationRouter)
    app.use(profileRouter)
    app.use(classroomRouter)
    app.use(subjectRouter)
    app.use(userRouter)
    app.use(subjectClassRouter)
    app.use(examinationRouter)

    app.use(errorHandler)
    
    app.listen(port, () => {
        console.log(`listening to port ${port}`);
    })