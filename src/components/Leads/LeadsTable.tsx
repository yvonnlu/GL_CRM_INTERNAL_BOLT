import React, { useState, useMemo, useEffect } from 'react';
import leadsData, {
    Lead,
    LeadPipelineStatus,
    LeadTemperatureStatus,
    LeadSource,
    formatCurrency,
} from '../../data/leadsData';
import {
    Search,
    ChevronDown,
    UserPlus,
    ArrowUpDown,
    MoreHorizontal,
    ChevronLeft,
    ChevronRight,
    Edit,
    Trash2,
} from 'lucide-react';

interface LeadsTableProps {
    initialLeads?: Lead[];
    onNavigateToLead?: (id: string) => void;
}

const LeadsTable: React.FC<LeadsTableProps> = ({ initialLeads = leadsData, onNavigateToLead }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [pipelineFilter, setPipelineFilter] = useState<LeadPipelineStatus | 'All'>('All');
    const [temperatureFilter, setTemperatureFilter] = useState<LeadTemperatureStatus | 'All'>(
        'All'
    );
    const [sourceFilter, setSourceFilter] = useState<LeadSource | 'All'>('All');
    const [sortBy, setSortBy] = useState<keyof Lead | ''>('created');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    // Get filtered leads
    const filteredLeads = useMemo(() => {
        return initialLeads.filter(lead => {
            // Search filter
            const searchMatch =
                searchTerm === '' ||
                lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lead.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lead.email.toLowerCase().includes(searchTerm.toLowerCase());

            // Pipeline status filter
            const pipelineMatch =
                pipelineFilter === 'All' || lead.pipelineStatus === pipelineFilter;

            // Temperature status filter
            const temperatureMatch =
                temperatureFilter === 'All' || lead.temperatureStatus === temperatureFilter;

            // Source filter
            const sourceMatch = sourceFilter === 'All' || lead.source === sourceFilter;

            return searchMatch && pipelineMatch && temperatureMatch && sourceMatch;
        });
    }, [initialLeads, searchTerm, pipelineFilter, temperatureFilter, sourceFilter]);

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

    // Get status styles
    const getPipelineStatusStyle = (status: LeadPipelineStatus) => {
        switch (status) {
            case 'New':
                return 'bg-blue-100 text-blue-800';
            case 'Proposal':
                return 'bg-yellow-100 text-yellow-800';
            case 'Negotiation':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getTemperatureStatusStyle = (status: LeadTemperatureStatus) => {
        switch (status) {
            case 'Hot':
                return 'bg-red-100 text-red-800';
            case 'Warm':
                return 'bg-orange-100 text-orange-800';
            case 'Cold':
                return 'bg-cyan-100 text-cyan-800';
            default:
                return 'bg-gray-100 text-gray-800';
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

    // Format date
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
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
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Leads Management</h2>
                    <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add New Lead
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="mt-4 flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search leads..."
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {/* Pipeline Status Filter */}
                        <div className="relative">
                            <select
                                value={pipelineFilter}
                                onChange={e =>
                                    setPipelineFilter(e.target.value as LeadPipelineStatus | 'All')
                                }
                                className="pl-3 pr-8 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="All">All Statuses</option>
                                <option value="New">New</option>
                                <option value="Proposal">Proposal</option>
                                <option value="Negotiation">Negotiation</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </div>
                        </div>

                        {/* Temperature Status Filter */}
                        <div className="relative">
                            <select
                                value={temperatureFilter}
                                onChange={e =>
                                    setTemperatureFilter(
                                        e.target.value as LeadTemperatureStatus | 'All'
                                    )
                                }
                                className="pl-3 pr-8 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="All">All Temperature</option>
                                <option value="Hot">Hot</option>
                                <option value="Warm">Warm</option>
                                <option value="Cold">Cold</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </div>
                        </div>

                        {/* Source Filter */}
                        <div className="relative">
                            <select
                                value={sourceFilter}
                                onChange={e =>
                                    setSourceFilter(e.target.value as LeadSource | 'All')
                                }
                                className="pl-3 pr-8 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="All">All Sources</option>
                                <option value="Live Chat">Live Chat</option>
                                <option value="LinkedIn Outreach">LinkedIn Outreach</option>
                                <option value="Referral">Referral</option>
                                <option value="Contact Form">Contact Form</option>
                                <option value="Email Campaign">Email Campaign</option>
                                <option value="Trade Show">Trade Show</option>
                                <option value="Website Visit">Website Visit</option>
                                <option value="Cold Call">Cold Call</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                        <tr>
                            <th className="px-6 py-3 text-left tracking-wider">
                                <button
                                    className="flex items-center space-x-1 focus:outline-none"
                                    onClick={() => handleSort('fullName')}
                                >
                                    <span>Lead</span>
                                    <ArrowUpDown className="h-3 w-3" />
                                </button>
                            </th>
                            <th className="px-6 py-3 text-left tracking-wider">
                                <button
                                    className="flex items-center space-x-1 focus:outline-none"
                                    onClick={() => handleSort('pipelineStatus')}
                                >
                                    <span>Pipeline Status</span>
                                    <ArrowUpDown className="h-3 w-3" />
                                </button>
                            </th>
                            <th className="px-6 py-3 text-left tracking-wider">
                                <button
                                    className="flex items-center space-x-1 focus:outline-none"
                                    onClick={() => handleSort('temperatureStatus')}
                                >
                                    <span>Temperature Status</span>
                                    <ArrowUpDown className="h-3 w-3" />
                                </button>
                            </th>
                            <th className="px-6 py-3 text-left tracking-wider">
                                <button
                                    className="flex items-center space-x-1 focus:outline-none"
                                    onClick={() => handleSort('source')}
                                >
                                    <span>Source</span>
                                    <ArrowUpDown className="h-3 w-3" />
                                </button>
                            </th>
                            <th className="px-6 py-3 text-left tracking-wider">
                                <button
                                    className="flex items-center space-x-1 focus:outline-none"
                                    onClick={() => handleSort('estimatedValue')}
                                >
                                    <span>Est. Value</span>
                                    <ArrowUpDown className="h-3 w-3" />
                                </button>
                            </th>
                            <th className="px-6 py-3 text-left tracking-wider">
                                <button
                                    className="flex items-center space-x-1 focus:outline-none"
                                    onClick={() => handleSort('created')}
                                >
                                    <span>Created</span>
                                    <ArrowUpDown className="h-3 w-3" />
                                </button>
                            </th>
                            <th className="px-6 py-3 text-left tracking-wider w-1/4">
                                <button
                                    className="flex items-center space-x-1 focus:outline-none"
                                    onClick={() => handleSort('notes')}
                                >
                                    <span>Notes</span>
                                    <ArrowUpDown className="h-3 w-3" />
                                </button>
                            </th>
                            <th className="px-6 py-3 text-right tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedLeads.map(lead => (
                            <tr key={lead.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="font-medium text-gray-900">
                                            {lead.fullName}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {lead.companyName}
                                        </div>
                                        <div className="text-xs text-gray-400">{lead.email}</div>
                                        <div className="text-xs text-gray-400">{lead.phone}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPipelineStatusStyle(lead.pipelineStatus)}`}
                                    >
                                        {lead.pipelineStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTemperatureStatusStyle(lead.temperatureStatus)}`}
                                    >
                                        {lead.temperatureStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {lead.source}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {formatCurrency(lead.estimatedValue)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(lead.created)}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    <div className="whitespace-normal break-words max-w-md">
                                        {lead.notes}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                    <div className="relative">
                                        <button
                                            className="text-gray-500 hover:text-gray-700"
                                            onClick={e => {
                                                e.stopPropagation();
                                                toggleDropdown(lead.id);
                                            }}
                                        >
                                            <MoreHorizontal className="h-5 w-5" />
                                        </button>

                                        {openDropdownId === lead.id && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                                <div className="py-1">
                                                    <button
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                        onClick={e => {
                                                            e.stopPropagation();
                                                            handleEdit(lead);
                                                        }}
                                                    >
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                                                        onClick={e => {
                                                            e.stopPropagation();
                                                            handleDelete(lead);
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Table Footer with Stats and Pagination */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="text-sm text-gray-500 mb-3 sm:mb-0">
                        Showing {paginatedLeads.length} of {leadsData.length} leads
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="flex items-center mr-4">
                            <span className="mr-2 text-sm text-gray-600">Rows per page:</span>
                            <select
                                value={itemsPerPage}
                                onChange={e => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1); // Reset to first page when changing items per page
                                }}
                                className="border border-gray-300 rounded-md text-sm px-2 py-1"
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>

                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className={`p-1 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        <div className="text-sm text-gray-700 flex items-center">
                            <span className="mr-2">Page</span>
                            <select
                                value={currentPage}
                                onChange={e => goToPage(Number(e.target.value))}
                                className="border border-gray-300 rounded-md text-sm px-2 py-1"
                            >
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <option key={page} value={page}>
                                        {page}
                                    </option>
                                ))}
                            </select>
                            <span className="ml-2">of {totalPages}</span>
                        </div>

                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className={`p-1 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadsTable;
