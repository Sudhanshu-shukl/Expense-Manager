import { useState } from 'react'
import { Download, Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import { useExpense } from '../context/ExpenseContext'
import Papa from 'papaparse'

const TopBar = () => {
    const { expenses, importExpenses } = useExpense()
    const [notification, setNotification] = useState(null)

    // Show notification helper
    const showNotification = (message, type = 'success') => {
        setNotification({ message, type })
        setTimeout(() => setNotification(null), 3000)
    }

    // Export to CSV
    const handleExport = () => {
        if (expenses.length === 0) {
            showNotification('No expenses to export', 'error')
            return
        }

        const csvData = expenses.map(expense => ({
            Date: expense.date,
            Category: expense.category,
            Amount: expense.amount,
            Note: expense.note || ''
        }))

        const csv = Papa.unparse(csvData)
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        showNotification(`Exported ${expenses.length} expenses successfully!`)
    }

    // Import from CSV
    const handleImport = (event) => {
        const file = event.target.files[0]
        if (!file) return

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                try {
                    const importedExpenses = results.data.map(row => {
                        // Validate required fields
                        if (!row.Amount || !row.Category || !row.Date) {
                            throw new Error('Missing required fields (Amount, Category, Date)')
                        }

                        return {
                            date: row.Date,
                            category: row.Category,
                            amount: parseFloat(row.Amount),
                            note: row.Note || ''
                        }
                    }).filter(expense => !isNaN(expense.amount) && expense.amount > 0)

                    if (importedExpenses.length === 0) {
                        throw new Error('No valid expenses found in CSV')
                    }

                    importExpenses(importedExpenses)
                    showNotification(`Successfully imported ${importedExpenses.length} expenses!`)
                } catch (error) {
                    showNotification(`Import failed: ${error.message}`, 'error')
                }
            },
            error: (error) => {
                showNotification(`Failed to parse CSV: ${error.message}`, 'error')
            }
        })

        // Reset file input
        event.target.value = ''
    }

    return (
        <div className="flex items-center gap-3">
            {/* Import button */}
            <label className="relative cursor-pointer">
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleImport}
                    className="hidden"
                />
                <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-xl hover:bg-primary-100 transition-all duration-200 font-medium border border-primary-200">
                    <Upload className="w-4 h-4" />
                    <span className="hidden sm:inline">Import CSV</span>
                </div>
            </label>

            {/* Export button */}
            <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-accent-50 text-accent-600 rounded-xl hover:bg-accent-100 transition-all duration-200 font-medium border border-accent-200"
            >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export CSV</span>
            </button>

            {/* Notification */}
            {notification && (
                <div className={`fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg animate-slide-up ${notification.type === 'success' ? 'bg-accent-50 text-accent-700 border border-accent-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {notification.type === 'success' ?
                        <CheckCircle className="w-5 h-5" /> :
                        <AlertCircle className="w-5 h-5" />
                    }
                    <span className="font-medium">{notification.message}</span>
                </div>
            )}
        </div>
    )
}

export default TopBar