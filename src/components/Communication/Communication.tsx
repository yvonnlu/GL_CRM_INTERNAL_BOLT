import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, Search, Filter, Calendar, User, Paperclip } from 'lucide-react';

const Communication: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inbox' | 'sent' | 'calls' | 'messages'>('inbox');

  const communications = [
    {
      id: '1',
      type: 'email',
      subject: 'Campaign Performance Review',
      from: 'jennifer@techcorp.com',
      to: 'sarah@agency.com',
      date: '2024-02-10 14:30',
      status: 'unread',
      priority: 'high',
      content: 'Hi Sarah, I wanted to discuss the latest campaign metrics...',
      client: 'TechCorp Inc.',
      hasAttachment: true
    },
    {
      id: '2',
      type: 'call',
      subject: 'Discovery Call',
      from: 'michael@startupxyz.com',
      to: 'mike@agency.com',
      date: '2024-02-10 11:00',
      status: 'completed',
      priority: 'medium',
      duration: '45 min',
      notes: 'Discussed project scope and budget requirements',
      client: 'StartupXYZ',
      hasAttachment: false
    },
    {
      id: '3',
      type: 'message',
      subject: 'Quick question about timeline',
      from: 'sarah@enterprise.com',
      to: 'emma@agency.com',
      date: '2024-02-09 16:45',
      status: 'read',
      priority: 'low',
      content: 'Can we push the deadline by a week?',
      client: 'Enterprise Ltd.',
      hasAttachment: false
    },
    {
      id: '4',
      type: 'email',
      subject: 'Proposal Follow-up',
      from: 'david@localbiz.com',
      to: 'david@agency.com',
      date: '2024-02-09 09:15',
      status: 'read',
      priority: 'high',
      content: 'Thank you for the detailed proposal. We have a few questions...',
      client: 'Local Business',
      hasAttachment: false
    },
    {
      id: '5',
      type: 'call',
      subject: 'Monthly Check-in',
      from: 'emily@marketingplus.com',
      to: 'lisa@agency.com',
      date: '2024-02-08 15:30',
      status: 'scheduled',
      priority: 'medium',
      duration: '30 min',
      notes: 'Scheduled for next week',
      client: 'Marketing Plus',
      hasAttachment: false
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'call': return <Phone className="w-4 h-4" />;
      case 'message': return <MessageSquare className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const filteredCommunications = communications.filter(comm => {
    if (activeTab === 'inbox') return comm.type === 'email' && comm.to.includes('@agency.com');
    if (activeTab === 'sent') return comm.type === 'email' && comm.from.includes('@agency.com');
    if (activeTab === 'calls') return comm.type === 'call';
    if (activeTab === 'messages') return comm.type === 'message';
    return true;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Communication Center</h2>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab('inbox')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                activeTab === 'inbox' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Mail className="w-4 h-4 mr-2" />
              Inbox
            </button>
            <button
              onClick={() => setActiveTab('sent')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                activeTab === 'sent' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Send className="w-4 h-4 mr-2" />
              Sent
            </button>
            <button
              onClick={() => setActiveTab('calls')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                activeTab === 'calls' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Phone className="w-4 h-4 mr-2" />
              Calls
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                activeTab === 'messages' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search communications..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 capitalize">{activeTab}</h3>
            </div>
            
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {filteredCommunications.map((comm) => (
                <div key={comm.id} className={`p-4 hover:bg-gray-50 cursor-pointer border-l-4 ${getPriorityColor(comm.priority)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="flex-shrink-0 mt-1">
                        {getTypeIcon(comm.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900 truncate">{comm.subject}</h4>
                          {comm.hasAttachment && <Paperclip className="w-3 h-3 text-gray-400" />}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {comm.type === 'call' ? `${comm.from} → ${comm.to}` : `From: ${comm.from}`}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {comm.content || comm.notes}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(comm.status)}`}>
                        {comm.status}
                      </span>
                      <span className="text-xs text-gray-500 whitespace-nowrap">{comm.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                <Mail className="w-4 h-4 mr-2" />
                Compose Email
              </button>
              {/* <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                <Phone className="w-4 h-4 mr-2" />
                Schedule Call
              </button> */}
              <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Today's Schedule</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Client Call - TechCorp</p>
                  <p className="text-xs text-gray-500">10:00 AM - 11:00 AM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Team Meeting</p>
                  <p className="text-xs text-gray-500">2:00 PM - 3:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Proposal Review</p>
                  <p className="text-xs text-gray-500">4:00 PM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Team Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs text-white">
                    SJ
                  </div>
                  <span className="text-sm text-gray-900">Sarah J.</span>
                </div>
                <span className="text-xs text-green-600">Available</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-xs text-white">
                    MC
                  </div>
                  <span className="text-sm text-gray-900">Mike C.</span>
                </div>
                <span className="text-xs text-yellow-600">In Meeting</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                    ER
                  </div>
                  <span className="text-sm text-gray-900">Emma R.</span>
                </div>
                <span className="text-xs text-red-600">Busy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;