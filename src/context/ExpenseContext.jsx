import { createContext, useContext, useReducer, useEffect } from 'react'

const ExpenseContext = createContext()

// Initial state
const initialState = {
    expenses: [],
    monthlyBudget: null, // Ask user to set this on first run
    categories: ['Food', 'Travel', 'Bills', 'Shopping', 'Entertainment', 'Healthcare', 'Education', 'Misc'],
}

// Reducer function
const expenseReducer = (state, action) => {
    switch (action.type) {
        case 'SET_EXPENSES':
            return { ...state, expenses: action.payload }
        case 'ADD_EXPENSE':
            return { ...state, expenses: [...state.expenses, action.payload] }
        case 'UPDATE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.map(expense =>
                    expense.id === action.payload.id ? action.payload : expense
                )
            }
        case 'DELETE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter(expense => expense.id !== action.payload)
            }
        case 'SET_BUDGET':
            return { ...state, monthlyBudget: action.payload }
        case 'IMPORT_EXPENSES':
            return { ...state, expenses: [...state.expenses, ...action.payload] }
        default:
            return state
    }
}

// Provider component
export const ExpenseProvider = ({ children }) => {
    const [state, dispatch] = useReducer(expenseReducer, initialState)

    // Load initial state from API and local budget cache
    useEffect(() => {
        const savedBudget = localStorage.getItem('monthlyBudget')
        if (savedBudget) {
            dispatch({ type: 'SET_BUDGET', payload: parseFloat(savedBudget) })
        }

        const fetchExpenses = async () => {
            try {
                const res = await fetch('/api/expenses', {
                    headers: authHeader()
                })
                if (!res.ok) throw new Error('Failed to load expenses')
                const data = await res.json()
                const normalized = Array.isArray(data) ? data.map(e => ({ ...e, id: e.id ?? e._id })) : []
                dispatch({ type: 'SET_EXPENSES', payload: normalized })
            } catch (_) {
                // keep empty list on failure
            }
        }
        fetchExpenses()
    }, [])

    // Save to localStorage whenever state changes
    // no longer persist expenses in localStorage; server is source of truth

    useEffect(() => {
        if (state.monthlyBudget != null) {
            localStorage.setItem('monthlyBudget', state.monthlyBudget.toString())
        } else {
            localStorage.removeItem('monthlyBudget')
        }
    }, [state.monthlyBudget])

    // Helper functions
    const authHeader = () => {
        const token = localStorage.getItem('jwt')
        return token ? { Authorization: `Bearer ${token}` } : {}
    }

    const addExpense = async (expense) => {
        const payload = {
            ...expense,
            amount: parseFloat(expense.amount),
            date: expense.date || new Date().toISOString().split('T')[0]
        }
        const res = await fetch('/api/expenses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...authHeader() },
            body: JSON.stringify(payload)
        })
        if (res.ok) {
            const created = await res.json()
            const normalized = { ...created, id: created.id ?? created._id }
            dispatch({ type: 'ADD_EXPENSE', payload: normalized })
        }
    }

    const updateExpense = async (expense) => {
        const res = await fetch(`/api/expenses/${expense.id || expense._id}`.replace('undefined',''), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...authHeader() },
            body: JSON.stringify(expense)
        })
        if (res.ok) {
            const saved = await res.json()
            const normalized = { ...saved, id: saved.id ?? saved._id }
            dispatch({ type: 'UPDATE_EXPENSE', payload: normalized })
        }
    }

    const deleteExpense = async (id) => {
        const res = await fetch(`/api/expenses/${id}`, {
            method: 'DELETE',
            headers: authHeader()
        })
        if (res.ok) {
            dispatch({ type: 'DELETE_EXPENSE', payload: id })
        }
    }

    const setBudget = (budget) => {
        dispatch({ type: 'SET_BUDGET', payload: parseFloat(budget) })
    }

    const importExpenses = (expenses) => {
        const processedExpenses = expenses.map(expense => ({
            ...expense,
            id: Date.now() + Math.random(),
            amount: parseFloat(expense.amount)
        }))
        dispatch({ type: 'IMPORT_EXPENSES', payload: processedExpenses })
    }

    // Calculate current month's expenses
    const getCurrentMonthExpenses = () => {
        const now = new Date()
        const currentMonth = now.getMonth()
        const currentYear = now.getFullYear()

        return state.expenses.filter(expense => {
            const expenseDate = new Date(expense.date)
            return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
        })
    }

    const value = {
        ...state,
        addExpense,
        updateExpense,
        deleteExpense,
        setBudget,
        importExpenses,
        getCurrentMonthExpenses
    }

    return (
        <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>
    )
}

// Hook to use the expense context
export const useExpense = () => {
    const context = useContext(ExpenseContext)
    if (!context) {
        throw new Error('useExpense must be used within an ExpenseProvider')
    }
    return context
}