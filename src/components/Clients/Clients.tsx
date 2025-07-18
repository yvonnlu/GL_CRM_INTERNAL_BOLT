import React, { useState } from 'react';
import { Plus, Search, Filter, Mail, Phone, Calendar, MoreVertical, Star, Download, RefreshCw, Users, TrendingUp, Target, Clock, DollarSign, Building, Award } from 'lucide-react';
import ClientDetail from './ClientDetail';

const Clients: React.FC = () => {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const clients = [
    {
      id: 1,
      name: 'TechCorp Inc.',
      contactPerson: 'Jennifer Walsh',
      email: 'jennifer@techcorp.com',
      phone: '+1 (555) 123-4567',
      status: 'active',
      tier: 'enterprise',
      monthlyValue: '$15,000',
      totalSpent: '$180,000',
      avatar: 'TC',
      startDate: '2023-08-15T00:00:00Z',
      industry: 'Technology',
      services: ['SEO', 'PPC', 'Content Marketing'],
      nextReview: '2024-03-15',
      satisfaction: 4.8,
      projects: 12,
      accountManager: 'Sarah Johnson'
    },
    {
      id: 2,
      name: 'StartupXYZ',
      contactPerson: 'Michael Chen',
      email: 'michael@startupxyz.com',
      phone: '+1 (555) 987-6543',
      status: 'active',
      tier: 'growth',
      monthlyValue: '$8,500',
      totalSpent: '$68,000',
      avatar: 'SX',
      startDate: '2023-10-01T00:00:00Z',
      industry: 'Startup',
      services: ['Social Media', 'Branding', 'Web Development'],
      nextReview: '2024-02-28',
      satisfaction: 4.6,
      projects: 8,
      accountManager: 'Mike Chen'
    },
    {
      id: 3,
      name: 'Enterprise Solutions Ltd.',
      contactPerson: 'Sarah Martinez',
      email: 'sarah@enterprise.com',
      phone: '+1 (555) 456-7890',
      status: 'active',
      tier: 'enterprise',
      monthlyValue: '$25,000',
      totalSpent: '$300,000',
      avatar: 'ES',
      startDate: '2023-06-01T00:00:00Z',
      industry: 'Enterprise Software',
      services: ['SEO', 'PPC', 'Content Marketing', 'Social Media', 'Analytics'],
      nextReview: '2024-03-01',
      satisfaction: 4.9,
      projects: 18,
      accountManager: 'Emma Rodriguez'
    },
    {
      id: 4,
      name: 'Local Business Co.',
      contactPerson: 'David Thompson',
      email: 'david@localbiz.com',
      phone: '+1 (555) 234-5678',
      status: 'paused',
      tier: 'basic',
      monthlyValue: '$2,500',
      totalSpent: '$15,000',
      avatar: 'LB',
      startDate: '2023-11-15T00:00:00Z',
      industry: 'Local Services',
      services: ['Local SEO', 'Google Ads'],
      nextReview: '2024-02-20',
      satisfaction: 4.2,
      projects: 3,
      accountManager: 'David Thompson'
    },
    {
      id: 5,
      name: 'Marketing Plus Agency',
      contactPerson: 'Emily Rodriguez',
      email: 'emily@marketingplus.com',
      phone: '+1 (555) 345-6789',
      status: 'active',
      tier: 'growth',
      monthlyValue: '$12,000',
      totalSpent: '$96,000',
      avatar: 'MP',
      startDate: '2023-07-20T00:00:00Z',
      industry: 'Marketing',
      services: ['Content Marketing', 'Social Media', 'Email Marketing'],
      nextReview: '2024-03-10',
      satisfaction: 4.7,
      projects: 10,
      accountManager: 'Lisa Martinez'
    },
    {
      id: 6,
      name: 'E-commerce Store',
      contactPerson: 'James Wilson',
      email: 'james@ecommerce.com',
      phone: '+1 (555) 567-8901',
      status: 'active',
      tier: 'growth',
      monthlyValue: '$9,500',
      totalSpent: '$57,000',
      avatar: 'EC',
      startDate: '2023-09-10T00:00:00Z',
      industry: 'E-commerce',
      services: ['PPC', 'Social Media Ads', 'Conversion Optimization'],
      nextReview: '2024-02-25',
      satisfaction: 4.5,
      projects: 7,
      accountManager: 'John Davis'
    },
    {
      id: 7,
      name: 'Healthcare Clinic',
      contactPerson: 'Lisa Park',
      email: 'lisa@healthclinic.com',
      phone: '+1 (555) 678-9012',
      status: 'active',
      tier: 'basic',
      monthlyValue: '$4,500',
      totalSpent: '$27,000',
      avatar: 'HC',
      startDate: '2023-12-01T00:00:00Z',
      industry: 'Healthcare',
      services: ['Local SEO', 'Content Marketing', 'Reputation Management'],
      nextReview: '2024-03-05',
      satisfaction: 4.8,
      projects: 5,
      accountManager: 'Sarah Johnson'
    },
    {
      id: 8,
      name: 'Tech Solutions Inc.',
      contactPerson: 'Robert Kim',
      email: 'robert@techsolutions.com',
      phone: '+1 (555) 789-0123',
      status: 'churned',
      tier: 'growth',
      monthlyValue: '$0',
      totalSpent: '$45,000',
      avatar: 'TS',
      startDate: '2023-05-15T00:00:00Z',
      industry: 'Technology',
      services: ['Branding', 'Web Development'],
      nextReview: null,
      satisfaction: 3.8,
      projects: 6,
      accountManager: 'Mike Chen'
    }
  ];

  const clientStatuses = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'paused', label: 'Paused' },
    { value: 'churned', label: 'Churned' },
    { value: 'at-risk', label: 'At Risk' }
  ];

  const clientTiers = [
    { value: 'all', label: 'All Tiers' },
    { value: 'basic', label: 'Basic' },
    { value: 'growth', label: 'Growth' },
    { value: 'enterprise', label: 'Enterprise' }
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
    { value: 'last-6-months', label: 'Last 6 Months' },
    { value: 'last-year', label: 'Last Year' },
    { value: 'this-year', label: 'This Year' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'churned': return 'bg-red-100 text-red-800';
      case 'at-risk': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      case 'growth': return 'bg-blue-100 text-blue-800';
      case 'basic': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSatisfactionColor = (satisfaction: number) => {
    if (satisfaction >= 4.5) return 'text-green-600';
    if (satisfaction >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const isInDateRange = (startDate: string, range: string) => {
    const clientDate = new Date(startDate);
    const now = new Date();

    switch (range) {
      case 'last-30-days':
        const month = new Date(now);
        month.setDate(month.getDate() - 30);
        return clientDate >= month;
      case 'last-90-days':
        const quarter = new Date(now);
        quarter.setDate(quarter.getDate() - 90);
        return clientDate >= quarter;
      case 'last-6-months':
        const sixMonths = new Date(now);
        sixMonths.setMonth(sixMonths.getMonth() - 6);
        return clientDate >= sixMonths;
      case 'last-year':
        const year = new Date(now);
        year.setFullYear(year.getFullYear() - 1);
        return clientDate >= year;
      case 'this-year':
        const thisYear = new Date(now.getFullYear(), 0, 1);
        return clientDate >= thisYear;
      default:
        return true;
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    const matchesTier = tierFilter === 'all' || client.tier === tierFilter;
    const matchesDateRange = dateRange === 'all' || isInDateRange(client.startDate, dateRange);
    const matchesSearch = searchTerm === '' ||
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.accountManager.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesTier && matchesDateRange && matchesSearch;
  });

  const getClientStats = () => {
    const total = filteredClients.length;
    const active = filteredClients.filter(c => c.status === 'active').length;
    const paused = filteredClients.filter(c => c.status === 'paused').length;
    const churned = filteredClients.filter(c => c.status === 'churned').length;
    const monthlyRevenue = filteredClients
      .filter(c => c.status === 'active')
      .reduce((sum, client) => sum + parseInt(client.monthlyValue.replace(/[$,]/g, '')), 0);
    const totalRevenue = filteredClients.reduce((sum, client) => sum + parseInt(client.totalSpent.replace(/[$,]/g, '')), 0);
    const avgSatisfaction = filteredClients.reduce((sum, client) => sum + client.satisfaction, 0) / filteredClients.length;

    return { total, active, paused, churned, monthlyRevenue, totalRevenue, avgSatisfaction };
  };

  const stats = getClientStats();

  if (selectedClientId) {
    return <ClientDetail clientId={selectedClientId} onBack={() => setSelectedClientId(null)} />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Client Management</h2>
            <p className="text-gray-600">Manage existing clients and track relationships</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export Clients
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Building className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Paused</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.paused}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Churned</p>
                <p className="text-2xl font-bold text-red-600">{stats.churned}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-green-600">${stats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-purple-600">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Satisfaction</p>
                <p className="text-2xl font-bold text-blue-600">{stats.avgSatisfaction.toFixed(1)}</p>
              </div>
              <Award className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {clientStatuses.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>

            {/* Tier Filter */}
            <div>
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {clientTiers.map(tier => (
                  <option key={tier.value} value={tier.value}>{tier.label}</option>
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
        {filteredClients.map((client) => (
          <div
            key={client.id}
            onClick={() => setSelectedClientId(client.id.toString())}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  {client.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-600">{client.contactPerson}</p>
                  <p className="text-xs text-gray-500">{client.industry}</p>
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
                <span className="text-sm text-gray-600">{client.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{client.phone}</span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                  {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(client.tier)}`}>
                  {client.tier.charAt(0).toUpperCase() + client.tier.slice(1)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Satisfaction:</span>
                  <div className="flex items-center space-x-1">
                    <span className={`font-medium ${getSatisfactionColor(client.satisfaction)}`}>
                      {client.satisfaction}
                    </span>
                    <span className="text-yellow-500">★</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{client.projects} projects</span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Monthly Value:</span>
                <span className="font-medium text-green-600">{client.monthlyValue}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Total Spent:</span>
                <span className="font-medium text-gray-900">{client.totalSpent}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Start Date:</span>
                <span className="text-gray-600">{new Date(client.startDate).toLocaleDateString()}</span>
              </div>
              {client.nextReview && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Next Review:</span>
                  <span className="text-gray-600">{client.nextReview}</span>
                </div>
              )}
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Services:</p>
              <div className="flex flex-wrap gap-1">
                {client.services.map((service, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-500">Account Manager: <span className="font-medium text-gray-700">{client.accountManager}</span></p>
            </div>

            <div className="flex items-center space-x-2">
              <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Open Client
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle email
                }}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors border border-gray-300 rounded-lg"
              >
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
              {/* <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle calendar
                }}
                className="p-2 text-gray-400 hover:text-purple-600 transition-colors border border-gray-300 rounded-lg"
              >
                <Calendar className="w-4 h-4" />
              </button> */}
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No clients found matching your filters</p>
          <button
            onClick={() => {
              setStatusFilter('all');
              setTierFilter('all');
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

export default Clients;