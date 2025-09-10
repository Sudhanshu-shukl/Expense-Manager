import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'

import authRouter from './routes/auth.js'
import expenseRouter from './routes/expenses.js'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors({ origin: true, credentials: true }))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

// Routes
app.use('/api/auth', authRouter)
app.use('/api/expenses', expenseRouter)

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ error: err.message || 'Internal Server Error' })
})

const { MONGODB_URI, PORT = 3000 } = process.env

if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI')
  process.exit(1)
}

await mongoose.connect(MONGODB_URI)
console.log('Connected to MongoDB')

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})


