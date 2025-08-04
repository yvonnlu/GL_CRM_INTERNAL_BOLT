import React, { useState, useMemo, useEffect } from 'react';
import leadsData, {
    Lead,
    SalesStage,
    LeadPriority,
    CustomerPotential,
    LeadSource,
} from '../../../utils/loadLeadsData';
import TableHeader from './TableHeader';
import TableFilters from './TableFilters';
import TableBody from './TableBody';
import TableFooter from './TableFooter';

interface LeadsTableProps {
    initialLeads?: Lead[];
    onNavigateToLead?: (id: string) => void;
}

const LeadsTable: React.FC<LeadsTableProps> = ({ initialLeads = leadsData, onNavigateToLead }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [pipelineFilter, setPipelineFilter] = useState<SalesStage | 'All'>('All');
    const [priorityFilter, setPriorityFilter] = useState<LeadPriority | 'All'>('All');
    const [temperatureFilter, setTemperatureFilter] = useState<CustomerPotential | 'All'>('All');
    const [sourceFilter, setSourceFilter] = useState<LeadSource | 'All'>('All');
    const [sortBy, setSortBy] = useState<keyof Lead | ''>('created');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    // Get filtered leads
    const filteredLeads = useMemo(() => {
        // Make sure initialLeads is defined and is an array
        if (!initialLeads || !Array.isArray(initialLeads)) {
            return [];
        }

        return initialLeads.filter(lead => {
            // Search filter
            const searchMatch =
                searchTerm === '' ||
                lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lead.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lead.email.toLowerCase().includes(searchTerm.toLowerCase());

            // Pipeline status filter
            const pipelineMatch = pipelineFilter === 'All' || lead.salesStage === pipelineFilter;

            // Priority filter
            const priorityMatch = priorityFilter === 'All' || lead.priority === priorityFilter;

            // Temperature status filter
            const temperatureMatch =
                temperatureFilter === 'All' || lead.customerPotential === temperatureFilter;

            // Source filter
            const sourceMatch = sourceFilter === 'All' || lead.source === sourceFilter;

            return searchMatch && pipelineMatch && priorityMatch && temperatureMatch && sourceMatch;
        });
    }, [initialLeads, searchTerm, pipelineFilter, priorityFilter, temperatureFilter, sourceFilter]);

    // Sort filtered leads
    const sortedLeads = useMemo(() => {
        if (!sortBy) return filteredLeads;

        return [...filteredLeads].sort((a, b) => {
            if (sortBy === 'estimatedValue') {
                return sortDirection === 'asc'
                    ? a.estimatedValue - b.estimatedValue
                    : b.estimatedValue - a.estimatedValue;
            }

            if (sortBy === 'created') {
                return sortDirection === 'asc'
                    ? new Date(a.created).getTime() - new Date(b.created).getTime()
                    : new Date(b.created).getTime() - new Date(a.created).getTime();
            }

            const aValue = a[sortBy]?.toString().toLowerCase() || '';
            const bValue = b[sortBy]?.toString().toLowerCase() || '';

            return sortDirection === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        });
    }, [filteredLeads, sortBy, sortDirection]);

    // Handle sort
    const handleSort = (column: keyof Lead) => {
        if (sortBy === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortDirection('asc');
        }
    };

    // Get paginated leads
    const paginatedLeads = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedLeads.slice(startIndex, endIndex);
    }, [sortedLeads, currentPage, itemsPerPage]);

    // Calculate total pages
    const totalPages = useMemo(() => {
        return Math.ceil(sortedLeads.length / itemsPerPage);
    }, [sortedLeads, itemsPerPage]);

    // Page navigation handlers
    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    const goToPreviousPage = () => {
        setCurrentPage(prev => Math.max(1, prev - 1));
    };

    const goToNextPage = () => {
        setCurrentPage(prev => Math.min(totalPages, prev + 1));
    };

    // Toggle dropdown
    const toggleDropdown = (id: string) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    // Handle edit action
    const handleEdit = (lead: Lead) => {
        if (onNavigateToLead) {
            onNavigateToLead(lead.id);
        } else {
            // Fallback behavior if navigation function isn't provided
            alert(`Edit lead: ${lead.fullName}`);
        }
        setOpenDropdownId(null);
    };

    // Handle delete action
    const handleDelete = (lead: Lead) => {
        // In a real application, this would show a confirmation dialog
        // and then delete the lead if confirmed
        if (window.confirm(`Are you sure you want to delete ${lead.fullName}?`)) {
            alert(`Lead ${lead.fullName} would be deleted in a real application`);
        }
        setOpenDropdownId(null);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setOpenDropdownId(null);
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <TableHeader
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                setPipelineFilter={setPipelineFilter}
                pipelineFilter={pipelineFilter}
                setPriorityFilter={setPriorityFilter}
                priorityFilter={priorityFilter}
                setTemperatureFilter={setTemperatureFilter}
                temperatureFilter={temperatureFilter}
                setSourceFilter={setSourceFilter}
                sourceFilter={sourceFilter}
            />

            <div className="overflow-x-auto">
                <table className="w-full table-fixed md:table-auto">
                    <TableFilters handleSort={handleSort} />
                    <TableBody
                        paginatedLeads={paginatedLeads}
                        openDropdownId={openDropdownId}
                        toggleDropdown={toggleDropdown}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </table>
            </div>

            <TableFooter
                paginatedLeads={paginatedLeads}
                filteredLeads={filteredLeads}
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                goToPage={goToPage}
                goToPreviousPage={goToPreviousPage}
                goToNextPage={goToNextPage}
            />
        </div>
    );
};

export default LeadsTable;
