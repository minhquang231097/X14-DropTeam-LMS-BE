import express, { Express, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"

dotenv.config()

const app: Express = express()
app.use(express.json());
app.use(cookieParser())

const port = process.env.PORT || 8080

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("Hello!")
})

import { connectDB } from './common/connectDB'
connectDB();

//Routes
import userRouter from './routers/user.route';
import workplaceRouter from './routers/workplace.route'
import courseRouter from './routers/course.route'

app.use('/auth', userRouter)
app.use("/workplace", workplaceRouter)
app.use("/course", courseRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})