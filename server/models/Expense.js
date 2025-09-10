import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
  amount: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  date: { type: String, required: true }, // store YYYY-MM-DD as string for simple queries
  note: { type: String },
}, { timestamps: true })

expenseSchema.index({ userId: 1, date: -1 })

export default mongoose.model('Expense', expenseSchema)


