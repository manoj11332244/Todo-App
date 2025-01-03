import express from 'express'
import conntectDb from './database/database.js'
import dotenv from 'dotenv'
import userRoute from './routes/userroutes.js'
import todoRoute from './routes/todoroutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

const PORT= process.env.PORT || 3000

const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
conntectDb()

app.use('/api/v1/user',userRoute)
app.use('/api/v1/todo',todoRoute)

app.listen(PORT,()=>{
    console.log(`Server is running on PORT : ${PORT}`)
})