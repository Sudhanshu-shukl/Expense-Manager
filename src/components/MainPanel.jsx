import { useState } from 'react'
import { useExpense } from '../context/ExpenseContext'
import StatsCards from './StatsCards'
import ExpenseChart from './ExpenseChart'
import TrendChart from './TrendChart'
import ExpenseList from './ExpenseList'
import { BarChart3, List, TrendingUp } from 'lucide-react'

const MainPanel = () => {
    const [activeView, setActiveView] = useState('overview')

    const viewTabs = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'trends', label: 'Trends', icon: TrendingUp },
        { id: 'expenses', label: 'All Expenses', icon: List }
    ]

    return (
        <div className="flex flex-col h-full p-4 lg:p-6 space-y-6">
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-white/50 p-1 rounded-2xl backdrop-blur-sm border border-white/20">
                {viewTabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveView(tab.id)}
                            className={`
                flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 flex-1 justify-center
                ${activeView === tab.id
                                    ? 'bg-white text-primary-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    )
                })}
            </div>

            {/* Content based on active view */}
            <div className="flex-1 overflow-hidden">
                {activeView === 'overview' && <OverviewView />}
                {activeView === 'trends' && <TrendsView />}
                {activeView === 'expenses' && <ExpensesView />}
            </div>
        </div>
    )
}

// Overview View Component
const OverviewView = () => {
    return (
        <div className="space-y-6 h-full">
            <StatsCards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Expense Breakdown</h3>
                    <ExpenseChart />
                </div>
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Expenses</h3>
                    <ExpenseList limit={5} showActions={false} />
                </div>
            </div>
        </div>
    )
}

// Trends View Component
const TrendsView = () => {
    return (
        <div className="space-y-6 h-full">
            <StatsCards />
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-lg flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Expense Trends</h3>
                <TrendChart />
            </div>
        </div>
    )
}

// Expenses View Component
const ExpensesView = () => {
    return (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-lg h-full flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">All Expenses</h3>
            <div className="flex-1 overflow-hidden">
                <ExpenseList showActions={true} />
            </div>
        </div>
    )
}

export default MainPanel