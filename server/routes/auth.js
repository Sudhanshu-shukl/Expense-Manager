import { Router } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { signJwt } from '../middleware/auth.js'
import { OAuth2Client } from 'google-auth-library'

const router = Router()
const googleClient = process.env.GOOGLE_CLIENT_ID ? new OAuth2Client(process.env.GOOGLE_CLIENT_ID) : null

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password || password.length < 6) {
      return res.status(400).json({ error: 'Email and password (>=6) required' })
    }
    const existing = await User.findOne({ email })
    if (existing) return res.status(409).json({ error: 'Email already registered' })
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ email, passwordHash })
    const token = signJwt(user._id)
    res.status(201).json({ token, user: { id: user._id, email: user.email } })
  } catch (e) { next(e) }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' })
    const token = signJwt(user._id)
    res.json({ token, user: { id: user._id, email: user.email } })
  } catch (e) { next(e) }
})

export default router

// Google Sign-In
router.post('/google', async (req, res, next) => {
  try {
    const { id_token } = req.body
    if (!id_token) return res.status(400).json({ error: 'id_token required' })
    if (!googleClient) return res.status(500).json({ error: 'Google client not configured' })

    const ticket = await googleClient.verifyIdToken({ idToken: id_token, audience: process.env.GOOGLE_CLIENT_ID })
    const payload = ticket.getPayload()
    const email = payload.email
    if (!email) return res.status(400).json({ error: 'No email in Google token' })

    let user = await User.findOne({ email })
    if (!user) {
      user = await User.create({ email, passwordHash: 'google' })
    }
    const token = signJwt(user._id)
    res.json({ token, user: { id: user._id, email: user.email } })
  } catch (e) { next(e) }
})


