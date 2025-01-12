    if (process.env.NODE_ENV !== 'production') {
        require('dotenv').config()
    }
    
    const cors = require("cors")
    const express = require('express')
    const app = express()
    const port = process.env.PORT || 3000
    const userRouter = require('./modules/user-module/routes')
    const classroomRouter = require('./modules/classroom-module/routes')
    const subjectRouter = require('./modules/subject-module/routes')
    const errorHandler = require('./middlewares/error-handler')
    
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    
    app.use(userRouter)
    app.use(classroomRouter)
    app.use(subjectRouter)
    app.use(errorHandler)
    
    app.listen(port, () => {
        console.log(`listening to port ${port}`);
    })