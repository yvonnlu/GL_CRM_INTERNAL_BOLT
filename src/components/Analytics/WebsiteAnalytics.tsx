import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Users, MousePointer, Clock, Globe, MessageCircle, Phone, Zap, ExternalLink, Filter, Calendar, Download, RefreshCw } from 'lucide-react';

interface ConversionData {
  contactForm: number;
  messenger: number;
  zalo: number;
  whatsapp: number;
  phone: number;
}

interface AnalyticsData {
  website: string;
  url: string;
  traffic: number;
  uniqueVisitors: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: string;
  conversions: ConversionData;
  conversionRate: number;
  topPages: Array<{ 
    page: string; 
    views: number; 
    bounceRate: number;
    conversions: number;
    conversionRate: number;
  }>;
  trafficSources: Array<{ 
    source: string; 
    percentage: number; 
    visitors: number;
    bounceRate: number;
    conversions: number;
  }>;
  hourlyTraffic: Array<{ hour: number; visitors: number }>;
  deviceBreakdown: Array<{ device: string; percentage: number; visitors: number }>;
  locationData: Array<{ country: string; visitors: number; percentage: number }>;
}

const WebsiteAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedWebsite, setSelectedWebsite] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const analyticsData: AnalyticsData[] = [
    {
      website: 'gleads.vn',
      url: 'https://gleads.vn',
      traffic: 15234,
      uniqueVisitors: 12456,
      pageViews: 45678,
      bounceRate: 42.3,
      avgSessionDuration: '2:34',
      conversions: {
        contactForm: 89,
        messenger: 156,
        zalo: 67,
        whatsapp: 234,
        phone: 45
      },
      conversionRate: 3.8,
      topPages: [
        { page: '/services', views: 3456, bounceRate: 35.2, conversions: 45, conversionRate: 1.3 },
        { page: '/about', views: 2890, bounceRate: 48.1, conversions: 23, conversionRate: 0.8 },
        { page: '/contact', views: 2134, bounceRate: 28.9, conversions: 67, conversionRate: 3.1 },
        { page: '/pricing', views: 1876, bounceRate: 52.3, conversions: 34, conversionRate: 1.8 },
        { page: '/blog', views: 1654, bounceRate: 65.4, conversions: 12, conversionRate: 0.7 }
      ],
      trafficSources: [
        { source: 'Organic Search', percentage: 45, visitors: 6855, bounceRate: 38.2, conversions: 234 },
        { source: 'Direct', percentage: 28, visitors: 4266, bounceRate: 35.1, conversions: 189 },
        { source: 'Social Media', percentage: 18, visitors: 2742, bounceRate: 52.3, conversions: 87 },
        { source: 'Paid Ads', percentage: 9, visitors: 1371, bounceRate: 28.9, conversions: 81 }
      ],
      hourlyTraffic: [
        { hour: 0, visitors: 234 }, { hour: 1, visitors: 189 }, { hour: 2, visitors: 156 },
        { hour: 3, visitors: 123 }, { hour: 4, visitors: 145 }, { hour: 5, visitors: 178 },
        { hour: 6, visitors: 234 }, { hour: 7, visitors: 345 }, { hour: 8, visitors: 456 },
        { hour: 9, visitors: 567 }, { hour: 10, visitors: 678 }, { hour: 11, visitors: 789 },
        { hour: 12, visitors: 834 }, { hour: 13, visitors: 756 }, { hour: 14, visitors: 689 },
        { hour: 15, visitors: 723 }, { hour: 16, visitors: 645 }, { hour: 17, visitors: 567 },
        { hour: 18, visitors: 489 }, { hour: 19, visitors: 412 }, { hour: 20, visitors: 356 },
        { hour: 21, visitors: 298 }, { hour: 22, visitors: 245 }, { hour: 23, visitors: 201 }
      ],
      deviceBreakdown: [
        { device: 'Desktop', percentage: 52, visitors: 7922 },
        { device: 'Mobile', percentage: 38, visitors: 5789 },
        { device: 'Tablet', percentage: 10, visitors: 1523 }
      ],
      locationData: [
        { country: 'United States', visitors: 6789, percentage: 44.6 },
        { country: 'Canada', visitors: 2345, percentage: 15.4 },
        { country: 'United Kingdom', visitors: 1876, percentage: 12.3 },
        { country: 'Australia', visitors: 1234, percentage: 8.1 },
        { country: 'Germany', visitors: 987, percentage: 6.5 }
      ]
    },
    {
      website: 'gleadsglobal.com',
      url: 'https://gleadsglobal.com',
      traffic: 8967,
      uniqueVisitors: 7234,
      pageViews: 23456,
      bounceRate: 38.7,
      avgSessionDuration: '3:12',
      conversions: {
        contactForm: 45,
        messenger: 89,
        zalo: 23,
        whatsapp: 134,
        phone: 28
      },
      conversionRate: 3.6,
      topPages: [
        { page: '/products', views: 2134, bounceRate: 32.1, conversions: 34, conversionRate: 1.6 },
        { page: '/pricing', views: 1890, bounceRate: 41.2, conversions: 45, conversionRate: 2.4 },
        { page: '/demo', views: 1567, bounceRate: 25.8, conversions: 67, conversionRate: 4.3 },
        { page: '/features', views: 1234, bounceRate: 48.9, conversions: 23, conversionRate: 1.9 },
        { page: '/support', views: 987, bounceRate: 55.2, conversions: 12, conversionRate: 1.2 }
      ],
      trafficSources: [
        { source: 'Organic Search', percentage: 52, visitors: 4663, bounceRate: 35.4, conversions: 156 },
        { source: 'Direct', percentage: 23, visitors: 2062, bounceRate: 32.1, conversions: 89 },
        { source: 'Social Media', percentage: 15, visitors: 1345, bounceRate: 45.6, conversions: 45 },
        { source: 'Paid Ads', percentage: 10, visitors: 897, bounceRate: 28.3, conversions: 29 }
      ],
      hourlyTraffic: [
        { hour: 0, visitors: 123 }, { hour: 1, visitors: 98 }, { hour: 2, visitors: 87 },
        { hour: 3, visitors: 76 }, { hour: 4, visitors: 89 }, { hour: 5, visitors: 112 },
        { hour: 6, visitors: 145 }, { hour: 7, visitors: 234 }, { hour: 8, visitors: 345 },
        { hour: 9, visitors: 456 }, { hour: 10, visitors: 523 }, { hour: 11, visitors: 589 },
        { hour: 12, visitors: 634 }, { hour: 13, visitors: 578 }, { hour: 14, visitors: 512 },
        { hour: 15, visitors: 489 }, { hour: 16, visitors: 445 }, { hour: 17, visitors: 398 },
        { hour: 18, visitors: 334 }, { hour: 19, visitors: 289 }, { hour: 20, visitors: 234 },
        { hour: 21, visitors: 198 }, { hour: 22, visitors: 156 }, { hour: 23, visitors: 123 }
      ],
      deviceBreakdown: [
        { device: 'Desktop', percentage: 48, visitors: 4304 },
        { device: 'Mobile', percentage: 42, visitors: 3766 },
        { device: 'Tablet', percentage: 10, visitors: 897 }
      ],
      locationData: [
        { country: 'United States', visitors: 3587, percentage: 40.0 },
        { country: 'India', visitors: 1793, percentage: 20.0 },
        { country: 'United Kingdom', visitors: 1345, percentage: 15.0 },
        { country: 'Canada', visitors: 897, percentage: 10.0 },
        { country: 'Australia', visitors: 672, percentage: 7.5 }
      ]
    }
  ];

  const getConversionIcon = (type: string) => {
    switch (type) {
      case 'contactForm': return <MessageCircle className="w-4 h-4" />;
      case 'messenger': return <MessageCircle className="w-4 h-4" />;
      case 'zalo': return <Zap className="w-4 h-4" />;
      case 'whatsapp': return <MessageCircle className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getConversionColor = (type: string) => {
    switch (type) {
      case 'contactForm': return 'text-blue-600 bg-blue-50';
      case 'messenger': return 'text-purple-600 bg-purple-50';
      case 'zalo': return 'text-yellow-600 bg-yellow-50';
      case 'whatsapp': return 'text-green-600 bg-green-50';
      case 'phone': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const refreshData = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const exportData = () => {
    // Simulate export functionality
    const dataToExport = selectedWebsite === 'all' ? analyticsData : analyticsData.filter(d => d.website === selectedWebsite);
    console.log('Exporting data:', dataToExport);
    alert('Data exported successfully!');
  };

  const filteredData = selectedWebsite === 'all' ? analyticsData : analyticsData.filter(d => d.website === selectedWebsite);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Website Analytics</h2>
          <div className="flex items-center space-x-3">
            <select
              value={selectedWebsite}
              onChange={(e) => setSelectedWebsite(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Websites</option>
              {analyticsData.map(data => (
                <option key={data.website} value={data.website}>{data.website}</option>
              ))}
            </select>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="text-sm">Refresh</span>
            </button>
            <button
              onClick={exportData}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Traffic</p>
                <p className="text-2xl font-bold text-blue-900">
                  {filteredData.reduce((sum, data) => sum + data.traffic, 0).toLocaleString()}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Unique Visitors</p>
                <p className="text-2xl font-bold text-green-900">
                  {filteredData.reduce((sum, data) => sum + data.uniqueVisitors, 0).toLocaleString()}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Page Views</p>
                <p className="text-2xl font-bold text-purple-900">
                  {filteredData.reduce((sum, data) => sum + data.pageViews, 0).toLocaleString()}
                </p>
              </div>
              <MousePointer className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Total Conversions</p>
                <p className="text-2xl font-bold text-orange-900">
                  {filteredData.reduce((sum, data) => 
                    sum + Object.values(data.conversions).reduce((a, b) => a + b, 0), 0
                  ).toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">Avg. Bounce Rate</p>
                <p className="text-2xl font-bold text-red-900">
                  {(filteredData.reduce((sum, data) => sum + data.bounceRate, 0) / filteredData.length).toFixed(1)}%
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {filteredData.map((data, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Globe className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{data.website}</h3>
                  <a 
                    href={data.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    {data.url}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <span className="text-sm text-gray-500">Conversion Rate:</span>
                  <span className="text-lg font-bold text-green-600 ml-2">{data.conversionRate}%</span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500">Avg. Session:</span>
                  <span className="text-lg font-bold text-purple-600 ml-2">{data.avgSessionDuration}</span>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Traffic</p>
                    <p className="text-2xl font-bold text-blue-900">{data.traffic.toLocaleString()}</p>
                    <p className="text-xs text-blue-600">Unique: {data.uniqueVisitors.toLocaleString()}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-600 font-medium">Bounce Rate</p>
                    <p className="text-2xl font-bold text-red-900">{data.bounceRate}%</p>
                    <p className="text-xs text-red-600">Page Views: {data.pageViews.toLocaleString()}</p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-red-600" />
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600 font-medium">Avg. Session</p>
                    <p className="text-2xl font-bold text-purple-900">{data.avgSessionDuration}</p>
                    <p className="text-xs text-purple-600">Duration</p>
                  </div>
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-medium">Conversions</p>
                    <p className="text-2xl font-bold text-green-900">
                      {Object.values(data.conversions).reduce((a, b) => a + b, 0)}
                    </p>
                    <p className="text-xs text-green-600">Rate: {data.conversionRate}%</p>
                  </div>
                  <MousePointer className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
              {/* Conversion Breakdown */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Conversion Breakdown</h4>
                <div className="space-y-3">
                  {Object.entries(data.conversions).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getConversionColor(type)}`}>
                          {getConversionIcon(type)}
                        </div>
                        <div>
                          <span className="font-medium text-gray-900 capitalize">
                            {type === 'contactForm' ? 'Contact Form' : type}
                          </span>
                          <p className="text-xs text-gray-500">
                            {((count / Object.values(data.conversions).reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-900">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Traffic Sources */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h4>
                <div className="space-y-3">
                  {data.trafficSources.map((source, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{source.source}</span>
                        <span className="text-sm text-gray-600">{source.visitors.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{source.percentage}% of traffic</span>
                        <span>{source.conversions} conversions</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Device Breakdown */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Device Breakdown</h4>
                <div className="space-y-3">
                  {data.deviceBreakdown.map((device, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{device.device}</span>
                        <span className="text-sm text-gray-600">{device.visitors.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${device.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {device.percentage}% of visitors
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Pages */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Pages</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-medium text-gray-900">Page</th>
                      <th className="text-left p-3 font-medium text-gray-900">Views</th>
                      <th className="text-left p-3 font-medium text-gray-900">Bounce Rate</th>
                      <th className="text-left p-3 font-medium text-gray-900">Conversions</th>
                      <th className="text-left p-3 font-medium text-gray-900">Conv. Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topPages.map((page, idx) => (
                      <tr key={idx} className="border-b border-gray-200">
                        <td className="p-3 font-medium text-gray-900">{page.page}</td>
                        <td className="p-3 text-gray-600">{page.views.toLocaleString()}</td>
                        <td className="p-3">
                          <span className={`font-medium ${page.bounceRate < 40 ? 'text-green-600' : page.bounceRate < 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {page.bounceRate}%
                          </span>
                        </td>
                        <td className="p-3 text-gray-600">{page.conversions}</td>
                        <td className="p-3">
                          <span className={`font-medium ${page.conversionRate > 2 ? 'text-green-600' : page.conversionRate > 1 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {page.conversionRate}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Hourly Traffic Chart */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Hourly Traffic Pattern</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-end space-x-1 h-32">
                  {data.hourlyTraffic.map((hour, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center">
                      <div 
                        className="bg-blue-500 rounded-t w-full"
                        style={{ 
                          height: `${(hour.visitors / Math.max(...data.hourlyTraffic.map(h => h.visitors))) * 100}%`,
                          minHeight: '4px'
                        }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-1">{hour.hour}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Location Data */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Locations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.locationData.map((location, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{location.country}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">{location.visitors.toLocaleString()}</span>
                      <span className="text-sm font-medium text-gray-900">{location.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebsiteAnalytics;