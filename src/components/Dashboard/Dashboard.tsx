import React, { useState } from 'react';
import {
  TrendingUp,
  Users,
  Target,
  DollarSign,
  Calendar,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity,
  Globe,
  Mail,
  Phone,
  FileText,
  Star,
  Zap,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [refreshing, setRefreshing] = useState(false);

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

  // Team Performance
  const teamPerformance = [
    { name: 'Sarah Johnson', role: 'Sales Manager', deals: 23, revenue: '$145K', target: 85, avatar: 'SJ' },
    { name: 'Mike Chen', role: 'Account Executive', deals: 18, revenue: '$120K', target: 92, avatar: 'MC' },
    { name: 'Emma Rodriguez', role: 'Marketing Lead', deals: 15, revenue: '$98K', target: 78, avatar: 'ER' },
    { name: 'David Thompson', role: 'Sales Rep', deals: 12, revenue: '$76K', target: 88, avatar: 'DT' }
  ];

  // Recent Activities
  const recentActivity = [
    { id: 1, type: 'Deal Closed', client: 'TechCorp Inc.', value: '$45K', time: '2 hours ago', status: 'success' },
    { id: 2, type: 'New Lead', client: 'Marketing Plus', value: '$12K', time: '4 hours ago', status: 'new' },
    { id: 3, type: 'Meeting Scheduled', client: 'StartupXYZ', value: '$28K', time: '6 hours ago', status: 'scheduled' },
    { id: 4, type: 'Proposal Sent', client: 'Enterprise Ltd.', value: '$67K', time: '1 day ago', status: 'sent' },
    { id: 5, type: 'Follow-up Due', client: 'Local Business', value: '$15K', time: '2 days ago', status: 'warning' }
  ];

  // Customer Support Metrics
  const supportMetrics = [
    { metric: 'Open Tickets', value: 23, change: '-15%', trend: 'down' },
    { metric: 'Avg Response Time', value: '2.4h', change: '-8%', trend: 'down' },
    { metric: 'Customer Satisfaction', value: '4.8/5', change: '+3%', trend: 'up' },
    { metric: 'Resolution Rate', value: '94%', change: '+2%', trend: 'up' }
  ];

  // Website Analytics
  const websiteStats = [
    { metric: 'Visitors', value: '12,847', change: '+18%' },
    { metric: 'Page Views', value: '45,231', change: '+12%' },
    { metric: 'Bounce Rate', value: '32%', change: '-5%' },
    { metric: 'Avg Session', value: '3m 24s', change: '+8%' }
  ];

  // Upcoming Tasks & Deadlines
  const upcomingTasks = [
    { id: 1, task: 'Q1 Performance Review', assignee: 'Sarah J.', due: 'Today 2:00 PM', priority: 'high', type: 'meeting' },
    { id: 2, task: 'TechCorp Contract Renewal', assignee: 'Mike C.', due: 'Tomorrow', priority: 'high', type: 'deal' },
    { id: 3, task: 'Marketing Campaign Analysis', assignee: 'Emma R.', due: 'Mar 15', priority: 'medium', type: 'report' },
    { id: 4, task: 'Team Training Session', assignee: 'David T.', due: 'Mar 18', priority: 'low', type: 'training' }
  ];

  // Alerts & Notifications
  // const alerts = [
  //   { id: 1, type: 'warning', message: '3 deals are at risk of being lost', action: 'Review Pipeline' },
  //   { id: 2, type: 'info', message: 'Monthly report is ready for review', action: 'View Report' },
  //   { id: 3, type: 'success', message: 'Target achieved for Q1 revenue', action: 'Celebrate' }
  // ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Executive Dashboard</h2>
          <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Alerts */}
      {/* {alerts.length > 0 && (
        <div className="mb-6 space-y-2">
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                alert.type === 'info' ? 'bg-blue-50 border-blue-400' :
                  'bg-green-50 border-green-400'
              }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
                  {alert.type === 'info' && <Activity className="w-5 h-5 text-blue-600" />}
                  {alert.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
                  <span className="text-sm font-medium text-gray-900">{alert.message}</span>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  {alert.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      )} */}

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Pipeline */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
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

        {/* Team Performance */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Team Performance</h3>
            <Users className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {teamPerformance.map((member, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                  {member.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-600">{member.deals} deals</span>
                    <span className="text-xs font-semibold text-green-600">{member.revenue}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                    <div
                      className="bg-blue-500 h-1 rounded-full"
                      style={{ width: `${member.target}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'new' ? 'bg-blue-500' :
                        activity.status === 'scheduled' ? 'bg-yellow-500' :
                          activity.status === 'sent' ? 'bg-purple-500' :
                            'bg-red-500'
                    }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.type}</p>
                    <p className="text-sm text-gray-600">{activity.client} • {activity.value}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Support Metrics */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Customer Support</h3>
            <MessageSquare className="w-5 h-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {supportMetrics.map((metric, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-sm text-gray-600 mb-1">{metric.metric}</p>
                <div className={`text-xs flex items-center justify-center ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {metric.trend === 'up' ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                  {metric.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Website Analytics */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Website Analytics</h3>
            <Globe className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {websiteStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{stat.metric}</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900">{stat.value}</span>
                  <span className="text-xs text-green-600">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Tasks & Deadlines</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-red-500' :
                      task.priority === 'medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                    }`}></div>
                  <div className="flex items-center space-x-2">
                    {task.type === 'meeting' && <Calendar className="w-4 h-4 text-gray-400" />}
                    {task.type === 'deal' && <DollarSign className="w-4 h-4 text-gray-400" />}
                    {task.type === 'report' && <FileText className="w-4 h-4 text-gray-400" />}
                    {task.type === 'training' && <Users className="w-4 h-4 text-gray-400" />}
                    <div>
                      <p className="font-medium text-gray-900">{task.task}</p>
                      <p className="text-sm text-gray-600">Assigned to {task.assignee}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{task.due}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                    }`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
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
            <h3 className="text-lg font-semibold text-gray-900">Lead Sources</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-purple-500 mx-auto mb-2" />
              <p className="text-gray-600">Lead source distribution</p>
              <p className="text-sm text-gray-500">Where your leads are coming from</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;