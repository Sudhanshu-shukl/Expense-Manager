import { useExpense } from '../context/ExpenseContext'
import { TrendingUp, TrendingDown, Wallet, Target } from 'lucide-react'

const StatsCards = () => {
    const { monthlyBudget, getCurrentMonthExpenses, expenses } = useExpense()

    const currentMonthExpenses = getCurrentMonthExpenses()
    const totalExpenses = currentMonthExpenses.reduce((total, expense) => total + expense.amount, 0)
    const remainingBudget = monthlyBudget != null ? (monthlyBudget - totalExpenses) : 0
    const budgetUsedPercentage = monthlyBudget != null && monthlyBudget > 0 ? (totalExpenses / monthlyBudget) * 100 : 0

    // Calculate previous month for comparison
    const now = new Date()
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const prevMonthExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date)
        return expenseDate.getMonth() === prevMonth.getMonth() &&
            expenseDate.getFullYear() === prevMonth.getFullYear()
    })
    const prevMonthTotal = prevMonthExpenses.reduce((total, expense) => total + expense.amount, 0)
    const changePercentage = prevMonthTotal > 0 ? ((totalExpenses - prevMonthTotal) / prevMonthTotal) * 100 : 0

    const stats = [
        {
            title: 'Total Expenses',
            value: `₹${totalExpenses.toLocaleString('en-IN')}`,
            icon: Wallet,
            color: 'primary',
            change: changePercentage,
            changeText: `${Math.abs(changePercentage).toFixed(1)}% from last month`
        },
        {
            title: 'Remaining Budget',
            value: monthlyBudget == null ? '—' : `₹${remainingBudget.toLocaleString('en-IN')}`,
            icon: Target,
            color: monthlyBudget == null ? 'secondary' : (remainingBudget >= 0 ? 'accent' : 'red'),
            progress: monthlyBudget == null ? undefined : budgetUsedPercentage,
            changeText: monthlyBudget == null ? 'Set your monthly budget' : `${budgetUsedPercentage.toFixed(1)}% of budget used`
        },
        {
            title: 'Transactions',
            value: currentMonthExpenses.length,
            icon: TrendingUp,
            color: 'secondary',
            changeText: `This month`
        },
        {
            title: 'Average Per Day',
            value: `₹${Math.round(totalExpenses / new Date().getDate()).toLocaleString('en-IN')}`,
            icon: TrendingDown,
            color: 'primary',
            changeText: `Based on current month`
        }
    ]

    const getColorClasses = (color) => {
        switch (color) {
            case 'primary':
                return { bg: 'bg-primary-500', text: 'text-primary-600', lightBg: 'bg-primary-50' }
            case 'secondary':
                return { bg: 'bg-secondary-500', text: 'text-secondary-600', lightBg: 'bg-secondary-50' }
            case 'accent':
                return { bg: 'bg-accent-500', text: 'text-accent-600', lightBg: 'bg-accent-50' }
            case 'red':
                return { bg: 'bg-red-500', text: 'text-red-600', lightBg: 'bg-red-50' }
            default:
                return { bg: 'bg-gray-500', text: 'text-gray-600', lightBg: 'bg-gray-50' }
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
                const Icon = stat.icon
                const colors = getColorClasses(stat.color)

                return (
                    <div
                        key={stat.title}
                        className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${colors.lightBg}`}>
                                <Icon className={`w-6 h-6 ${colors.text}`} />
                            </div>
                            {stat.change !== undefined && (
                                <div className={`flex items-center gap-1 text-sm font-medium ${stat.change >= 0 ? 'text-red-500' : 'text-accent-500'
                                    }`}>
                                    {stat.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                    {Math.abs(stat.change).toFixed(1)}%
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                            <p className="text-xs text-gray-500">{stat.changeText}</p>
                        </div>

                        {stat.progress !== undefined && (
                            <div className="mt-4">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-500 ${colors.bg}`}
                                        style={{ width: `${Math.min(stat.progress, 100)}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default StatsCards