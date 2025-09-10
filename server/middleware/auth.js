import jwt from 'jsonwebtoken'

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { id: payload.sub }
    next()
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

export function signJwt(userId) {
  return jwt.sign({}, process.env.JWT_SECRET, { subject: String(userId), expiresIn: '7d' })
}


