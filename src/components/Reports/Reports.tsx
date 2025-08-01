import React, { useState } from 'react';
import {
    BarChart3,
    TrendingUp,
    Download,
    Calendar,
    Filter,
    DollarSign,
    Users,
    Target,
    Clock,
} from 'lucide-react';

const Reports: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>(
        'month'
    );

    const performanceMetrics = [
        { title: 'Revenue Generated', value: '$1.2M', change: '+15.3%', trend: 'up' },
        { title: 'New Clients Acquired', value: '24', change: '+8.7%', trend: 'up' },
        { title: 'Campaign Conversion Rate', value: '12.4%', change: '-2.1%', trend: 'down' },
        { title: 'Client Retention Rate', value: '94.2%', change: '+3.2%', trend: 'up' },
    ];

    const campaignData = [
        {
            name: 'TechCorp Digital Campaign',
            budget: '$45,000',
            spent: '$38,200',
            roi: '285%',
            status: 'active',
        },
        {
            name: 'StartupXYZ Brand Launch',
            budget: '$28,000',
            spent: '$25,600',
            roi: '195%',
            status: 'completed',
        },
        {
            name: 'Enterprise SEO Project',
            budget: '$75,000',
            spent: '$52,300',
            roi: '342%',
            status: 'active',
        },
        {
            name: 'Local Business Social Media',
            budget: '$12,000',
            spent: '$9,800',
            roi: '156%',
            status: 'active',
        },
        {
            name: 'Marketing Plus Content Strategy',
            budget: '$52,000',
            spent: '$48,900',
            roi: '278%',
            status: 'completed',
        },
    ];

    const teamPerformance = [
        {
            name: 'Sarah Johnson',
            role: 'Marketing Manager',
            clients: 8,
            revenue: '$285K',
            satisfaction: '4.9',
        },
        {
            name: 'Mike Chen',
            role: 'Digital Strategist',
            clients: 6,
            revenue: '$198K',
            satisfaction: '4.7',
        },
        {
            name: 'Emma Rodriguez',
            role: 'Content Lead',
            clients: 5,
            revenue: '$156K',
            satisfaction: '4.8',
        },
        {
            name: 'David Thompson',
            role: 'SEO Specialist',
            clients: 7,
            revenue: '$223K',
            satisfaction: '4.6',
        },
        {
            name: 'Lisa Martinez',
            role: 'Social Media Manager',
            clients: 4,
            revenue: '$134K',
            satisfaction: '4.9',
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'completed':
                return 'bg-blue-100 text-blue-800';
            case 'paused':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getTrendColor = (trend: string) => {
        return trend === 'up' ? 'text-green-600' : 'text-red-600';
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Performance Reports</h2>
                    <div className="flex items-center space-x-3">
                        <select
                            value={selectedPeriod}
                            onChange={e => setSelectedPeriod(e.target.value as any)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="quarter">This Quarter</option>
                            <option value="year">This Year</option>
                        </select>
                        <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Filter className="w-4 h-4" />
                            <span className="text-sm">Filter</span>
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </button>
                    </div>
                </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {performanceMetrics.map((metric, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <DollarSign className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                                {metric.change}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
                        <p className="text-sm text-gray-600">{metric.title}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                {/* Revenue Chart */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
                        <Calendar className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                            <BarChart3 className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                            <p className="text-gray-600">Interactive revenue chart</p>
                            <p className="text-sm text-gray-500">Monthly breakdown and trends</p>
                        </div>
                    </div>
                </div>

                {/* Conversion Funnel */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Conversion Funnel</h3>
                        <Target className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Website Visitors</span>
                            <span className="font-medium">15,234</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: '100%' }}
                            ></div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Qualified Leads</span>
                            <span className="font-medium">3,847</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: '65%' }}
                            ></div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Proposals Sent</span>
                            <span className="font-medium">892</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-yellow-600 h-2 rounded-full"
                                style={{ width: '35%' }}
                            ></div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Closed Deals</span>
                            <span className="font-medium">234</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-purple-600 h-2 rounded-full"
                                style={{ width: '15%' }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Campaign Performance */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Campaign Performance</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left p-4 font-medium text-gray-900">
                                    Campaign
                                </th>
                                <th className="text-left p-4 font-medium text-gray-900">Budget</th>
                                <th className="text-left p-4 font-medium text-gray-900">Spent</th>
                                <th className="text-left p-4 font-medium text-gray-900">ROI</th>
                                <th className="text-left p-4 font-medium text-gray-900">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaignData.map((campaign, index) => (
                                <tr key={index} className="border-b border-gray-200">
                                    <td className="p-4 font-medium text-gray-900">
                                        {campaign.name}
                                    </td>
                                    <td className="p-4 text-gray-600">{campaign.budget}</td>
                                    <td className="p-4 text-gray-600">{campaign.spent}</td>
                                    <td className="p-4 font-medium text-green-600">
                                        {campaign.roi}
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}
                                        >
                                            {campaign.status.charAt(0).toUpperCase() +
                                                campaign.status.slice(1)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Team Performance */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Team Performance</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left p-4 font-medium text-gray-900">
                                    Team Member
                                </th>
                                <th className="text-left p-4 font-medium text-gray-900">Role</th>
                                <th className="text-left p-4 font-medium text-gray-900">
                                    Active Clients
                                </th>
                                <th className="text-left p-4 font-medium text-gray-900">
                                    Revenue Generated
                                </th>
                                <th className="text-left p-4 font-medium text-gray-900">
                                    Client Satisfaction
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamPerformance.map((member, index) => (
                                <tr key={index} className="border-b border-gray-200">
                                    <td className="p-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                                                {member.name
                                                    .split(' ')
                                                    .map(n => n[0])
                                                    .join('')}
                                            </div>
                                            <span className="font-medium text-gray-900">
                                                {member.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-600">{member.role}</td>
                                    <td className="p-4 text-gray-900">{member.clients}</td>
                                    <td className="p-4 font-medium text-green-600">
                                        {member.revenue}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center space-x-1">
                                            <span className="text-yellow-500">★</span>
                                            <span className="font-medium text-gray-900">
                                                {member.satisfaction}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Reports;
