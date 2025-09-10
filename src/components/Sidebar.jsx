import { useState, useEffect } from 'react'
import { useExpense } from '../context/ExpenseContext'
import { Plus, Edit3, Save, X, Target, TrendingUp } from 'lucide-react'
import AddExpenseForm from './AddExpenseForm'

const Sidebar = () => {
  const { monthlyBudget, setBudget, getCurrentMonthExpenses } = useExpense()
  const [isEditingBudget, setIsEditingBudget] = useState(false)
  const [budgetValue, setBudgetValue] = useState(monthlyBudget ?? '')
  const [showAddForm, setShowAddForm] = useState(false)
  const [showBudgetPrompt, setShowBudgetPrompt] = useState(false)

  const currentMonthExpenses = getCurrentMonthExpenses()
  const totalExpenses = currentMonthExpenses.reduce((total, expense) => total + expense.amount, 0)
  const remainingBudget = monthlyBudget != null ? (monthlyBudget - totalExpenses) : 0
  const budgetProgress = monthlyBudget != null && monthlyBudget > 0 ? (totalExpenses / monthlyBudget) * 100 : 0

  const handleBudgetSave = () => {
    setBudget(budgetValue)
    setIsEditingBudget(false)
  }

  const handleBudgetCancel = () => {
    setBudgetValue(monthlyBudget)
    setIsEditingBudget(false)
  }

  // Keep editor open only when no budget; sync input when budget loads
  useEffect(() => {
    if (monthlyBudget == null) {
      setIsEditingBudget(true)
      setBudgetValue('')
    } else {
      setIsEditingBudget(false)
      setBudgetValue(monthlyBudget)
    }
  }, [monthlyBudget])

  return (
    <div className="h-full bg-white/70 backdrop-blur-xl border-r border-white/20 shadow-xl p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">ExpenseManager</h2>
        </div>
        <p className="text-gray-600 text-sm">Track your spending smartly</p>
      </div>

      {/* Budget Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary-600" />
              <h3 className="font-semibold text-gray-800">Monthly Budget</h3>
            </div>
            {!isEditingBudget && (
              <button
                onClick={() => setIsEditingBudget(true)}
                className="p-1 hover:bg-white/50 rounded-lg transition-colors duration-200"
              >
                <Edit3 className="w-4 h-4 text-gray-600" />
              </button>
            )}
          </div>

          {(isEditingBudget || monthlyBudget == null) ? (
            <div className="space-y-3">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                <input
                  type="number"
                  value={budgetValue ?? ''}
                  onChange={(e) => setBudgetValue(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter budget"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleBudgetSave}
                  className="flex-1 bg-primary-500 text-white py-2 rounded-xl hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center gap-1"
                >
                  <Save className="w-4 h-4" />
                  {monthlyBudget == null ? 'Set Budget' : 'Save'}
                </button>
                <button
                  onClick={handleBudgetCancel}
                  className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-xl hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-800">₹{monthlyBudget.toLocaleString('en-IN')}</p>
              </div>
              
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Spent: ₹{totalExpenses.toLocaleString('en-IN')}</span>
                  <span className={`font-medium ${remainingBudget >= 0 ? 'text-accent-600' : 'text-red-600'}`}>
                    {remainingBudget >= 0 ? 'Remaining: ' : 'Over: '}₹{Math.abs(remainingBudget).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      budgetProgress <= 75 ? 'bg-accent-500' : 
                      budgetProgress <= 90 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(budgetProgress, 100)}%` }}
                  />
                </div>
                <div className="text-center text-sm text-gray-600">
                  {budgetProgress.toFixed(1)}% of budget used
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Expense Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full bg-gradient-to-r from-accent-500 to-accent-600 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Expense
        </button>
      </div>

      {/* Quick Stats */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 mb-3">This Month</h3>
        <div className="grid grid-cols-1 gap-3">
          <div className="bg-white/80 rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
            <p className="text-xl font-bold text-gray-800">₹{totalExpenses.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-white/80 rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Transactions</p>
            <p className="text-xl font-bold text-gray-800">{currentMonthExpenses.length}</p>
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <AddExpenseForm onClose={() => setShowAddForm(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar