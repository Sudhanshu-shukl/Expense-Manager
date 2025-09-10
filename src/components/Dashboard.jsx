import { useState } from 'react'
import { LogOut, Menu, X } from 'lucide-react'
import Sidebar from './Sidebar'
import MainPanel from './MainPanel'
import TopBar from './TopBar'

const Dashboard = ({ onLogout }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <Sidebar />
                {/* Mobile close button */}
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg"
                >
                    <X className="w-5 h-5 text-gray-600" />
                </button>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar */}
                <div className="bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                            {/* Mobile menu button */}
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-xl bg-white/80 shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                <Menu className="w-5 h-5 text-gray-600" />
                            </button>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                Dashboard
                            </h1>
                        </div>

                        <TopBar />

                        {/* Logout button */}
                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all duration-200 font-medium"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>

                {/* Main panel */}
                <div className="flex-1 overflow-hidden">
                    <MainPanel />
                </div>
            </div>
        </div>
    )
}

export default Dashboard