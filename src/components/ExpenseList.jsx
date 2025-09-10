import { useState } from 'react'
import { useExpense } from '../context/ExpenseContext'
import { Edit3, Trash2, Calendar, Tag, FileText } from 'lucide-react'
import EditExpenseForm from './EditExpenseForm'

const ExpenseList = ({ limit, showActions = true }) => {
    const { expenses, deleteExpense } = useExpense()
    const [editingExpense, setEditingExpense] = useState(null)
    const [confirmDelete, setConfirmDelete] = useState(null)

    // Sort expenses by date (newest first) and apply limit if specified
    const sortedExpenses = [...expenses]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit || expenses.length)

    const getCategoryColor = (category) => {
        const colors = {
            Food: 'bg-orange-100 text-orange-700',
            Travel: 'bg-blue-100 text-blue-700',
            Bills: 'bg-red-100 text-red-700',
            Shopping: 'bg-purple-100 text-purple-700',
            Entertainment: 'bg-pink-100 text-pink-700',
            Healthcare: 'bg-green-100 text-green-700',
            Education: 'bg-indigo-100 text-indigo-700',
            Misc: 'bg-gray-100 text-gray-700'
        }
        return colors[category] || colors.Misc
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
    }

    const handleDelete = (id) => {
        deleteExpense(id)
        setConfirmDelete(null)
    }

    if (sortedExpenses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <FileText className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm font-medium">No expenses yet</p>
                <p className="text-xs text-gray-400">Add your first expense to get started</p>
            </div>
        )
    }

    return (
        <div className="space-y-3 h-full overflow-y-auto">
            {sortedExpenses.map((expense) => (
                <div
                    key={expense.id}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/40 shadow-sm hover:shadow-md transition-all duration-200 animate-fade-in"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            {/* Amount and Category */}
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xl font-bold text-gray-800">
                                    ₹{expense.amount.toLocaleString('en-IN')}
                                </span>
                                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(expense.category)}`}>
                                    <Tag className="w-3 h-3 inline mr-1" />
                                    {expense.category}
                                </span>
                            </div>

                            {/* Date and Note */}
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(expense.date)}
                                </div>
                                {expense.note && (
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {expense.note}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        {showActions && (
                            <div className="flex items-center gap-2 ml-4">
                                <button
                                    onClick={() => setEditingExpense(expense)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200"
                                    title="Edit expense"
                                >
                                    <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setConfirmDelete(expense.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200"
                                    title="Delete expense"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {/* Edit Modal */}
            {editingExpense && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-md">
                        <EditExpenseForm
                            expense={editingExpense}
                            onClose={() => setEditingExpense(null)}
                        />
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {confirmDelete && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Delete Expense</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this expense? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleDelete(confirmDelete)}
                                className="flex-1 bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 transition-colors duration-200"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setConfirmDelete(null)}
                                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ExpenseList