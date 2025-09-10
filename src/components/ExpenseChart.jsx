import { useEffect, useRef } from 'react'
import { useExpense } from '../context/ExpenseContext'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const ExpenseChart = () => {
    const { getCurrentMonthExpenses, categories } = useExpense()
    const chartRef = useRef(null)

    const currentMonthExpenses = getCurrentMonthExpenses()

    // Calculate category totals
    const categoryTotals = categories.reduce((acc, category) => {
        acc[category] = currentMonthExpenses
            .filter(expense => expense.category === category)
            .reduce((total, expense) => total + expense.amount, 0)
        return acc
    }, {})

    // Filter out categories with zero spending
    const nonZeroCategories = Object.entries(categoryTotals)
        .filter(([_, amount]) => amount > 0)
        .sort(([_, a], [__, b]) => b - a) // Sort by amount descending

    const colors = [
        '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#6366F1', '#84CC16'
    ]

    const data = {
        labels: nonZeroCategories.map(([category]) => category),
        datasets: [
            {
                data: nonZeroCategories.map(([_, amount]) => amount),
                backgroundColor: colors.slice(0, nonZeroCategories.length),
                borderColor: colors.slice(0, nonZeroCategories.length).map(color => color + '40'),
                borderWidth: 2,
                hoverBorderWidth: 3,
                hoverOffset: 8
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle',
                    font: {
                        size: 12,
                        weight: '500'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#374151',
                bodyColor: '#374151',
                borderColor: '#E5E7EB',
                borderWidth: 1,
                cornerRadius: 12,
                padding: 12,
                callbacks: {
                    label: (context) => {
                        const value = context.parsed
                        const total = context.dataset.data.reduce((a, b) => a + b, 0)
                        const percentage = ((value / total) * 100).toFixed(1)
                        return `${context.label}: ₹${value.toLocaleString('en-IN')} (${percentage}%)`
                    }
                }
            }
        },
        cutout: '60%',
        animation: {
            animateRotate: true,
            animateScale: true,
            duration: 1000,
            easing: 'easeOutCubic'
        }
    }

    if (nonZeroCategories.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <p className="text-sm font-medium">No expenses this month</p>
                <p className="text-xs text-gray-400">Add your first expense to see the breakdown</p>
            </div>
        )
    }

    return (
        <div className="h-64 relative">
            <Doughnut ref={chartRef} data={data} options={options} />
        </div>
    )
}

export default ExpenseChart