import { useEffect, useRef } from 'react'
import { useExpense } from '../context/ExpenseContext'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

const TrendChart = () => {
    const { expenses } = useExpense()
    const chartRef = useRef(null)

    // Generate last 12 months data
    const generateMonthlyData = () => {
        const months = []
        const monthlyTotals = []
        const now = new Date()

        for (let i = 11; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
            const monthName = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
            months.push(monthName)

            const monthExpenses = expenses.filter(expense => {
                const expenseDate = new Date(expense.date)
                return expenseDate.getMonth() === date.getMonth() &&
                    expenseDate.getFullYear() === date.getFullYear()
            })

            const total = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0)
            monthlyTotals.push(total)
        }

        return { months, monthlyTotals }
    }

    const { months, monthlyTotals } = generateMonthlyData()

    const data = {
        labels: months,
        datasets: [
            {
                label: 'Monthly Expenses',
                data: monthlyTotals,
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                pointBackgroundColor: '#3B82F6',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 3,
                pointRadius: 6,
                pointHoverRadius: 8,
                fill: true,
                tension: 0.4
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
            mode: 'index'
        },
        plugins: {
            legend: {
                display: false
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
                        return `Expenses: ₹${context.parsed.y.toLocaleString('en-IN')}`
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#6B7280',
                    font: {
                        size: 12,
                        weight: '500'
                    }
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: '#F3F4F6'
                },
                ticks: {
                    color: '#6B7280',
                    font: {
                        size: 12,
                        weight: '500'
                    },
                    callback: (value) => {
                        return '₹' + value.toLocaleString('en-IN')
                    }
                }
            }
        },
        animation: {
            duration: 1500,
            easing: 'easeOutCubic'
        }
    }

    if (monthlyTotals.every(total => total === 0)) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                </div>
                <p className="text-sm font-medium">No expense data available</p>
                <p className="text-xs text-gray-400">Start tracking expenses to see trends</p>
            </div>
        )
    }

    return (
        <div className="h-80">
            <Line ref={chartRef} data={data} options={options} />
        </div>
    )
}

export default TrendChart