import express from 'express'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import studentRoutes from './routes/studentRoutes.js'
import accountRoutes from './routes/accountRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/student', studentRoutes)
app.use('/api/v1/account', accountRoutes)
app.use('/api/v1/payment', paymentRoutes)

export default app