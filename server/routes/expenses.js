import { Router } from 'express'
import Expense from '../models/Expense.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.use(requireAuth)

// List expenses (optionally by month/year)
router.get('/', async (req, res, next) => {
  try {
    const { month, year, limit } = req.query
    const filter = { userId: req.user.id }
    if (month && year) {
      const mm = String(month).padStart(2, '0')
      filter.date = { $regex: `^${year}-${mm}-` }
    }
    const q = Expense.find(filter).sort({ date: -1, createdAt: -1 })
    if (limit) q.limit(Number(limit))
    const items = await q.exec()
    res.json(items)
  } catch (e) { next(e) }
})

// Create
router.post('/', async (req, res, next) => {
  try {
    const { amount, category, date, note } = req.body
    if (amount == null || amount < 0 || !category || !date) {
      return res.status(400).json({ error: 'amount, category, date required' })
    }
    const item = await Expense.create({ userId: req.user.id, amount, category, date, note })
    res.status(201).json(item)
  } catch (e) { next(e) }
})

// Update
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const update = (({ amount, category, date, note }) => ({ amount, category, date, note }))(req.body)
    const item = await Expense.findOneAndUpdate({ _id: id, userId: req.user.id }, update, { new: true })
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.json(item)
  } catch (e) { next(e) }
})

// Delete
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await Expense.deleteOne({ _id: id, userId: req.user.id })
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' })
    res.status(204).send()
  } catch (e) { next(e) }
})

export default router


