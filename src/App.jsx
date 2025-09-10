import { useState, useEffect } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { ExpenseProvider } from './context/ExpenseContext'
import './App.css'

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        // Check if user is already logged in via JWT presence
        const token = localStorage.getItem('jwt')
        if (token) {
            setIsAuthenticated(true)
        }
    }, [])

    const handleLogin = (success) => {
        if (success) setIsAuthenticated(true)
    }

    const handleLogout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem('jwt')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {!isAuthenticated ? (
                <Login onLogin={handleLogin} />
            ) : (
                <ExpenseProvider>
                    <Dashboard onLogout={handleLogout} />
                </ExpenseProvider>
            )}
        </div>
    )
}

export default App