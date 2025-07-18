import React, { useState, useRef, useEffect } from 'react';
import { Bell, User, ChevronDown } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'success',
    message: 'Congratulations! Q1 sales target achieved.',
    time: 'Just now',
  },
  {
    id: 2,
    type: 'deal',
    message: 'Deal closed with TechCorp Inc. for $45,000 (2 hours ago).',
    time: '2 hours ago',
  },
  {
    id: 3,
    type: 'lead',
    message: 'New lead from Marketing Plus valued at $12,000 (4 hours ago).',
    time: '4 hours ago',
  },
  {
    id: 4,
    type: 'reminder',
    message: 'TechCorp contract renewal is due tomorrow.',
    time: 'Due tomorrow',
  },
];

const typeIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2" />;
    case 'deal':
      return <span className="w-2 h-2 bg-blue-500 rounded-full inline-block mr-2" />;
    case 'lead':
      return <span className="w-2 h-2 bg-yellow-500 rounded-full inline-block mr-2" />;
    case 'reminder':
      return <span className="w-2 h-2 bg-purple-500 rounded-full inline-block mr-2" />;
    default:
      return <span className="w-2 h-2 bg-gray-400 rounded-full inline-block mr-2" />;
  }
};

const Header: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          {/* <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-600">Welcome back, here's what's happening today</p> */}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative" ref={dropdownRef}>
            <button
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors focus:outline-none"
              onClick={() => setShowDropdown((v) => !v)}
              aria-label="Show notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
            </button>
            {showDropdown && (
              <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fade-in">
                <div className="p-4 border-b border-gray-100 font-semibold text-gray-900">Notifications</div>
                <ul className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                  {notifications.length === 0 ? (
                    <li className="p-4 text-gray-500 text-sm">No notifications</li>
                  ) : (
                    notifications.map((n) => (
                      <li key={n.id} className="flex items-start px-4 py-3 hover:bg-gray-50 transition">
                        {typeIcon(n.type)}
                        <div className="flex-1">
                          <div className="text-sm text-gray-800">{n.message}</div>
                          <div className="text-xs text-gray-400 mt-1">{n.time}</div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
              <p className="text-xs text-gray-600">Marketing Manager</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;