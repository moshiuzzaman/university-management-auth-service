import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './app/modules/users/users.routes'

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routs
app.use('/api/v1/users/', userRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('😊 App works fine')
})

export default app
