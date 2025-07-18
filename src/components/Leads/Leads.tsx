import React, { useState } from 'react';
import { Plus, Search, Filter, Mail, Phone, Calendar, MoreVertical, Star, Download, RefreshCw, Users, TrendingUp, Target, Clock, UserPlus } from 'lucide-react';
import LeadDetail from './LeadDetail';

const Leads: React.FC = () => {
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const leads = [
    {
      id: 1,
      name: 'Jennifer Walsh',
      company: 'TechCorp Inc.',
      email: 'jennifer@techcorp.com',
      phone: '+1 (555) 123-4567',
      status: 'new',
      score: 85,
      lastContact: '2 hours ago',
      source: 'inbound-livechat',
      estimatedValue: '$45,000',
      avatar: 'JW',
      createdAt: '2024-02-10T14:30:00Z',
      leadType: 'hot',
      industry: 'Technology',
      notes: 'Interested in comprehensive digital marketing package',
      nextAction: 'Schedule discovery call',
      priority: 'high'
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'StartupXYZ',
      email: 'michael@startupxyz.com',
      phone: '+1 (555) 987-6543',
      status: 'qualified',
      score: 72,
      lastContact: '1 day ago',
      source: 'outbound-linkedin',
      estimatedValue: '$28,000',
      avatar: 'MC',
      createdAt: '2024-02-09T10:15:00Z',
      leadType: 'warm',
      industry: 'Startup',
      notes: 'Referral from existing client',
      nextAction: 'Send proposal',
      priority: 'medium'
    },
    {
      id: 3,
      name: 'Sarah Martinez',
      company: 'Enterprise Ltd.',
      email: 'sarah@enterprise.com',
      phone: '+1 (555) 456-7890',
      status: 'contacted',
      score: 91,
      lastContact: '3 days ago',
      source: 'inbound-referral',
      estimatedValue: '$75,000',
      avatar: 'SM',
      createdAt: '2024-02-08T16:45:00Z',
      leadType: 'hot',
      industry: 'Enterprise',
      notes: 'Large enterprise client, high potential',
      nextAction: 'Follow up on proposal',
      priority: 'high'
    },
    {
      id: 4,
      name: 'David Thompson',
      company: 'Local Business',
      email: 'david@localbiz.com',
      phone: '+1 (555) 234-5678',
      status: 'nurturing',
      score: 58,
      lastContact: '1 week ago',
      source: 'outbound-email',
      estimatedValue: '$12,000',
      avatar: 'DT',
      createdAt: '2024-02-05T09:20:00Z',
      leadType: 'cold',
      industry: 'Local Business',
      notes: 'Small budget, needs basic package',
      nextAction: 'Send educational content',
      priority: 'low'
    },
    {
      id: 5,
      name: 'Emily Rodriguez',
      company: 'Marketing Plus',
      email: 'emily@marketingplus.com',
      phone: '+1 (555) 345-6789',
      status: 'proposal',
      score: 88,
      lastContact: '2 days ago',
      source: 'inbound-google-ads',
      estimatedValue: '$52,000',
      avatar: 'ER',
      createdAt: '2024-02-07T13:30:00Z',
      leadType: 'hot',
      industry: 'Marketing',
      notes: 'Ready to sign, waiting for proposal approval',
      nextAction: 'Close deal',
      priority: 'high'
    },
    {
      id: 6,
      name: 'James Wilson',
      company: 'E-commerce Store',
      email: 'james@ecommerce.com',
      phone: '+1 (555) 567-8901',
      status: 'new',
      score: 76,
      lastContact: '4 hours ago',
      source: 'inbound-messenger',
      estimatedValue: '$35,000',
      avatar: 'JW',
      createdAt: '2024-02-10T10:15:00Z',
      leadType: 'warm',
      industry: 'E-commerce',
      notes: 'Contacted via Facebook Messenger about PPC campaigns',
      nextAction: 'Qualify requirements',
      priority: 'medium'
    },
    {
      id: 7,
      name: 'Lisa Park',
      company: 'Healthcare Clinic',
      email: 'lisa@healthclinic.com',
      phone: '+1 (555) 678-9012',
      status: 'qualified',
      score: 82,
      lastContact: '6 hours ago',
      source: 'inbound-contact-form',
      estimatedValue: '$22,000',
      avatar: 'LP',
      createdAt: '2024-02-10T08:45:00Z',
      leadType: 'warm',
      industry: 'Healthcare',
      notes: 'Submitted contact form for local SEO services',
      nextAction: 'Schedule consultation',
      priority: 'medium'
    },
    {
      id: 8,
      name: 'Robert Kim',
      company: 'Tech Solutions',
      email: 'robert@techsolutions.com',
      phone: '+1 (555) 789-0123',
      status: 'contacted',
      score: 69,
      lastContact: '2 days ago',
      source: 'outbound-cold-call',
      estimatedValue: '$18,000',
      avatar: 'RK',
      createdAt: '2024-02-08T14:20:00Z',
      leadType: 'cold',
      industry: 'Technology',
      notes: 'Cold outreach, showed interest in branding services',
      nextAction: 'Send case studies',
      priority: 'low'
    }
  ];

  const leadSources = [
    { value: 'all', label: 'All Sources' },
    { value: 'inbound-livechat', label: 'Live Chat' },
    { value: 'inbound-messenger', label: 'Facebook Messenger' },
    { value: 'inbound-contact-form', label: 'Contact Form' },
    { value: 'inbound-google-ads', label: 'Google Ads' },
    { value: 'inbound-referral', label: 'Referral' },
    { value: 'outbound-linkedin', label: 'LinkedIn Outreach' },
    { value: 'outbound-email', label: 'Email Campaign' },
    { value: 'outbound-cold-call', label: 'Cold Call' },
    { value: 'outbound-social', label: 'Social Media Outreach' }
  ];

  const leadStatuses = [
    { value: 'all', label: 'All Status' },
    { value: 'new', label: 'New' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'nurturing', label: 'Nurturing' },
    { value: 'proposal', label: 'Proposal' },
    { value: 'lost', label: 'Lost' }
  ];

  const leadTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'hot', label: 'Hot Lead' },
    { value: 'warm', label: 'Warm Lead' },
    { value: 'cold', label: 'Cold Lead' }
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'nurturing': return 'bg-purple-100 text-purple-800';
      case 'proposal': return 'bg-orange-100 text-orange-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLeadTypeColor = (type: string) => {
    switch (type) {
      case 'hot': return 'bg-red-100 text-red-800';
      case 'warm': return 'bg-yellow-100 text-yellow-800';
      case 'cold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 border-l-red-500';
      case 'medium': return 'bg-yellow-50 border-l-yellow-500';
      case 'low': return 'bg-green-50 border-l-green-500';
      default: return 'bg-gray-50 border-l-gray-500';
    }
  };

  const getSourceColor = (source: string) => {
    if (source.startsWith('inbound')) return 'bg-green-100 text-green-800';
    if (source.startsWith('outbound')) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getSourceLabel = (source: string) => {
    const sourceObj = leadSources.find(s => s.value === source);
    return sourceObj ? sourceObj.label : source;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const isInDateRange = (createdAt: string, range: string) => {
    const leadDate = new Date(createdAt);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (range) {
      case 'today':
        return leadDate >= today;
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return leadDate >= yesterday && leadDate < today;
      case 'last-7-days':
        const week = new Date(today);
        week.setDate(week.getDate() - 7);
        return leadDate >= week;
      case 'last-30-days':
        const month = new Date(today);
        month.setDate(month.getDate() - 30);
        return leadDate >= month;
      case 'last-90-days':
        const quarter = new Date(today);
        quarter.setDate(quarter.getDate() - 90);
        return leadDate >= quarter;
      case 'this-month':
        const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        return leadDate >= thisMonth;
      case 'last-month':
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        return leadDate >= lastMonth && leadDate <= lastMonthEnd;
      default:
        return true;
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesType = typeFilter === 'all' || lead.leadType === typeFilter;
    const matchesDateRange = dateRange === 'all' || isInDateRange(lead.createdAt, dateRange);
    const matchesSearch = searchTerm === '' || 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.industry.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSource && matchesStatus && matchesType && matchesDateRange && matchesSearch;
  });

  const getLeadStats = () => {
    const total = filteredLeads.length;
    const hot = filteredLeads.filter(l => l.leadType === 'hot').length;
    const warm = filteredLeads.filter(l => l.leadType === 'warm').length;
    const cold = filteredLeads.filter(l => l.leadType === 'cold').length;
    const totalValue = filteredLeads.reduce((sum, lead) => sum + parseInt(lead.estimatedValue.replace(/[$,]/g, '')), 0);
    const newToday = filteredLeads.filter(l => isInDateRange(l.createdAt, 'today')).length;
    
    return { total, hot, warm, cold, totalValue, newToday };
  };

  const stats = getLeadStats();

  const convertToClient = (leadId: number) => {
    console.log(`Converting lead ${leadId} to client`);
    alert(`Lead ${leadId} has been converted to a client!`);
  };

  if (selectedLeadId) {
    return <LeadDetail leadId={selectedLeadId} onBack={() => setSelectedLeadId(null)} />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Leads Management</h2>
            <p className="text-gray-600">Track and manage potential clients</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export Leads
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Add Lead
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Today</p>
                <p className="text-2xl font-bold text-blue-600">{stats.newToday}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hot Leads</p>
                <p className="text-2xl font-bold text-red-600">{stats.hot}</p>
              </div>
              <Target className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Warm Leads</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.warm}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cold Leads</p>
                <p className="text-2xl font-bold text-blue-600">{stats.cold}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Est. Value</p>
                <p className="text-2xl font-bold text-green-600">${stats.totalValue.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            {/* Lead Source Filter */}
            <div>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {leadSources.map(source => (
                  <option key={source.value} value={source.value}>{source.label}</option>
                ))}
              </select>
            </div>
            
            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {leadStatuses.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>
            
            {/* Lead Type Filter */}
            <div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {leadTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            
            {/* Date Range Filter */}
            <div>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {dateRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredLeads.map((lead) => (
          <div 
            key={lead.id} 
            onClick={() => setSelectedLeadId(lead.id.toString())}
            className={`bg-white rounded-lg p-6 shadow-sm border-l-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer ${getPriorityColor(lead.priority)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                  {lead.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                  <p className="text-sm text-gray-600">{lead.company}</p>
                  <p className="text-xs text-gray-500">{lead.industry}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-gray-400 hover:text-yellow-500 cursor-pointer" />
                <MoreVertical className="w-4 h-4 text-gray-400 cursor-pointer" />
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{lead.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{lead.phone}</span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                  {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLeadTypeColor(lead.leadType)}`}>
                  {lead.leadType.charAt(0).toUpperCase() + lead.leadType.slice(1)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Score:</span>
                  <span className={`font-medium ${getScoreColor(lead.score)}`}>{lead.score}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSourceColor(lead.source)}`}>
                  {getSourceLabel(lead.source)}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Est. Value:</span>
                <span className="font-medium text-gray-900">{lead.estimatedValue}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Created:</span>
                <span className="text-gray-600">{new Date(lead.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Next Action:</span>
                <span className="text-gray-600 text-xs">{lead.nextAction}</span>
              </div>
            </div>

            {lead.notes && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded">{lead.notes}</p>
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>Last contact: {lead.lastContact}</span>
            </div>

            <div className="flex items-center space-x-2">
              <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                View Details
              </button>
              {/* <button 
                onClick={() => convertToClient(lead.id)}
                className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center justify-center"
              >
                <UserPlus className="w-4 h-4 mr-1" />
                Convert
              </button> */}
              <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors border border-gray-300 rounded-lg">
                <Mail className="w-4 h-4" />
              </button>
              {/* <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle phone call
                }}
                className="p-2 text-gray-400 hover:text-green-600 transition-colors border border-gray-300 rounded-lg"
              >
                <Phone className="w-4 h-4" />
              </button> */}
            </div>
          </div>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No leads found matching your filters</p>
          <button 
            onClick={() => {
              setSourceFilter('all');
              setStatusFilter('all');
              setTypeFilter('all');
              setDateRange('all');
              setSearchTerm('');
            }}
            className="mt-2 text-blue-600 hover:text-blue-800"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Leads;