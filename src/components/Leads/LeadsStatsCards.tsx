import React from 'react';
import { Lead } from '../../utils/loadLeadsData';
import { startOfDay, endOfDay, isWithinInterval } from 'date-fns';

interface LeadsStatsCardsProps {
    filteredLeads: Lead[];
    totalLeadValue: number; // Keeping for backward compatibility
}

const LeadsStatsCards: React.FC<LeadsStatsCardsProps> = ({ filteredLeads }) => {
    // Calculate today's date range for filtering
    const today = new Date();
    const todayStart = startOfDay(today);
    const todayEnd = endOfDay(today);

    // Calculate current month's date range
    const currentMonth = new Date();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const firstDayOfMonthStart = startOfDay(firstDayOfMonth);
    const lastDayOfMonthEnd = endOfDay(lastDayOfMonth);

    // Calculate total estimated value for current month
    const currentMonthEstValue = filteredLeads
        .filter(lead =>
            isWithinInterval(lead.created, {
                start: firstDayOfMonthStart,
                end: lastDayOfMonthEnd,
            })
        )
        .reduce((total, lead) => total + lead.estimatedValue, 0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                        <svg
                            className="w-6 h-6 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            ></path>
                        </svg>
                    </div>
                    <div className="ml-4">
                        <h2 className="text-sm font-medium text-gray-600">Total Leads</h2>
                        <p className="text-2xl font-semibold text-gray-900">
                            {filteredLeads.length}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
                        <svg
                            className="w-6 h-6 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            ></path>
                        </svg>
                    </div>
                    <div className="ml-4">
                        <h2 className="text-sm font-medium text-gray-600">New Today</h2>
                        <p className="text-2xl font-semibold text-gray-900">
                            {
                                filteredLeads.filter(
                                    lead =>
                                        lead.salesStage === 'New' &&
                                        isWithinInterval(lead.created, {
                                            start: todayStart,
                                            end: todayEnd,
                                        })
                                ).length
                            }
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-100 rounded-full p-3">
                        <svg
                            className="w-6 h-6 text-purple-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                    </div>
                    <div className="ml-4">
                        <h2 className="text-sm font-medium text-gray-600">Est. Value</h2>
                        <p className="text-2xl font-semibold text-gray-900">
                            {currentMonthEstValue.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadsStatsCards;
