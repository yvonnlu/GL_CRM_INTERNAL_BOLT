import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { startOfDay, endOfDay, isWithinInterval } from 'date-fns';
import LeadsTable from './LeadTable/LeadTable';
import LeadDetail from './LeadDetail/LeadDetail';
import leadsData from '../../utils/loadLeadsData';
import LeadsHeader from './LeadsHeader';
import LeadsDateFilter from './LeadsDateFilter';
import LeadsStatsCards from './LeadsStatsCards';
import LeadsStatusCharts from './LeadsStatusCharts';

const Leads: React.FC = () => {
    const { leadId } = useParams<{ leadId: string }>();
    const navigate = useNavigate();

    // State for date filter
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [filteredLeads, setFilteredLeads] = useState<typeof leadsData>(leadsData);
    const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);

    // Initialize filtered leads on component mount
    useEffect(() => {
        setFilteredLeads(leadsData);
        setIsFilterApplied(false);
    }, []);

    // Handle navigation to lead detail
    const handleNavigateToLead = (id: string) => {
        navigate(`/leads/${id}`);
    };

    // If we're showing lead detail and have an ID, render the LeadDetail component
    if (leadId) {
        return <LeadDetail leadId={leadId} onBack={() => navigate('/leads')} />;
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

            return leadsData.filter(lead => {
                try {
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
        setFilteredLeads(filtered);
        setIsFilterApplied(true);
    };

    // Reset date filter
    const resetDateFilter = () => {
        setStartDate('');
        setEndDate('');
        setFilteredLeads(leadsData);
        setIsFilterApplied(false);
    };

    // Calculate total estimated value
    // First, get the current month's first and last day
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const firstDayOfMonthStart = startOfDay(firstDayOfMonth);
    const lastDayOfMonthEnd = endOfDay(lastDayOfMonth);

    // By default, show current month's estimated value
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
                'Sales Stage',
                'Customer Potential',
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
                        lead.salesStage,
                        lead.customerPotential,
                        `"${lead.source.replace(/"/g, '""')}"`,
                        lead.estimatedValue,
                        lead.created.toLocaleDateString(),
                        `"${lead.notes && lead.notes.length > 0 ? lead.notes[0].content.replace(/"/g, '""') : ''}"`,
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
            <LeadsHeader onExportLeads={handleExportLeads} />

            {/* Date Filter */}
            <div className="mb-6">
                <LeadsDateFilter
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    applyDateFilter={applyDateFilter}
                    resetDateFilter={resetDateFilter}
                />
            </div>

            {/* Stats Cards */}
            <div className="mb-6">
                <LeadsStatsCards
                    filteredLeads={filteredLeads}
                    totalLeadValue={totalEstimatedValue}
                />
            </div>

            {/* Pipeline and Charts */}
            <div className="mb-6">
                <LeadsStatusCharts filteredLeads={filteredLeads} />
            </div>

            {/* Leads Table */}
            <div className="mb-6">
                <LeadsTable initialLeads={filteredLeads} onNavigateToLead={handleNavigateToLead} />
            </div>
        </div>
    );
};

export default Leads;
