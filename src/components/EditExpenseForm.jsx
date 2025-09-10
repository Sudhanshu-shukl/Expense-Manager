import { useState } from 'react'
import { useExpense } from '../context/ExpenseContext'
import { Save, X, Calendar, DollarSign, Tag, FileText } from 'lucide-react'

const EditExpenseForm = ({ expense, onClose }) => {
    const { updateExpense, categories } = useExpense()
    const [formData, setFormData] = useState({
        amount: expense.amount.toString(),
        category: expense.category,
        date: expense.date,
        note: expense.note || ''
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            return
        }

        setIsLoading(true)

        // Simulate processing time for better UX
        await new Promise(resolve => setTimeout(resolve, 300))

        updateExpense({
            ...expense,
            amount: parseFloat(formData.amount),
            category: formData.category,
            date: formData.date,
            note: formData.note
        })
        onClose()
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                        <Save className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Edit Expense</h2>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Amount */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <DollarSign className="w-4 h-4 inline mr-1" />
                        Amount (₹)
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-4 bg-white/70 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Tag className="w-4 h-4 inline mr-1" />
                        Category
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-white/70 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        required
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-white/70 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        required
                    />
                </div>

                {/* Note */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FileText className="w-4 h-4 inline mr-1" />
                        Note (Optional)
                    </label>
                    <textarea
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-white/70 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Add a note about this expense..."
                        rows={3}
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={isLoading || !formData.amount || parseFloat(formData.amount) <= 0}
                        className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Save Changes
                            </>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditExpenseForm