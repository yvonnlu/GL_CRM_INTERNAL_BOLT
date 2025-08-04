import React, { useMemo } from 'react';
import { Lead, SalesStage, CustomerPotential } from '../../utils/loadLeadsData';

interface LeadsStatusChartsProps {
    filteredLeads: Lead[];
}

interface ChartData {
    [key: string]: number;
}

const LeadsStatusCharts: React.FC<LeadsStatusChartsProps> = ({ filteredLeads }) => {
    // Calculate sales stage statistics
    const salesStageStats = useMemo(() => {
        const stats: ChartData = {};

        filteredLeads.forEach(lead => {
            if (stats[lead.salesStage]) {
                stats[lead.salesStage]++;
            } else {
                stats[lead.salesStage] = 1;
            }
        });

        return stats;
    }, [filteredLeads]);

    // Calculate customer potential statistics
    const customerPotentialStats = useMemo(() => {
        const stats: ChartData = {};

        filteredLeads.forEach(lead => {
            if (stats[lead.customerPotential]) {
                stats[lead.customerPotential]++;
            } else {
                stats[lead.customerPotential] = 1;
            }
        });

        return stats;
    }, [filteredLeads]);

    // Get total count
    const totalLeads = filteredLeads.length;

    // Calculate percentages and colors for sales stage
    const salesStageData = useMemo(() => {
        const colors: Record<SalesStage, string> = {
            New: '#60A5FA', // blue-400
            Proposal: '#34D399', // green-400
            Negotiation: '#F472B6', // pink-400
        };

        return Object.entries(salesStageStats).map(([stage, count]) => ({
            stage,
            count,
            percentage: totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0,
            color: colors[stage as SalesStage] || '#9CA3AF', // gray-400 as fallback
        }));
    }, [salesStageStats, totalLeads]);

    // Calculate percentages and colors for customer potential
    const customerPotentialData = useMemo(() => {
        const colors: Record<CustomerPotential, string> = {
            Hot: '#EF4444', // red-500
            Warm: '#F59E0B', // amber-500
            Cold: '#3B82F6', // blue-500
        };

        return Object.entries(customerPotentialStats).map(([potential, count]) => ({
            potential,
            count,
            percentage: totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0,
            color: colors[potential as CustomerPotential] || '#9CA3AF', // gray-400 as fallback
        }));
    }, [customerPotentialStats, totalLeads]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sales Stage Chart */}
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <h2 className="text-lg font-semibold mb-4">Sales Stage</h2>

                <div className="space-y-4">
                    {salesStageData.map(({ stage, count, percentage, color }) => (
                        <div key={stage}>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">{stage}</span>
                                <span className="text-sm text-gray-500">{count}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="h-2.5 rounded-full"
                                    style={{
                                        width: `${percentage}%`,
                                        backgroundColor: color,
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Customer Potential Chart */}
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <h2 className="text-lg font-semibold mb-4">Customer Potential</h2>

                <div className="space-y-4">
                    {customerPotentialData.map(({ potential, count, percentage, color }) => (
                        <div key={potential}>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">
                                    {potential}
                                </span>
                                <span className="text-sm text-gray-500">{count}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="h-2.5 rounded-full"
                                    style={{
                                        width: `${percentage}%`,
                                        backgroundColor: color,
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeadsStatusCharts;
