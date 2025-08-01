import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Building, TrendingUp, Settings, Search } from 'lucide-react';

interface SidebarProps {
    activeTab: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const mainNavItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
        { id: 'leads', label: 'Leads', icon: Users, path: '/leads' },
        { id: 'clients', label: 'Clients', icon: Building, path: '/clients' },
        { id: 'pipeline', label: 'Sales', icon: TrendingUp, path: '/pipeline' },
    ];

    return (
        <>
            {/* Hamburger button for mobile */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 bg-white border border-gray-200 rounded-lg p-2 shadow-lg"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
            >
                <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </button>

            {/* Sidebar overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed z-50 top-0 left-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 md:static md:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:flex md:h-screen md:w-64 md:translate-x-0`}
                style={{ minHeight: '100vh' }}
            >
                {/* Close button for mobile */}
                <div className="md:hidden flex justify-end p-4">
                    <button onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
                        <svg
                            className="w-6 h-6 text-gray-700"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                {/* Logo and Company Header */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
                            <img
                                src="public/Logo Gleads-icon.png"
                                alt="Company Logo"
                                className="w-full h-full object-cover"
                                onError={e => {
                                    // Fallback to gradient background with initials if image fails to load
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const parent = target.parentElement;
                                    if (parent) {
                                        parent.innerHTML =
                                            '<span class="text-white font-bold text-lg">AC</span>';
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">GLEADS</h1>
                            <p className="text-sm text-gray-600">Global Marketing Agency</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <nav className="px-4 space-y-1">
                        <div className="py-2">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                Main
                            </h3>
                        </div>
                        {mainNavItems.map(item => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.id}
                                    to={item.path}
                                    onClick={() => {
                                        setSidebarOpen(false); // Close sidebar on mobile after click
                                    }}
                                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                        activeTab === item.id
                                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <Icon className="w-5 h-5 mr-3" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="border-t border-gray-200 p-4">
                    <Link
                        to="/settings"
                        onClick={() => {
                            setSidebarOpen(false); // Close sidebar on mobile after click
                        }}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                            activeTab === 'settings'
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <Settings className="w-5 h-5 mr-3" />
                        Settings
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
