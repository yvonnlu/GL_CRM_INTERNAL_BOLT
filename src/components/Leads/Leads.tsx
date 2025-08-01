import React, { useState, useEffect } from 'react';
import { Users, BarChart3, PlusCircle, DollarSign, Calendar, Download } from 'lucide-react';
import { startOfDay, endOfDay, isWithinInterval } from 'date-fns';
import { useParams, useNavigate } from 'react-router-dom';
import LeadsTable from './LeadsTable';
import LeadDetail from './LeadDetail';
import leadsData, { formatCurrency } from '../../data/leadsData';

const Leads: React.FC = () => {
    const { leadId } = useParams<{ leadId: string }>();
    const navigate = useNavigate();

    // State for date filter
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [filteredLeads, setFilteredLeads] = useState<typeof leadsData>(leadsData);
    // Keep track of whether we're showing default view or filtered view
    const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);

    // Initialize filtered leads on component mount
    useEffect(() => {
        // Just load all leads initially
        setFilteredLeads(leadsData);
        setIsFilterApplied(false);
    }, []);

    // Handle navigation to lead detail
    const handleNavigateToLead = (id: string) => {
        navigate(`/leads/${id}`);
    };

    // If we're showing lead detail and have an ID, render the LeadDetail component
    if (leadId) {
        return <LeadDetail />;
    }

    // Function to filter leads by date range using date-fns
    const filterLeadsByDateRange = () => {
        if (!startDate && !endDate) {
            return leadsData;
        }

        try {
            // Parse dates with date-fns for better handling
            const start = startDate ? startOfDay(new Date(startDate)) : new Date(0);
            const end = endDate ? endOfDay(new Date(endDate)) : endOfDay(new Date());

            console.log('Filtering with dates:', { start, end });

            return leadsData.filter(lead => {
                try {
                    // Debug logging
                    console.log('Lead date:', lead.created, typeof lead.created);
                    return isWithinInterval(lead.created, { start, end });
                } catch (err) {
                    console.error('Error comparing date for lead:', lead.id, err);
                    return false;
                }
            });
        } catch (error) {
            console.error('Error filtering by date range:', error);
            return leadsData;
        }
    };

    // Apply date filter
    const applyDateFilter = () => {
        const filtered = filterLeadsByDateRange();
        console.log(`Filtered leads: ${filtered.length} of ${leadsData.length}`);

        // Calculate Est. Value before and after filtering
        const currentMonthLeads = leadsData.filter(lead =>
            isWithinInterval(lead.created, {
                start: firstDayOfMonthStart,
                end: lastDayOfMonthEnd,
            })
        );
        const currentMonthValue = currentMonthLeads.reduce(
            (total, lead) => total + lead.estimatedValue,
            0
        );
        const filteredValue = filtered.reduce((total, lead) => total + lead.estimatedValue, 0);

        console.log(`Est. Value comparison:
      Current Month (${currentDate.toLocaleString('default', { month: 'long' })}): ${formatCurrency(currentMonthValue)}
      Filtered Selection: ${formatCurrency(filteredValue)}
    `);

        setFilteredLeads(filtered);
        setIsFilterApplied(true);
    };

    // Reset date filter
    const resetDateFilter = () => {
        setStartDate('');
        setEndDate('');
        setFilteredLeads(leadsData);
        setIsFilterApplied(false);
        console.log('Filter reset, showing all leads');
    };

    // Calculate key metrics based on filtered leads
    const totalLeads = filteredLeads.length;

    const hotLeadsCount = filteredLeads.filter(lead => lead.temperatureStatus === 'Hot').length;
    const warmLeadsCount = filteredLeads.filter(lead => lead.temperatureStatus === 'Warm').length;
    const coldLeadsCount = filteredLeads.filter(lead => lead.temperatureStatus === 'Cold').length;

    const newLeadsCount = filteredLeads.filter(lead => lead.pipelineStatus === 'New').length;
    const proposalLeadsCount = filteredLeads.filter(
        lead => lead.pipelineStatus === 'Proposal'
    ).length;
    const negotiationLeadsCount = filteredLeads.filter(
        lead => lead.pipelineStatus === 'Negotiation'
    ).length;

    // Calculate new leads created today
    const today = startOfDay(new Date());
    console.log('Today date for filtering:', today);

    const newLeadsToday = filteredLeads.filter(lead => {
        const isToday =
            lead.pipelineStatus === 'New' &&
            isWithinInterval(lead.created, {
                start: today,
                end: endOfDay(today),
            });
        if (isToday) {
            console.log('Found lead created today:', lead.id, lead.created);
        }
        return isToday;
    }).length;

    // Calculate total estimated value for all filtered leads
    // First, get the current month's first and last day
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const firstDayOfMonthStart = startOfDay(firstDayOfMonth);
    const lastDayOfMonthEnd = endOfDay(lastDayOfMonth);

    // By default, show current month's estimated value
    // Only use filtered leads if filter was explicitly applied via button
    const isDefaultView = !isFilterApplied;

    // Get leads for the current month if no filter is applied, otherwise use filtered leads
    const leadsForEstValue = isDefaultView
        ? leadsData.filter(lead =>
              isWithinInterval(lead.created, {
                  start: firstDayOfMonthStart,
                  end: lastDayOfMonthEnd,
              })
          )
        : filteredLeads;

    // Calculate total estimated value
    const totalEstimatedValue = leadsForEstValue.reduce((total, lead) => {
        return total + lead.estimatedValue;
    }, 0);

    // Key stats cards
    const statsCards = [
        {
            title: 'Total Leads',
            value: isDefaultView ? leadsData.length.toString() : totalLeads.toString(),
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
        },
        {
            title: 'New Today',
            value: newLeadsToday.toString(),
            icon: PlusCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
        },
        {
            title: 'Est. Value',
            value: formatCurrency(totalEstimatedValue),
            icon: DollarSign,
            color: 'text-amber-600',
            bgColor: 'bg-amber-100',
        },
    ];

    // Function to handle lead export
    const handleExportLeads = () => {
        try {
            // Convert leads to CSV format
            const headers = [
                'ID',
                'Name',
                'Company',
                'Email',
                'Phone',
                'Pipeline Status',
                'Temperature',
                'Source',
                'Est. Value',
                'Created',
                'Notes',
            ];
            const csvContent = [
                headers.join(','),
                ...filteredLeads.map(lead =>
                    [
                        lead.id,
                        `"${lead.fullName.replace(/"/g, '""')}"`,
                        `"${lead.companyName.replace(/"/g, '""')}"`,
                        lead.email,
                        lead.phone,
                        lead.pipelineStatus,
                        lead.temperatureStatus,
                        `"${lead.source.replace(/"/g, '""')}"`,
                        lead.estimatedValue,
                        lead.created.toLocaleDateString(),
                        `"${lead.notes.replace(/"/g, '""')}"`,
                    ].join(',')
                ),
            ].join('\n');

            // Create a data URI for the CSV
            const encodedUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);

            // Create a link element and trigger the download
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute(
                'download',
                `leads-export-${new Date().toISOString().slice(0, 10)}.csv`
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error exporting leads:', error);
            alert('There was an error exporting the leads. Please try again.');
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
                        <p className="text-gray-600">
                            Track and manage all your sales leads in one place
                        </p>
                    </div>

                    <button
                        onClick={handleExportLeads}
                        className="mt-3 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-colors"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export Leads
                    </button>
                </div>

                {/* Date Filter */}
                <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <div className="flex flex-col">
                                <label
                                    htmlFor="startDate"
                                    className="text-sm font-medium text-gray-700 mb-1"
                                >
                                    From Date
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <input
                                        type="date"
                                        id="startDate"
                                        value={startDate}
                                        onChange={e => setStartDate(e.target.value)}
                                        className="pl-10 py-2 px-3 border border-gray-300 rounded-md w-full sm:w-40 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label
                                    htmlFor="endDate"
                                    className="text-sm font-medium text-gray-700 mb-1"
                                >
                                    To Date
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <input
                                        type="date"
                                        id="endDate"
                                        value={endDate}
                                        onChange={e => setEndDate(e.target.value)}
                                        className="pl-10 py-2 px-3 border border-gray-300 rounded-md w-full sm:w-40 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 w-full sm:w-auto">
                            <button
                                onClick={applyDateFilter}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex-1 sm:flex-none"
                            >
                                Apply Filter
                            </button>
                            <button
                                onClick={resetDateFilter}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex-1 sm:flex-none"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6 mb-6">
                {statsCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-full ${card.bgColor}`}>
                                    <Icon className={`h-5 w-5 md:h-6 md:w-6 ${card.color}`} />
                                </div>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                                {card.value}
                            </h3>
                            <p className="text-sm text-gray-600">{card.title}</p>
                        </div>
                    );
                })}
            </div>

            {/* Pipeline and Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Pipeline Status */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Pipeline Status</h3>
                        <BarChart3 className="w-5 h-5 text-gray-400" />
                    </div>

                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                        New
                                    </span>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span>{newLeadsCount} leads</span>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-500 h-2 rounded-full"
                                    style={{ width: `${(newLeadsCount / totalLeads) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                        Proposal
                                    </span>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span>{proposalLeadsCount} leads</span>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-yellow-500 h-2 rounded-full"
                                    style={{ width: `${(proposalLeadsCount / totalLeads) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                                        Negotiation
                                    </span>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span>{negotiationLeadsCount} leads</span>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-purple-500 h-2 rounded-full"
                                    style={{
                                        width: `${(negotiationLeadsCount / totalLeads) * 100}%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Temperature Status */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Temperature Status</h3>
                        <BarChart3 className="w-5 h-5 text-gray-400" />
                    </div>

                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                        Hot
                                    </span>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span>{hotLeadsCount} leads</span>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-red-500 h-2 rounded-full"
                                    style={{ width: `${(hotLeadsCount / totalLeads) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                                        Warm
                                    </span>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span>{warmLeadsCount} leads</span>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-orange-500 h-2 rounded-full"
                                    style={{ width: `${(warmLeadsCount / totalLeads) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-cyan-100 text-cyan-800">
                                        Cold
                                    </span>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span>{coldLeadsCount} leads</span>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-500 h-2 rounded-full"
                                    style={{ width: `${(coldLeadsCount / totalLeads) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Leads Table */}
            <div className="mb-6">
                <LeadsTable initialLeads={filteredLeads} onNavigateToLead={handleNavigateToLead} />
            </div>
        </div>
    );
};

export default Leads;
