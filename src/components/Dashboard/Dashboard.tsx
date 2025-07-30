import React, { useState } from 'react';
import {
  TrendingUp,
  Users,
  Target,
  DollarSign,
  ArrowUp,
  ArrowDown,
  BarChart3,
  PieChart
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState({
    from: '2024-01-01',
    to: '2024-01-31'
  });

  // Key Performance Indicators
  const kpis = [
    {
      title: 'Total Revenue',
      value: '$847,629',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      target: '$900,000',
      progress: 94
    },
    {
      title: 'Active Clients',
      value: '184',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      target: '200',
      progress: 92
    },
    {
      title: 'Conversion Rate',
      value: '24.8%',
      change: '-2.1%',
      trend: 'down',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      target: '30%',
      progress: 83
    },
    {
      title: 'Pipeline Value',
      value: '$2.4M',
      change: '+15.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      target: '$3M',
      progress: 80
    }
  ];

  // Sales Pipeline Overview
  const pipelineStages = [
    { stage: 'Leads', count: 156, value: '$780K', color: 'bg-blue-500' },
    { stage: 'Qualified', count: 89, value: '$445K', color: 'bg-yellow-500' },
    { stage: 'Proposal', count: 34, value: '$340K', color: 'bg-orange-500' },
    { stage: 'Negotiation', count: 12, value: '$240K', color: 'bg-purple-500' },
    { stage: 'Closed Won', count: 8, value: '$160K', color: 'bg-green-500' }
  ];

  // Team Members
  const teamMembers = [
    { name: 'Sarah Johnson', role: 'Sales Manager', active: true, clients: 45, revenue: '$145K' },
    { name: 'Mike Chen', role: 'Account Executive', active: true, clients: 38, revenue: '$120K' },
    { name: 'Emma Rodriguez', role: 'Marketing Lead', active: false, clients: 32, revenue: '$98K' },
    { name: 'David Thompson', role: 'Sales Rep', active: true, clients: 28, revenue: '$76K' }
  ];

  // Conversion Rate Data
  const conversionData = {
    totalLeads: 1250,
    convertedLeads: 310,
    conversionRate: 24.8,
    trend: '+2.3%',
    stages: [
      { stage: 'Leads', count: 1250, rate: 100 },
      { stage: 'Qualified', count: 625, rate: 50 },
      { stage: 'Proposal', count: 375, rate: 30 },
      { stage: 'Negotiation', count: 250, rate: 20 },
      { stage: 'Closed Won', count: 310, rate: 24.8 }
    ]
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Executive Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">From:</label>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="text-sm text-gray-600">To:</label>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                  <Icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <div className={`flex items-center text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.trend === 'up' ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                  {kpi.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
              <p className="text-sm text-gray-600 mb-3">{kpi.title}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Target: {kpi.target}</span>
                <span>{kpi.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                <div
                  className={`h-1 rounded-full ${kpi.trend === 'up' ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${kpi.progress}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-8">
        {/* Sales Pipeline */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Sales Pipeline</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {pipelineStages.map((stage, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                  <span className="font-medium text-gray-900">{stage.stage}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{stage.count} deals</span>
                  <span className="font-semibold">{stage.value}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total Pipeline Value</span>
              <span className="font-bold text-gray-900">$1.965M</span>
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        {/* <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Conversion Rate</h3>
            <Target className="w-5 h-5 text-gray-400" />
          </div>

          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-gray-900">{conversionData.conversionRate}%</div>
            <div className="text-sm text-gray-600">Overall Conversion Rate</div>
            <div className="text-sm text-green-600 font-medium">{conversionData.trend} from last period</div>
          </div>

          <div className="space-y-3">
            {conversionData.stages.map((stage, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">{stage.stage}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{stage.count}</span>
                  <span className="text-sm font-semibold text-gray-900">{stage.rate}%</span>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Team Members */}
      <div className="mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
            <Users className="w-5 h-5 text-gray-400" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clients</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue Generated</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teamMembers.map((member, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${member.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {member.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.clients}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">{member.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-blue-500 mx-auto mb-2" />
              <p className="text-gray-600">Revenue trend chart</p>
              <p className="text-sm text-gray-500">Monthly revenue growth visualization</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Conversion Rate</h3>
            <Target className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-purple-500 mx-auto mb-2" />
              <p className="text-gray-600">Conversion rate chart</p>
              <p className="text-sm text-gray-500">Lead to customer conversion visualization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;