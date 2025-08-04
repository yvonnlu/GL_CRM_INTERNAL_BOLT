import React from 'react';
import { Search, ChevronDown, UserPlus } from 'lucide-react';
import {
    SalesStage,
    LeadPriority,
    CustomerPotential,
    LeadSource,
} from '../../../utils/loadLeadsData';

interface TableHeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    pipelineFilter: SalesStage | 'All';
    setPipelineFilter: (filter: SalesStage | 'All') => void;
    priorityFilter: LeadPriority | 'All';
    setPriorityFilter: (filter: LeadPriority | 'All') => void;
    temperatureFilter: CustomerPotential | 'All';
    setTemperatureFilter: (filter: CustomerPotential | 'All') => void;
    sourceFilter: LeadSource | 'All';
    setSourceFilter: (filter: LeadSource | 'All') => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
    searchTerm,
    setSearchTerm,
    pipelineFilter,
    setPipelineFilter,
    priorityFilter,
    setPriorityFilter,
    temperatureFilter,
    setTemperatureFilter,
    sourceFilter,
    setSourceFilter,
}) => {
    return (
        <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Leads Management</h2>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add New Lead
                </button>
            </div>

            {/* Search and Filters */}
            <div className="mt-4 flex flex-col md:flex-row gap-4 items-start">
                <div className="relative flex-grow md:max-w-lg">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search leads..."
                        className="pl-10 pr-4 py-2 md:py-2.5 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex flex-wrap gap-2 md:gap-3 md:ml-auto">
                    {/* Sales Stage Filter */}
                    <div className="relative w-full sm:w-auto">
                        <select
                            value={pipelineFilter}
                            onChange={e => setPipelineFilter(e.target.value as SalesStage | 'All')}
                            className="pl-3 pr-8 py-2 md:py-2.5 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                        >
                            <option value="All">All Stages</option>
                            <option value="New">New</option>
                            <option value="Proposal">Proposal</option>
                            <option value="Negotiation">Negotiation</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Priority Filter */}
                    <div className="relative">
                        <select
                            value={priorityFilter}
                            onChange={e =>
                                setPriorityFilter(e.target.value as LeadPriority | 'All')
                            }
                            className="pl-3 pr-8 py-2 md:py-2.5 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                        >
                            <option value="All">All Priorities</option>
                            <option value="Urgent">Urgent</option>
                            <option value="Normal">Normal</option>
                            <option value="Low">Low</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Customer Potential Filter */}
                    <div className="relative">
                        <select
                            value={temperatureFilter}
                            onChange={e =>
                                setTemperatureFilter(e.target.value as CustomerPotential | 'All')
                            }
                            className="pl-3 pr-8 py-2 md:py-2.5 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                        >
                            <option value="All">All Potentials</option>
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
                            onChange={e => setSourceFilter(e.target.value as LeadSource | 'All')}
                            className="pl-3 pr-8 py-2 md:py-2.5 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
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
    );
};

export default TableHeader;
