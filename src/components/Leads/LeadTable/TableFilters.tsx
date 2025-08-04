import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Lead } from '../../../utils/loadLeadsData';

interface TableFiltersProps {
    handleSort: (column: keyof Lead) => void;
}

const TableFilters: React.FC<TableFiltersProps> = ({ handleSort }) => {
    return (
        <thead className="bg-gray-50 text-xs md:text-sm uppercase text-gray-500">
            <tr>
                <th className="px-6 py-3 text-left tracking-wider md:w-1/6">
                    <button
                        className="flex items-center space-x-1 focus:outline-none"
                        onClick={() => handleSort('fullName')}
                    >
                        <span>Lead</span>
                        <ArrowUpDown className="h-3 w-3" />
                    </button>
                </th>
                <th className="px-6 py-3 text-left tracking-wider md:w-[10%]">
                    <button
                        className="flex items-center space-x-1 focus:outline-none"
                        onClick={() => handleSort('salesStage')}
                    >
                        <span>Sales Stage</span>
                        <ArrowUpDown className="h-3 w-3" />
                    </button>
                </th>
                <th className="px-6 py-3 text-left tracking-wider md:w-[10%]">
                    <button
                        className="flex items-center space-x-1 focus:outline-none"
                        onClick={() => handleSort('priority')}
                    >
                        <span>Priority</span>
                        <ArrowUpDown className="h-3 w-3" />
                    </button>
                </th>
                <th className="px-6 py-3 text-left tracking-wider md:w-[10%]">
                    <button
                        className="flex items-center space-x-1 focus:outline-none"
                        onClick={() => handleSort('customerPotential')}
                    >
                        <span>Customer Potential</span>
                        <ArrowUpDown className="h-3 w-3" />
                    </button>
                </th>
                <th className="px-6 py-3 text-left tracking-wider md:w-[10%]">
                    <button
                        className="flex items-center space-x-1 focus:outline-none"
                        onClick={() => handleSort('source')}
                    >
                        <span>Source</span>
                        <ArrowUpDown className="h-3 w-3" />
                    </button>
                </th>
                <th className="px-6 py-3 text-left tracking-wider md:w-[10%]">
                    <button
                        className="flex items-center space-x-1 focus:outline-none"
                        onClick={() => handleSort('estimatedValue')}
                    >
                        <span>Est. Value</span>
                        <ArrowUpDown className="h-3 w-3" />
                    </button>
                </th>
                <th className="px-6 py-3 text-left tracking-wider md:w-[10%]">
                    <button
                        className="flex items-center space-x-1 focus:outline-none"
                        onClick={() => handleSort('created')}
                    >
                        <span>Created</span>
                        <ArrowUpDown className="h-3 w-3" />
                    </button>
                </th>
                <th className="px-6 py-3 text-left tracking-wider md:w-1/5">
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
    );
};

export default TableFilters;
