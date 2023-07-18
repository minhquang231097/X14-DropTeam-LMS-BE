import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (_: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
