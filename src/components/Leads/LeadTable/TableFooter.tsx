import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Lead } from '../../../utils/loadLeadsData';

interface TableFooterProps {
    paginatedLeads: Lead[];
    filteredLeads: Lead[];
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    setItemsPerPage: (value: number) => void;
    goToPage: (page: number) => void;
    goToPreviousPage: () => void;
    goToNextPage: () => void;
}

const TableFooter: React.FC<TableFooterProps> = ({
    paginatedLeads,
    filteredLeads,
    currentPage,
    totalPages,
    itemsPerPage,
    setItemsPerPage,
    goToPage,
    goToPreviousPage,
    goToNextPage,
}) => {
    return (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="text-sm text-gray-500 mb-3 sm:mb-0 font-medium md:text-base">
                    Showing {paginatedLeads.length} of {filteredLeads.length} leads
                </div>

                <div className="flex items-center space-x-2 md:space-x-4">
                    <div className="flex items-center mr-4">
                        <span className="mr-2 text-sm text-gray-600 md:text-base">
                            Rows per page:
                        </span>
                        <select
                            value={itemsPerPage}
                            onChange={e => {
                                setItemsPerPage(Number(e.target.value));
                            }}
                            className="border border-gray-300 rounded-md text-sm px-2 py-1 md:text-base md:px-3 md:py-1.5"
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
                        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                    </button>

                    <div className="text-sm text-gray-700 flex items-center md:text-base">
                        <span className="mr-2 whitespace-nowrap">Page</span>
                        <select
                            value={currentPage}
                            onChange={e => goToPage(Number(e.target.value))}
                            className="border border-gray-300 rounded-md text-sm px-2 py-1 md:text-base md:px-3 md:py-1.5"
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
                        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TableFooter;
